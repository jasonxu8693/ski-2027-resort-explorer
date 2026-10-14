/* Phone presentation only. Shared-state values and their event handlers stay untouched. */
(function(){
  'use strict';
  var dialog=document.getElementById('tripDialog');
  if(!dialog||document.getElementById('mtTripSection'))return;
  var header=dialog.querySelector('.trip-header'),data=dialog.querySelector('.trip-data');
  var tabs=Array.from(dialog.querySelectorAll('[data-trip]'));
  var panels=Array.from(data.querySelectorAll('.panel'));
  function referenceNote(panelId,title,copy){
    var panel=document.getElementById(panelId),heading=panel&&panel.querySelector('h2');
    if(!heading)return;
    var note=document.createElement('aside');note.className='mt-reference-note';note.setAttribute('role','note');
    var label=document.createElement('strong'),text=document.createElement('p');label.textContent=title;text.textContent=copy;note.append(label,text);heading.after(note);
  }
  referenceNote('p5','Original planning estimates','This panel retains earlier resort comparisons and tariffs from different seasons. The season and estimate labels matter; the recorded ski-hire payments are in Bookings.');
  referenceNote('p8','Budget totals need reconciling','These original notes quote £2,081 per person, while Costs quotes about £2,132. Both source figures are retained here; the food assumptions and totals have not yet been reconciled.');
  var descriptions={p4:'Group jobs sync. Your own jobs stay on this device.',p10:'Your packing progress stays on this device.',p3:'Booking changes are shared with the group.',p2:'9–16 January 2027 · arrival, mountain days and home.',p5:'Planning figures · check dates and price labels.',p8:'Food budgets and places to eat.',p9:'Guest-list changes are shared with the group.',p6:'Things to confirm before the trip.',p7:'Source notes, checked dates and remaining gaps.'};
  var jump=document.createElement('div');
  jump.className='mt-trip-jump';
  jump.innerHTML='<div class="mt-jump-heading"><label for="mtTripSection">Trip details</label><output id="mtTripPosition" aria-hidden="true"></output></div><select id="mtTripSection" aria-label="Choose trip section"></select><p class="mt-section-description" id="mtTripDescription"></p>';
  header.appendChild(jump);
  var select=jump.querySelector('select'),position=jump.querySelector('output'),description=jump.querySelector('p');
  var scrollPositions=Object.create(null),current=null;
  tabs.forEach(function(tab,i){
    var id=tab.dataset.trip,option=document.createElement('option');
    option.value=id;option.textContent=tab.textContent.trim();select.appendChild(option);
    if(!tab.id)tab.id='mt-tab-'+id;
    var panel=document.getElementById(id);
    if(panel){panel.setAttribute('role','tabpanel');panel.setAttribute('aria-labelledby',tab.id);}
  });
  function mobile(){return document.documentElement.classList.contains('mobile-ui');}
  function syncSection(){
    var panel=panels.find(function(p){return p.classList.contains('on');});
    if(!panel)return;
    var next=panel.id;
    if(current!==next){
      current=next;
      if(mobile())data.scrollTop=scrollPositions[next]||0;
    }
    select.value=next;
    position.textContent=String(tabs.findIndex(function(t){return t.dataset.trip===next;})+1).padStart(2,'0')+' / '+String(tabs.length).padStart(2,'0');
    description.textContent=descriptions[next]||'';
    panels.forEach(function(p){p.setAttribute('aria-hidden',String(p.id!==next));});
  }
  select.addEventListener('change',function(){
    if(current)scrollPositions[current]=data.scrollTop;
    var tab=tabs.find(function(t){return t.dataset.trip===select.value;});
    if(tab)tab.click();
    syncSection();
  });
  data.addEventListener('scroll',function(){if(current)scrollPositions[current]=data.scrollTop;},{passive:true});
  dialog.addEventListener('click',function(e){if(e.target.closest('[data-trip]')&&current)scrollPositions[current]=data.scrollTop;},true);
  var panelObserver=new MutationObserver(syncSection);
  panels.forEach(function(p){panelObserver.observe(p,{attributes:true,attributeFilter:['class']});});
  new MutationObserver(function(){if(dialog.open)syncSection();}).observe(dialog,{attributes:true,attributeFilter:['open']});

  function setAttr(el,name,value){if(el.getAttribute(name)!==value)el.setAttribute(name,value);}
  function addSpan(parent,className,text){var s=parent.querySelector('.'+className);if(!s){s=document.createElement('span');s.className=className;parent.appendChild(s);}if(s.textContent!==text)s.textContent=text;return s;}
  function tableHeaders(table,index){
    var heads=table.tHead&&table.tHead.rows.length?Array.from(table.tHead.rows[0].cells):[];
    heads.forEach(function(th,i){if(!th.id)th.id='mt-h-'+index+'-'+i;setAttr(th,'scope','col');});
    return heads;
  }
  function decorateBookings(table,index){
    table.classList.add('mt-bookings');
    var heads=tableHeaders(table,index),costs=table.tHead&&table.tHead.rows[1]?Array.from(table.tHead.rows[1].cells):[];
    var names=[];
    Array.from(table.tBodies).forEach(function(body){Array.from(body.rows).forEach(function(row){
      var cells=Array.from(row.cells),sorted=0,total=0;
      var name=cells[0]?Array.from(cells[0].childNodes).filter(function(n){return n.nodeType===3;}).map(function(n){return n.textContent;}).join('').trim():'';
      names.push(name);setAttr(row,'data-person',name);
      cells.forEach(function(cell,i){
        if(heads[i])setAttr(cell,'headers',heads[i].id);
        if(i){var label=heads[i]?heads[i].textContent.trim():'';if(costs[i])label+=' · '+costs[i].textContent.trim();setAttr(cell,'data-label',label);}
        var button=cell.querySelector('[data-bk]');
        if(button){var done=button.classList.contains('s1'),unneeded=button.classList.contains('s2');addSpan(button,'mt-booking-state',done?'Booked':unneeded?'Not needed':'To book');total++;if(done||unneeded)sorted++;}
        var days=cell.querySelector('.bkd');if(days&&/^\d+d$/.test(days.textContent.trim())){setAttr(days,'data-days',days.textContent.trim().replace('d',' days of hire'));setAttr(days,'aria-hidden','true');}
      });
      if(cells[0])addSpan(cells[0],'mt-person-summary',sorted+' of '+total+' bookings sorted');
    });});
    if(table.tFoot)Array.from(table.tFoot.rows).forEach(function(row){Array.from(row.cells).forEach(function(cell,i){if(heads[i]){setAttr(cell,'headers',heads[i].id);setAttr(cell,'data-label',heads[i].getAttribute('title')||heads[i].textContent.trim());}});});
    var filter=document.getElementById('mtBookingPerson');
    if(!filter){
      var box=document.createElement('div');box.className='mt-booking-filter';
      box.innerHTML='<label for="mtBookingPerson">Show bookings for</label><select id="mtBookingPerson" aria-label="Filter bookings by person"></select><p class="mt-booking-empty" id="mtBookingEmpty" hidden>No confirmed guests yet. Update Who’s in to start tracking bookings.</p>';
      table.parentElement.before(box);filter=box.querySelector('select');
      filter.addEventListener('change',applyPersonFilter);
    }
    var signature=JSON.stringify(names);
    if(filter.dataset.names!==signature){
      var previous=filter.value;filter.replaceChildren();
      [''].concat(names).forEach(function(name){var o=document.createElement('option');o.value=name;o.textContent=name||'Everyone · '+names.length+(names.length===1?' person':' people');filter.appendChild(o);});
      filter.dataset.names=signature;filter.value=names.includes(previous)?previous:'';
    }
    document.getElementById('mtBookingEmpty').hidden=names.length>0;
    applyPersonFilter();
  }
  function applyPersonFilter(){
    var filter=document.getElementById('mtBookingPerson');if(!filter)return;
    data.querySelectorAll('#bkTable tbody tr').forEach(function(row){row.classList.toggle('mt-person-hidden',!!filter.value&&row.dataset.person!==filter.value);});
  }
  function decorateTable(table,index){
    if(table.id==='bkTable'){decorateBookings(table,index);return;}
    table.classList.add('mt-table');
    var heads=tableHeaders(table,index);
    Array.from(table.tBodies).forEach(function(body){Array.from(body.rows).forEach(function(row){
      Array.from(row.cells).forEach(function(cell,i){
        if(heads[i]){setAttr(cell,'headers',heads[i].id);setAttr(cell,'data-label',heads[i].textContent.trim());}
        if(!cell.querySelector(':scope > .mt-cell-value')){var value=document.createElement('span');value.className='mt-cell-value';while(cell.firstChild)value.appendChild(cell.firstChild);cell.appendChild(value);}
      });
      if(table.classList.contains('rsvp')){
        var name=row.querySelector('[data-f="n"]'),note=row.querySelector('[data-f="note"]'),status=row.querySelector('[data-w]'),remove=row.querySelector('[data-del]');
        var who=name&&name.value?name.value:'this guest';
        if(name)setAttr(name,'aria-label','Name for '+who);
        if(note)setAttr(note,'aria-label','Notes for '+who);
        if(status)setAttr(status,'aria-label',who+': 9–16 January attendance');
        if(remove){setAttr(remove,'aria-label','Remove '+who);addSpan(remove,'mt-remove-label','Remove person');}
      }
    });});
  }
  var contentObserver,lastAction=null;
  dialog.addEventListener('click',function(e){
    var button=e.target.closest('button[data-bk],button[data-sport],button[data-amt],button[data-task],button[data-pack]');
    if(!button)return;
    var key=['data-bk','data-sport','data-amt','data-task','data-pack'].find(function(k){return button.hasAttribute(k);});
    lastAction={element:button,key:key,value:button.getAttribute(key),kind:button.getAttribute('data-kind')};
  },true);
  function decorate(){
    if(contentObserver)contentObserver.disconnect();
    data.querySelectorAll('table').forEach(decorateTable);
    // Existing renderers replace a row after a deliberate toggle; keep keyboard focus on it.
    if(lastAction&&!lastAction.element.isConnected&&dialog.open){
      var action=lastAction;
      var replacement=Array.from(data.querySelectorAll('button['+action.key+']')).find(function(button){return button.getAttribute(action.key)===action.value&&button.getAttribute('data-kind')===action.kind;});
      if(replacement&&(document.activeElement===document.body||document.activeElement===dialog))replacement.focus({preventScroll:true});
    }
    lastAction=null;
    // Reconnect only after our own presentation changes, preventing observer loops.
    if(contentObserver)contentObserver.observe(data,{childList:true,subtree:true});
  }
  contentObserver=new MutationObserver(decorate);
  decorate();syncSection();
  // A read-only refresh hook for the responsive shell and smoke checks.
  window.__mobileTripRefresh=function(){decorate();syncSection();};
})();
