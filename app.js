(() => {
  'use strict';
  const site = window.LOVE_SITE;
  if (!site || !Array.isArray(site.surprises)) {
    document.body.insertAdjacentHTML('afterbegin','<p style="padding:24px">Please check that data.js was uploaded beside index.html.</p>');
    return;
  }
  const $ = (s, root=document) => root.querySelector(s);
  const $$ = (s, root=document) => Array.from(root.querySelectorAll(s));
  const node = (tag, cls='', text) => { const n=document.createElement(tag); if(cls)n.className=cls;if(text!==undefined)n.textContent=text;return n; };
  const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const key='our-little-forever-random-v1';
  let seen=[];
  try { const stored=JSON.parse(localStorage.getItem(key)||'[]'); if(Array.isArray(stored))seen=stored.filter(id=>site.surprises.some(s=>s.id===id)); } catch (_) {}
  const found=new Set(seen);
  const shuffled = input => {const a=[...input]; for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[j],a[i]]=[a[i],a[j]];}return a;};
  const say = (msg) => { const t=$('#toast');t.textContent=msg;t.classList.add('visible');clearTimeout(say.timer);say.timer=setTimeout(()=>t.classList.remove('visible'),3100);};
  let lastMoment=null, lastPhoto=null;
  const total=site.surprises.length;

  function createStars(){
    const root=$('#starfield');
    for(let i=0;i<94;i++){
      const star=node('i');star.style.left=((i*47.3+11.9)%100)+'%';star.style.top=((i*31.7+i*i*.73+6)%100)+'%';star.style.width=star.style.height=(i%13===0?'3px':'1.5px');star.style.setProperty('--tw',(3+i%6)+'s');star.style.setProperty('--delay',(-i*.16)+'s');root.appendChild(star);
    }
  }
  function confetti(count=32){
    if(isReduced)return;
    const old=$('.confetti-holder'); if(old)old.remove();
    const holder=node('div','confetti-holder');holder.setAttribute('aria-hidden','true');
    const colors=['#f4c5d5','#ddc6f4','#eed4a2','#f5eee6','#cb9cbd'];
    for(let i=0;i<count;i++){
      const x=node('i','confetti-piece');x.style.left=((i*47.11)%100)+'%';x.style.background=colors[i%5];x.style.setProperty('--duration',(2.5+i%7*.33)+'s');x.style.setProperty('--wind',((i%2?1:-1)*(80+i*4)%330)+'px');x.style.animationDelay=(i%7*.08)+'s';holder.appendChild(x);
    }
    document.body.appendChild(holder);setTimeout(()=>holder.remove(),5500);
  }
  function btn(text, callback, cls='small-game-button'){
    const b=node('button',cls,text);b.type='button';b.addEventListener('click',callback);return b;
  }
  function renderSurprises(){
    const grid=$('#surpriseGrid');grid.replaceChildren();
    shuffled(site.surprises).forEach((s,index)=>{
      const card=btn('',()=>openSurprise(s),'surprise-card');card.dataset.id=s.id;
      const art=node('span','surprise-symbol',s.icon);
      const number=node('span','surprise-top',found.has(s.id)?'✦ DISCOVERED':'✧ TAP TO UNWRAP');
      const name=node('strong','surprise-name',s.title);
      const hint=node('span','surprise-hint',s.hint);
      card.append(number,art,name,hint);
      card.style.setProperty('--card-offset',((index%4)-1.5)*1.2+'deg');
      if(found.has(s.id))card.classList.add('collected');
      grid.appendChild(card);
    });
    updateStars();
  }
  function collect(s){
    if(!found.has(s.id)){
      found.add(s.id);
      try{localStorage.setItem(key,JSON.stringify([...found]));}catch(_){say('Your browser could not save progress.');}
      const card=$(`[data-id="${s.id}"]`);if(card){card.classList.add('collected');$('.surprise-top',card).textContent='✦ DISCOVERED';}
      confetti();
      updateStars();
    }
    reveal(s);
  }
  function updateStars(){
    const count=found.size;
    $('#momentsProgress').textContent=`${count} ${count===1?'lovely secret':'lovely secrets'} found`;
    $('#starTotal').textContent=String(count).padStart(2,'0');
    $('#cosmosCaption').textContent=count===0?'Pick a surprise and make the first little star glow.':count===total?'Every little light is yours. And we have so many more memories to make.':`${count} sparkling ${count===1?'memory':'memories'} — little bits of our universe.`;
    const coords=site.surprises.map((_,i)=>({x:70+((i*173+41)%850),y:42+((i*117+i*i*3)%300)}));
    const ns='http://www.w3.org/2000/svg'; const svg=document.createElementNS(ns,'svg');svg.setAttribute('viewBox','0 0 1000 390');svg.setAttribute('preserveAspectRatio','none');svg.setAttribute('role','img');svg.setAttribute('aria-label',`${count} memory stars shining`);
    for(let i=0;i<105;i++){
      const c=document.createElementNS(ns,'circle');c.setAttribute('cx',String((i*53.17)%1000));c.setAttribute('cy',String((i*34.71+i*i*.13)%390));c.setAttribute('r',i%9===0?'1.6':'.9');c.setAttribute('fill','#f6d8e6');c.setAttribute('opacity',i%3===0?'.3':'.15');svg.appendChild(c);
    }
    const lit=site.surprises.map((s,i)=>({...coords[i],id:s.id})).filter(p=>found.has(p.id));
    lit.forEach((p,j)=>{if(j>0){const l=document.createElementNS(ns,'line');Object.entries({x1:lit[j-1].x,y1:lit[j-1].y,x2:p.x,y2:p.y,stroke:'#ebc39d','stroke-opacity':'.3','stroke-width':'1.4','stroke-dasharray':'5 7'}).forEach(([k,v])=>l.setAttribute(k,String(v)));svg.appendChild(l);}});
    site.surprises.forEach((s,i)=>{const p=coords[i],on=found.has(s.id);for(const [radius,opacity] of [[on?12:5,on?'.19':'.12'],[on?4:2,on?'1':'.36']]){const c=document.createElementNS(ns,'circle');c.setAttribute('cx',p.x);c.setAttribute('cy',p.y);c.setAttribute('r',radius);c.setAttribute('fill',on?'#fce2b6':'#b7a9cc');c.setAttribute('opacity',opacity);svg.appendChild(c);}});
    $('#constellation').replaceChildren(svg);
    const badges=$('#starChips');badges.replaceChildren();
    if(!count){badges.appendChild(node('span','star-chip muted','✧ Your first little star is waiting.'));return;}
    site.surprises.filter(s=>found.has(s.id)).forEach(s=>badges.appendChild(node('span','star-chip','✦ '+s.star)));
  }
  function setDialog(dialog, closeButton){ if(!dialog.open)dialog.showModal();closeButton.focus(); }
  function openSurprise(s){
    lastMoment=s;
    const root=$('#surpriseContent');root.replaceChildren();
    const art=node('div','surprise-modal-art',s.icon);
    const top=node('span','modal-eyebrow','♡ A LITTLE MOMENT, JUST FOR YOU');
    const title=node('h2','surprise-modal-title',s.title);
    const desc=node('p','surprise-modal-desc',found.has(s.id)?'You already found this little piece of our story. Open it again whenever you like.':s.description);
    const game=node('div','surprise-game');
    root.append(art,top,title,desc,game);
    if(found.has(s.id))reveal(s);else playGame(s,game);
    setDialog($('#surpriseDialog'),$('#surpriseClose'));
  }
  function reveal(s){
    if(lastMoment!==s)return;
    const game=$('.surprise-game'); if(!game)return;
    game.replaceChildren();
    game.appendChild(node('div','found-seal','✦ '+s.star+' ✦'));
    game.appendChild(node('p','revealed-message',s.message));
    game.appendChild(node('p','revealed-line','“'+s.quote+'”'));
    const actions=node('div','result-actions');
    actions.appendChild(btn('Keep this memory ♡',()=>$('#surpriseDialog').close(),'button button-primary'));
    actions.appendChild(btn('Play again ↻',()=>{game.replaceChildren();playGame(s,game);},'button button-quiet'));
    game.appendChild(actions);
  }
  function playGame(s,game){
    game.replaceChildren();let count=0;const goal=s.type==='rhythm'?7:5;
    const status=node('p','game-progress','');game.appendChild(status);
    const area=node('div','new-game-area');game.appendChild(area);
    const finish=()=>{status.textContent='You found it! ♡';setTimeout(()=>collect(s),340);};
    if(s.type==='collect'){
      status.textContent='Tap all five little surprises';
      const grid=node('div','tiny-pieces');area.appendChild(grid);
      for(let i=0;i<5;i++){const b=btn(s.icon,()=>{b.disabled=true;b.classList.add('tapped');b.textContent='✦';count++;status.textContent=`${count} of 5 little moments collected`;if(count===5)finish();},'tiny-piece');b.setAttribute('aria-label','Collect little '+s.title);grid.appendChild(b);}
    }else if(s.type==='gift'){
      status.textContent='Untie all five ribbons';
      const b=btn('🎁',()=>{count++;status.textContent=`${5-count} ribbons left`;b.style.transform=`rotate(${count%2?-8:8}deg) scale(${1-count*.06})`;if(count>=5){b.disabled=true;b.textContent='💝';finish();}},'large-game-icon');area.appendChild(b);
    }else if(s.type==='bloom'){
      status.textContent='Give this flower five little touches';
      const b=btn('🌱',()=>{count++;b.textContent=['🌱','🌿','🌷','🌺','🌸'][Math.min(count-1,4)];status.textContent=`${count} little touches`;if(count>=5){b.disabled=true;finish();}},'large-game-icon');area.appendChild(b);
    }else if(s.type==='stars'){
      status.textContent='Find all five stars';
      const board=node('div','tiny-star-board');area.appendChild(board);
      [[10,20],[70,12],[42,42],[14,70],[79,72]].forEach(([x,y],i)=>{
        const b=btn('✦',()=>{b.disabled=true;b.classList.add('sparked');count++;status.textContent=`${count} of 5 stars`;if(count===5)finish();},'tiny-star');b.style.left=x+'%';b.style.top=y+'%';b.setAttribute('aria-label','Light star '+(i+1));board.appendChild(b);
      });
    }else if(s.type==='slider'){
      status.textContent='Bring our little hearts together';
      const hearts=node('div','hearts-meeting');hearts.innerHTML='<span>♡</span><span>♡</span>';area.appendChild(hearts);
      const range=node('input','hearts-slider');range.type='range';range.min='0';range.max='100';range.value='0';range.setAttribute('aria-label','Bring the hearts together');area.appendChild(range);
      range.addEventListener('input',()=>{hearts.style.gap=(Math.max(0,165-(+range.value*1.65)))+'px';if(+range.value>=95){range.disabled=true;hearts.innerHTML='<span>💞</span>';finish();}});
    }else if(s.type==='phrase'){
      status.textContent='Hint: I ___ ___';
      const form=node('form','phrase-form');const inp=node('input');inp.type='text';inp.maxLength=40;inp.autocomplete='off';inp.placeholder='Three little words';inp.setAttribute('aria-label','Enter three little words');const submit=node('button','button button-primary','Unlock my heart ♡');submit.type='submit';form.append(inp,submit);area.appendChild(form);
      form.addEventListener('submit',event=>{event.preventDefault();if(inp.value.toLowerCase().trim().replace(/\s+/g,' ')==='i love you'){inp.disabled=true;submit.disabled=true;finish();}else status.textContent='Try: I love you ♡';});
    }else if(s.type==='rhythm'){
      status.textContent='Tap the rhythm from left to right';
      const row=node('div','rhythm-row');area.appendChild(row);
      for(let i=0;i<7;i++){const b=btn('♫',()=>{if(i!==count){status.textContent='Follow the notes from left to right ♡';return;}b.disabled=true;b.classList.add('tapped');b.textContent='♥';count++;status.textContent=`${count} of 7 notes`;if(count===7)finish();},'rhythm-beat');b.style.height=(60+i%3*12)+'px';b.setAttribute('aria-label','Play note '+(i+1));row.appendChild(b);}
    }else if(s.type==='match'){
      status.textContent='Find the three matching pairs';const sym=['💗','🌷','✧'];const cards=shuffled([...sym,...sym]);let prev=null,busy=false,matches=0;
      const row=node('div','match-row');area.appendChild(row);
      cards.forEach(v=>{const b=btn('?',()=>{if(busy||b.disabled||prev===b)return;b.textContent=v;b.classList.add('tapped');if(!prev){prev=b;return;}const other=prev;prev=null;if(other.textContent===v){other.disabled=true;b.disabled=true;matches++;status.textContent=`${matches} of 3 pairs found`;if(matches===3)finish();}else{busy=true;setTimeout(()=>{other.textContent='?';b.textContent='?';other.classList.remove('tapped');b.classList.remove('tapped');busy=false;},600);}},'match-tile');b.setAttribute('aria-label','Flip a memory tile');row.appendChild(b);});
    }
  }

  // Hand-picked images placed in a deliberately non-chronological order.
  const album=Array.isArray(window.LOVE_PHOTOS) ? window.LOVE_PHOTOS : [];
  const byPhotoId=new Map(album.map(p=>[p.id,p]));
  let albumOrder=[...album];
  let photoFilter='all';
  const getVisiblePhotos=()=>albumOrder.filter(p=>photoFilter==='all'||p.category===photoFilter);
  function makePhotoCard(photo){
    const b=btn('',()=>openPhoto(photo.id),'photo-card with-photo');
    b.dataset.photo=String(photo.id);
    const slot=node('span','photo-picture');
    const img=node('img');img.src=photo.src;img.alt=photo.alt;img.loading='lazy';img.decoding='async';
    slot.appendChild(img);
    const name=node('span','photo-caption');name.appendChild(node('strong','',photo.title));name.appendChild(node('small','','tap to remember ♡'));
    b.append(slot,name);
    return b;
  }
  function renderPhotos(){
    const visible=getVisiblePhotos();
    $('#photoGrid').replaceChildren(...visible.map(makePhotoCard));
    $('#photoCount').textContent=`${visible.length} ${visible.length===1?'little picture':'little pictures'} to explore`;
    $$('#photoFilters .photo-filter').forEach(b=>{const active=b.dataset.filter===photoFilter;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));});
  }
  function openPhoto(i){
    const photo=byPhotoId.get(i);if(!photo)return;
    lastPhoto=i;
    const content=$('#photoContent');content.replaceChildren();
    const frame=node('div','lightbox-frame');const img=node('img');img.src=photo.src;img.alt=photo.alt;frame.appendChild(img);
    content.append(frame,node('span','modal-eyebrow','OUR LITTLE FOREVER'),node('h2','lightbox-title',photo.title),node('p','lightbox-note',photo.note));
    const list=albumOrder;
    const actions=node('div','photo-lightbox-actions');
    actions.appendChild(btn('← Previous',()=>{const j=list.findIndex(x=>x.id===lastPhoto);openPhoto(list[(j-1+list.length)%list.length].id);},'button button-quiet'));
    actions.appendChild(btn('Surprise me ✦',()=>{const choices=list.filter(x=>x.id!==lastPhoto);openPhoto(choices[Math.floor(Math.random()*choices.length)].id);},'button button-primary'));
    actions.appendChild(btn('Next →',()=>{const j=list.findIndex(x=>x.id===lastPhoto);openPhoto(list[(j+1)%list.length].id);},'button button-quiet'));
    content.appendChild(actions);
    setDialog($('#photoDialog'),$('#photoClose'));
  }
  function setupPhotoActions(){
    $('#shufflePhotos').addEventListener('click',()=>{albumOrder=shuffled(albumOrder);renderPhotos();say('Our pictures, in a brand new little order ♡');});
    $$('#photoFilters .photo-filter').forEach(b=>b.addEventListener('click',()=>{photoFilter=b.dataset.filter;renderPhotos();}));
  }
  // The user's supplied dance photograph and music stay inside the birthday reveal.
  const dancePlaylist=[42,64,15,7,33,39,1,34,12,54,37,50,11,18,2,31,57,46,8,4,65].map(id=>byPhotoId.get(id)).filter(Boolean);
  let danceIndex=0;
  let danceTimer=null;
  function showDanceFrame(index){
    if(!dancePlaylist.length)return;
    danceIndex=(index+dancePlaylist.length)%dancePlaylist.length;
    const p=dancePlaylist[danceIndex];
    $('#danceSlideImage').src=p.src;
    $('#danceSlideImage').alt=p.alt;
    $('#danceSlideCaption').textContent=p.note;
  }
  function stopDanceTimer(){clearInterval(danceTimer);danceTimer=null;}
  function startDanceTimer(){
    stopDanceTimer();
    danceTimer=setInterval(()=>{if(!$('#birthdayAudio').paused)showDanceFrame(danceIndex+1);},4300);
  }
  function setupDance(){
    const audio=$('#birthdayAudio');
    const playlist=$('#danceSlideshow');
    const start=async()=>{
      playlist.hidden=false;showDanceFrame(danceIndex);
      const ambient=$('#ambientAudio');if(!ambient.paused){ambient.pause();$('#musicText').textContent='music off';$('#musicButton').setAttribute('aria-pressed','false');}
      try{await audio.play();startDanceTimer();$('#playDance').textContent='♫ Playing our song';}
      catch(_){say('Tap the audio play control to hear our song.');}
      playlist.scrollIntoView({block:'nearest',behavior:isReduced?'auto':'smooth'});
    };
    $('#playDance').addEventListener('click',()=>{if(audio.paused)start();else{audio.pause();$('#playDance').textContent='▶ Continue our song';}});
    audio.addEventListener('play',()=>{playlist.hidden=false;startDanceTimer();$('#playDance').textContent='♫ Playing our song';});
    audio.addEventListener('pause',()=>{stopDanceTimer();$('#playDance').textContent='▶ Continue our song';});
    audio.addEventListener('ended',()=>{stopDanceTimer();$('#playDance').textContent='↻ Dance again';});
    $('#dancePrev').addEventListener('click',()=>showDanceFrame(danceIndex-1));
    $('#danceNext').addEventListener('click',()=>showDanceFrame(danceIndex+1));
    showDanceFrame(0);
  }
  function birthdayIsReady(){
    if(new URLSearchParams(location.search).get('preview')==='1')return true;
    const parts=new Intl.DateTimeFormat('en-US',{timeZone:site.timezone,year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date());
    const x=Object.fromEntries(parts.filter(p=>p.type!=='literal').map(p=>[p.type,p.value]));
    return `${x.year}-${x.month}-${x.day}`>=site.birthdayUnlock;
  }
  function birthdayInit(){
    const ready=birthdayIsReady();
    const button=$('#birthdayOpen');
    if(!ready){button.textContent='✦ A birthday secret (not yet)';$('#birthdayStatus').textContent='This little surprise opens on your birthday. The rest is yours already. ♡';}
    else{$('#birthdayStatus').textContent='Your special surprise is ready to open. ♡';}
    button.addEventListener('click',()=>{
      if(!birthdayIsReady()){say('Not yet, love. This little surprise is waiting for your birthday. ♡');return;}
      $('#birthdayExperience').hidden=false;button.hidden=true;$('#birthdayStatus').textContent='';startCandles();
      $('#birthdayExperience').scrollIntoView({block:'nearest',behavior:isReduced?'instant':'smooth'});
    });
    $('#birthdayAgain').addEventListener('click',()=>{const audio=$('#birthdayAudio');audio.pause();audio.currentTime=0;stopDanceTimer();$('#danceSlideshow').hidden=true;$('#playDance').textContent='▶ Play our song & memories';startCandles();});

  }
  function startCandles(){
    $('#birthdayReveal').hidden=true;const row=$('#candles');row.replaceChildren();let n=0;$('#candleInstruction').textContent='Tap the five glowing candles and make a wish ♡';
    for(let i=0;i<5;i++){
      const b=btn('🕯️',()=>{
        b.disabled=true;b.textContent='✦';b.classList.add('blown');n++;
        $('#candleInstruction').textContent=n===5?'Wish made. And now, this is for you ♡':`${5-n} little candles still glowing`;
        if(n===5)setTimeout(()=>{$('#birthdayReveal').hidden=false;confetti(90);$('#birthdayReveal').scrollIntoView({block:'nearest',behavior:isReduced?'instant':'smooth'});},450);
      },'candle-button');b.setAttribute('aria-label','Blow out birthday candle '+(i+1));row.appendChild(b);
    }
  }
  function backgroundMusic(){
    const b=$('#musicButton'),audio=$('#ambientAudio');
    b.addEventListener('click',async()=>{
      if(audio.paused){try{audio.volume=.20;await audio.play();b.setAttribute('aria-pressed','true');$('#musicText').textContent='music on';}catch(_){say('Music could not be played in this browser.');}}
      else{audio.pause();b.setAttribute('aria-pressed','false');$('#musicText').textContent='music off';}
    });
  }
  function init(){
    createStars();renderSurprises();renderPhotos();setupPhotoActions();birthdayInit();backgroundMusic();setupDance();
    const letter=$('#letterText');site.letter.forEach(text=>letter.appendChild(node('p','',text)));
    $('#shuffleMoments').addEventListener('click',()=>{renderSurprises();say('A fresh little shuffle, just for you ♡');});
    $('#randomPick').addEventListener('click',()=>{const list=site.surprises.filter(s=>s.id!==lastMoment?.id);openSurprise(list[Math.floor(Math.random()*list.length)]||site.surprises[0]);});
    $('#randomPhoto').addEventListener('click',()=>{const list=getVisiblePhotos();if(list.length)openPhoto(list[Math.floor(Math.random()*list.length)].id);});
    $('#surpriseClose').addEventListener('click',()=>$('#surpriseDialog').close());
    $('#photoClose').addEventListener('click',()=>$('#photoDialog').close());
    [$('#surpriseDialog'),$('#photoDialog')].forEach(dialog=>dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close();}));
    if(!isReduced && window.matchMedia('(hover:hover) and (pointer:fine)').matches){
      $$('.floating-card').forEach(card=>{
        card.addEventListener('pointermove',e=>{const box=card.getBoundingClientRect();const x=(e.clientX-box.left)/box.width-.5,y=(e.clientY-box.top)/box.height-.5;card.style.animationPlayState='paused';card.style.transform=`rotateY(${x*13}deg) rotateX(${-y*13}deg) translateY(-4px)`;});
        card.addEventListener('pointerleave',()=>{card.style.animationPlayState='running';card.style.transform='';});
      });
    }
  }
  init();
})();
