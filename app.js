(() => {
  'use strict';
  const site = window.LOVE_SITE;
  if (!site || !Array.isArray(site.days) || site.days.length !== 31) {
    document.body.insertAdjacentHTML('afterbegin','<p style="color:white;padding:24px">The story data is unavailable. Please check data.js.</p>');
    return;
  }
  const $ = (selector, parent = document) => parent.querySelector(selector);
  const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];
  const el = (tag, cls, value) => { const node = document.createElement(tag); if (cls) node.className=cls; if (value!==undefined) node.textContent=value; return node; };
  const esc = value => String(value).replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const storageKey = 'our-little-forever-v1';
  let stored = [];
  try { const value = JSON.parse(localStorage.getItem(storageKey) || '[]'); stored = Array.isArray(value) ? value.filter(n=>Number.isInteger(n)&&n>=0&&n<31) : []; } catch (_) { stored = []; }
  const completed = new Set(stored);
  const DEV_PREVIEW = ['localhost','127.0.0.1',''].includes(location.hostname) && new URLSearchParams(location.search).has('preview');
  const dateLabel = date => { const [,month,day]=date.split('-').map(Number); return `${month===11?'NOV':'DEC'} ${String(day).padStart(2,'0')}`; };
  const nowIST = () => {
    const parts = new Intl.DateTimeFormat('en-GB',{timeZone:site.timezone,year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',second:'2-digit',hourCycle:'h23'}).formatToParts(new Date());
    const m = Object.fromEntries(parts.filter(x=>x.type!=='literal').map(x=>[x.type,x.value]));
    return {date:`${m.year}-${m.month}-${m.day}`,hour:+m.hour,minute:+m.minute,second:+m.second};
  };
  const today = () => nowIST().date;
  const isOpen = idx => DEV_PREVIEW || site.days[idx].date<=today();
  let activeIndex = null;
  let returnFocus = null;
  let toastHandle = null;
  const toast = message => { const box=$('#toast'); box.textContent=message;box.classList.add('visible');clearTimeout(toastHandle);toastHandle=setTimeout(()=>box.classList.remove('visible'),3100); };
  function persist(){try {localStorage.setItem(storageKey,JSON.stringify([...completed].sort((a,b)=>a-b)));} catch(e){toast('Progress could not be saved in this browser.');}}
  const liveCount = () => completed.size;
  function createStars(){
    const field=$('#starfield');
    for(let i=0;i<80;i++){
      const x=((i*47.3+11.9)%100),y=((i*31.7+i*i*.73+6)%100);
      const star=el('i');star.style.left=x+'%';star.style.top=y+'%';star.style.width=star.style.height=(i%13===0?3:1.5)+'px';star.style.setProperty('--tw',(3+i%6)+'s');star.style.setProperty('--delay',(-i*.16)+'s');field.appendChild(star);
    }
  }
  function renderCalendar(){
    const grid=$('#calendarGrid');grid.replaceChildren();
    const current=today();
    site.days.forEach((day,i)=>{
      const open=isOpen(i),done=completed.has(i);
      const card=el('button','day-card'+(open?' unlocked':'')+(done?' done':'')+(day.date===current?' today':'')+(i===30?' final':''));
      card.type='button';card.setAttribute('aria-label',`${dateLabel(day.date)}, ${done?'completed':open?'unlocked':'locked'} ${open?day.title:'surprise'}`);
      card.innerHTML=`<span class="num">${String(i+1).padStart(2,'0')}</span><span class="gift-symbol" aria-hidden="true">${open?esc(day.icon):'✧'}</span><span class="day-status">${done?'✓ collected':open?'open gift ↗':'🔒 '+dateLabel(day.date)}</span>`;
      card.addEventListener('click',()=>{
        if(!isOpen(i)){toast(`This gift opens ${dateLabel(day.date)} at midnight, India time. ♡`);return;}
        openDialog(i);
      });
      grid.appendChild(card);
    });
    $('#collectedCount').textContent=`${liveCount()} / 31`;
    $('#progressFill').style.width=(liveCount()/31*100)+'%';
    $('#starTotal').textContent=String(liveCount()).padStart(2,'0');
    const available=site.days.filter((_,i)=>isOpen(i)).length;
    $('#calendarHeadline').textContent=liveCount()===31?'Every little star is yours ♡':available===0?'Your journey begins soon':available>liveCount()?'A little surprise is waiting for you':'Your little universe is growing';
    $('#calendarHint').textContent=available===0?'The first surprise opens November 25.':available>liveCount()?'Tap a glowing gift to begin!':'Come back tomorrow for another little adventure.';
    const clock=nowIST();
    if (clock.date<site.openingDate){
      const days=Math.max(1,Math.round((Date.parse(site.openingDate+'T00:00:00Z')-Date.parse(clock.date+'T00:00:00Z'))/86400000));
      $('#countdownLabel').textContent='UNTIL THE FIRST GIFT';$('#countdownNumber').textContent=days;$('#countdownUnit').textContent=days===1?'day to go':'days to go';
    } else if(clock.date>site.birthdayDate){
      $('#countdownLabel').textContent='YOUR STORY';$('#countdownNumber').textContent='∞';$('#countdownUnit').textContent='always here';
    } else if(clock.date===site.birthdayDate){
      $('#countdownLabel').textContent='HAPPY BIRTHDAY';$('#countdownNumber').textContent='♡';$('#countdownUnit').textContent='today is yours';
    } else {
      let hrs=23-clock.hour;
      if (clock.minute===0&&clock.second===0) hrs=24;
      $('#countdownLabel').textContent='UNTIL THE NEXT GIFT';$('#countdownNumber').textContent=String(hrs).padStart(2,'0');$('#countdownUnit').textContent='hours or less';
    }
  }
  let currentChapter=0;
  function chapterEventHTML(event){
    const [date,title,desc,icon,photo]=event;
    const info=`<span class="date">${esc(date)}</span><span class="memory-icon" aria-hidden="true">${esc(icon)}</span><h4>${esc(title)}</h4><p>${esc(desc)}</p>`;
    if(!photo) return `<article class="memory-card">${info}</article>`;
    return `<article class="memory-card has-photo"><div class="memory-image"><div class="art-fallback" aria-hidden="true">${esc(icon)}</div><img src="photos/${encodeURIComponent(photo)}" alt="${esc(title)}" loading="lazy" onerror="this.remove()" /></div><div class="memory-caption"><span class="date">${esc(date)}</span><h4>${esc(title)}</h4><p>${esc(desc)}</p></div></article>`;
  }
  function renderStory(){
    const tabs=$('#storyTabs');tabs.replaceChildren();
    site.chapters.forEach((chapter,i)=>{
      const btn=el('button','',`0${i+1} · ${chapter.title}`);btn.type='button';btn.id=`chapterTab${i}`;btn.setAttribute('role','tab');btn.setAttribute('aria-selected',i===currentChapter?'true':'false');btn.setAttribute('aria-controls','storyContent');
      btn.addEventListener('click',()=>{currentChapter=i;renderStory();});tabs.appendChild(btn);
    });
    const ch=site.chapters[currentChapter];
    $('#storyContent').setAttribute('role','tabpanel');$('#storyContent').setAttribute('aria-labelledby',`chapterTab${currentChapter}`);
    $('#storyContent').innerHTML=`<div class="chapter-top"><div class="chapter-mark">${['I','II','III'][currentChapter]}</div><div><p>${esc(ch.kicker)}</p><h3>${esc(ch.title)}</h3><span>${esc(ch.subtitle)}</span></div></div><div class="memory-grid">${ch.events.map(chapterEventHTML).join('')}</div><p class="chapter-note">And so many more moments that belong only to us. ♡</p>`;
  }
  function renderConstellation(){
    const root=$('#constellation');
    const coords=site.days.map((_,i)=>({x:10+((i*31.7+7)%80),y:13+((i*17.17+Math.floor(i/7)*11)%74)}));
    let svg=`<svg role="img" viewBox="0 0 1000 390" preserveAspectRatio="none" aria-label="${liveCount()} glowing stars collected">`;
    for(let i=0;i<115;i++){
      const x=(i*53.17)%1000,y=(i*34.71+i*i*.13)%390;svg+=`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${i%9===0?'1.6':'.9'}" fill="#f6d8e6" opacity="${i%3===0?'.32':'.15'}"/>`;
    }
    const collectedPoints=coords.map((p,i)=>({...p,i})).filter(p=>completed.has(p.i));
    collectedPoints.forEach((p,j)=>{
      if(j>0){const prior=collectedPoints[j-1];svg+=`<line x1="${prior.x*10}" y1="${prior.y*3.9}" x2="${p.x*10}" y2="${p.y*3.9}" stroke="#ebc39d" stroke-opacity=".25" stroke-width="1.3" stroke-dasharray="5 7"/>`;}
    });
    coords.forEach((p,i)=>{
      const lit=completed.has(i);svg+=`<circle cx="${p.x*10}" cy="${p.y*3.9}" r="${lit?'12':'4.5'}" fill="${lit?'#f3c998':'#a595bd'}" opacity="${lit?'.14':'.16'}"/>`;
      svg+=`<circle cx="${p.x*10}" cy="${p.y*3.9}" r="${lit?'3.7':'1.7'}" fill="${lit?'#fce2b6':'#c6b4d1'}" opacity="${lit?'1':'.35'}"/>`;
      if(lit) svg+=`<path d="M ${p.x*10-7} ${p.y*3.9} h 14 M ${p.x*10} ${p.y*3.9-7} v14" stroke="#f4e0cd" opacity=".48" stroke-width="1"/>`;
    });
    svg+='</svg>';root.innerHTML=svg;
    $('#cosmosCaption').textContent=liveCount()===0?'Your constellation is waiting for its first light.':liveCount()===31?'All 31 lights are shining. The story is yours forever.':`${liveCount()} shining ${liveCount()===1?'star':'stars'} — and so many little surprises still to come.`;
    const chips=$('#starChips');chips.replaceChildren();
    [...completed].sort((a,b)=>a-b).slice(-15).forEach(i=>{const c=el('span','star-chip',`✦ ${site.days[i].star}`);chips.appendChild(c);});
    if(!liveCount())chips.appendChild(el('span','star-chip muted','✧ Your first star will appear when you finish Day 1.'));
    if(liveCount()>15)chips.appendChild(el('span','star-chip muted',`and ${liveCount()-15} more shining memories…`));
  }
  function renderLetter(){const root=$('#letterText');root.replaceChildren();site.letter.forEach(t=>root.appendChild(el('p','',t)));}
  function markComplete(i){
    if(!completed.has(i)){completed.add(i);persist();renderCalendar();renderConstellation();confetti(32);}
    showResult(i);
  }
  function confetti(count=30){
    if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
    const old=$('.confetti-holder');if(old)old.remove();
    const holder=el('div','confetti-holder');holder.setAttribute('aria-hidden','true');
    const palette=['#f4c5d5','#ddc6f4','#eed4a2','#f5eee6','#cb9cbd'];
    for(let i=0;i<count;i++){
      const part=el('i','confetti-piece');part.style.left=((i*47.11)%100)+'%';part.style.background=palette[i%palette.length];part.style.setProperty('--duration',(2.5+i%7*.33)+'s');part.style.setProperty('--wind',((i%2?1:-1)*(80+i*4)%330)+'px');part.style.animationDelay=(i%7*.08)+'s';holder.appendChild(part);
    }
    document.body.appendChild(holder);setTimeout(()=>holder.remove(),5500);
  }
  function dialogBase(day,i,done){
    const isFinal=i===30;
    $('#dialogContents').innerHTML=`<div class="modal-layout"><div class="modal-scene ${isFinal?'finale-scene':''}" id="modalScene"><div class="scene-giant">${esc(day.icon)}</div><p class="scene-caption">${esc(day.line)}</p><div class="scene-sparkles">✦ ✧ ✦</div></div><div class="modal-story"><p class="modal-overline">${dateLabel(day.date)} · SURPRISE ${String(i+1).padStart(2,'0')} OF 31</p><h3 id="giftTitle">${esc(day.title)}</h3><p class="modal-memory-date">${esc(day.memory)}</p><div id="gameContent" class="game-area"></div><div class="modal-progress-note">${done?'✦ You already own this lovely memory. Revisit it whenever you want.':'♡ Complete this little activity to collect a star for your constellation.'}</div></div></div>`;
  }
  function openDialog(i,opts={}){
    if(!isOpen(i))return;
    activeIndex=i;returnFocus=document.activeElement;
    const dialog=$('#giftDialog');dialog.hidden=false;document.body.classList.add('dialog-open');dialogBase(site.days[i],i,completed.has(i));
    if(completed.has(i)&&!opts.replay)showResult(i);else renderGame(i);
    $('.gift-dialog').scrollTop=0;
    $('#dialogClose').focus();
  }
  function closeDialog(){if($('#giftDialog').hidden)return;$('#giftDialog').hidden=true;document.body.classList.remove('dialog-open');activeIndex=null;$('#dialogContents').replaceChildren();if(returnFocus&&returnFocus.isConnected) returnFocus.focus();}
  function resultScenePhoto(day){
    if(!day.photo)return;
    const scene=$('#modalScene');
    if(!scene)return;
    const img=document.createElement('img');img.src='photos/'+encodeURIComponent(day.photo);img.alt='A personal photo for '+day.title;img.style.cssText='position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:.38;filter:saturate(.7)';img.onerror=()=>img.remove();scene.prepend(img);
  }
  function showResult(i){
    const day=site.days[i],box=$('#gameContent');if(!box||activeIndex!==i)return;
    resultScenePhoto(day);
    box.innerHTML=`<div class="achievement"><span class="achievement-star">✦</span><div class="achievement-title">${esc(day.star)}</div><small>ONE LITTLE STAR, FOREVER YOURS</small></div><p class="revealed-message">${esc(day.message)}</p><p class="revealed-line">“${esc(day.line)}”</p><div class="result-actions"><button class="button button-primary" id="closeAfter" type="button">Keep this memory ♡</button><button class="button button-quiet" id="replayDay" type="button">Play again ↻</button></div>`;
    $('#closeAfter').addEventListener('click',closeDialog);
    $('#replayDay').addEventListener('click',()=>{dialogBase(day,i,true);renderGame(i);});
    if(i===30){
      const div=el('div','finale-dance');div.innerHTML='<span class="dance-icon">♡</span>One dance, a thousand feelings.<br /><small>Remember our happy dance to Darkhaast?</small>';
      box.appendChild(div);
      const audioArea=el('div');audioArea.innerHTML='<p class="finale-audio-note">Enjoy this original little instrumental. You can replace the music with your own licensed track if you wish.</p><audio controls class="finale-audio" preload="none"><source src="little-stars.wav" type="audio/wav">Audio playback is not supported.</audio>';
      const audio=$('audio',audioArea);audio.addEventListener('error',()=>{audioArea.remove();});
      box.appendChild(audioArea);
    }
  }
  const button = (label,cb,cls='game-tile') => {const b=el('button',cls,label);b.type='button';b.addEventListener('click',cb);return b;};
  function gameShell(day){
    const box=$('#gameContent');box.innerHTML='';box.appendChild(el('p','game-prompt',day.prompt));
    const area=el('div','game-play');box.appendChild(area);
    const feedback=el('div','game-feedback');feedback.setAttribute('aria-live','polite');box.appendChild(feedback);
    return {box,area,feedback};
  }
  function renderGame(i){
    const d=site.days[i];const {area,feedback}=gameShell(d);
    let count=0;const target=d.count||5;
    const progress=el('p','game-progress');
    const done=()=>markComplete(i);
    if(d.type==='collect'){
      area.appendChild(progress);const row=el('div','game-row');area.appendChild(row);
      for(let n=0;n<target;n++){
        const b=button(d.item||d.icon,()=>{if(b.disabled)return;b.disabled=true;b.classList.add('used');b.textContent='✦';count++;progress.textContent=`${count} of ${target} collected`;if(count>=target)setTimeout(done,300);});row.appendChild(b);
      }
      progress.textContent=`0 of ${target} collected`;
    }else if(d.type==='gift'){
      area.appendChild(progress);progress.textContent=`${target} ribbons to open`;
      const gift=button('🎁',()=>{count++;gift.style.transform=`rotate(${(count%2?-1:1)*count*4}deg) scale(${1-count*.025})`;progress.textContent=`${Math.max(0,target-count)} ribbons left`;if(count>=target){gift.disabled=true;gift.textContent='💝';setTimeout(done,450);}},'gift-button');area.appendChild(gift);
      area.appendChild(el('p','game-subtitle','Tap the gift to untie its ribbons.'));
    }else if(d.type==='slider'){
      const stage=el('div','slider-stage');stage.innerHTML='<span>♡</span><span class="heart-right">♡</span>';area.appendChild(stage);
      const range=el('input','game-range');range.type='range';range.min='0';range.max='100';range.value='0';range.setAttribute('aria-label','Move the hearts closer together');area.appendChild(range);
      area.appendChild(el('p','game-subtitle','Drag or tap the slider to bring the hearts together.'));
      range.addEventListener('input',()=>{const val=+range.value;stage.style.paddingInline=`${Math.min(34,val*.34)}%`;if(val>=95){range.disabled=true;stage.innerHTML='<span>💞</span>';feedback.textContent='Right where they belong. ♡';setTimeout(done,450);}});
    }else if(d.type==='phrase'){
      const form=el('form');form.setAttribute('autocomplete','off');
      const input=el('input','phrase-field');input.type='text';input.setAttribute('aria-label','Enter the three magic words');input.placeholder='I _ _ _ _  _ _ _';input.maxLength=28;form.appendChild(input);
      const submit=el('button','game-button','Open this memory ♡');submit.type='submit';form.appendChild(submit);area.appendChild(form);
      form.addEventListener('submit',e=>{e.preventDefault();if(input.value.trim().toUpperCase().replace(/\s+/g,' ')===d.answer){feedback.textContent='Exactly. The three most magical words. ♡';input.disabled=true;submit.disabled=true;setTimeout(done,350);}else feedback.textContent='Almost! Hint: I love you.';});
    }else if(d.type==='stars'){
      const group=el('div','game-starfield');group.setAttribute('aria-label','Five stars to discover');area.appendChild(group);area.appendChild(progress);progress.textContent=`0 of ${target} stars`;
      const positions=[[10,18],[75,13],[49,48],[19,68],[82,70]];
      for(let j=0;j<target;j++){const b=button('✦',()=>{if(b.disabled)return;b.disabled=true;b.classList.add('lit');count++;progress.textContent=`${count} of ${target} stars`;if(count===target)setTimeout(done,400);},'tap-star');b.style.left=positions[j%5][0]+'%';b.style.top=positions[j%5][1]+'%';b.setAttribute('aria-label',`Star ${j+1}`);group.appendChild(b);}
    }else if(d.type==='lantern'){
      area.appendChild(progress);progress.textContent='0 lights glowing';const row=el('div','game-row');area.appendChild(row);
      for(let j=0;j<target;j++){const b=button('♧',()=>{if(b.disabled)return;b.disabled=true;b.classList.add('lit');b.textContent='🪔';count++;progress.textContent=`${count} of ${target} lights glowing`;if(count===target)setTimeout(done,420);},'game-tile lantern-tile');b.setAttribute('aria-label',`Light number ${j+1}`);row.appendChild(b);}
    }else if(d.type==='bloom'){
      const art=button('🌱',()=>{count++;art.textContent=['🌱','🌿','🌷','🌺','🌸'][Math.min(count-1,4)];art.classList.add('growing');progress.textContent=`${Math.min(count,target)} of ${target} little touches`;if(count>=target){art.disabled=true;setTimeout(done,430);}},'bloom-art');area.appendChild(art);area.appendChild(progress);progress.textContent='0 of 5 little touches';
    }else if(d.type==='match'){
      const symbols=d.symbols||['♥','✦','♡'];const cards=[...symbols,...symbols].map((s,index)=>({s,id:index}));
      for(let j=cards.length-1;j>0;j--){const k=(j*13+7)%(j+1);[cards[j],cards[k]]=[cards[k],cards[j]];}
      const row=el('div','scratch-grid');area.appendChild(row);area.appendChild(progress);progress.textContent='Find all 3 pairs';
      let selected=null,busy=false,matches=0;
      cards.forEach(card=>{
        const b=button('✧',()=>{
          if(b.disabled||busy||b===selected)return;
          b.textContent=card.s;b.classList.add('flipped');
          if(!selected){selected=b;return;}
          const first=selected;selected=null;
          if(first.textContent===b.textContent){first.disabled=b.disabled=true;first.classList.add('matched');b.classList.add('matched');matches++;progress.textContent=`${matches} of 3 pairs found`;if(matches>=3)setTimeout(done,430);}
          else{busy=true;setTimeout(()=>{first.textContent='✧';b.textContent='✧';first.classList.remove('flipped');b.classList.remove('flipped');busy=false;},650);}
        });b.setAttribute('aria-label','Flip a memory card');row.appendChild(b);
      });
    }else if(d.type==='scratch'){
      const row=el('div','scratch-grid');area.appendChild(row);area.appendChild(progress);progress.textContent='Flip 4 hidden charms';
      const icons=['✧','✦','♡','❀','✩','☾'];
      for(let j=0;j<6;j++){const b=button('?',()=>{if(b.disabled)return;b.disabled=true;b.classList.add('flipped');b.textContent=icons[j];count++;progress.textContent=`${count} of 4 charms revealed`;if(count>=4){$$('button',row).forEach(e=>e.disabled=true);setTimeout(done,450);}});row.appendChild(b);}
    }else if(d.type==='choice'){
      const list=el('div');area.appendChild(list);
      d.choices.forEach((text,j)=>{const b=button(text,()=>{if(i===8&&j!==2){feedback.textContent='That was lovely too… but the little arm hold is what I remember most. ♡';b.style.borderColor='#f1d3c3';return;}$$('button',list).forEach(b=>b.disabled=true);b.style.background='#b898ba51';feedback.textContent='Of course. A memory I will never forget. ♡';setTimeout(done,550);},'choice-button');list.appendChild(b);});
    }else if(d.type==='cups'||d.type==='recipe'){
      const items=d.items||['☕','♡','✧'];
      const stage=el('div','game-steps');area.appendChild(stage);
      items.forEach(x=>{const piece=el('span','step-icon','✧');piece.setAttribute('aria-label','Ingredient not added');stage.appendChild(piece);});
      area.appendChild(progress);progress.textContent='Add the ingredients, one by one';
      const row=el('div','game-row');area.appendChild(row);
      const shuffled=items.map((x,j)=>({x,j})).sort((a,b)=>(a.j*11%7)-(b.j*11%7));
      shuffled.forEach(obj=>{
        const b=button(obj.x,()=>{if(obj.j!==count){feedback.textContent='Try adding the ingredients in the order shown in the story. ♡';return;}b.disabled=true;b.classList.add('used');const step=$$('.step-icon',stage)[count];step.textContent=obj.x;step.classList.add('active');count++;feedback.textContent='';progress.textContent=`${count} of ${items.length} ingredients`;if(count===items.length)setTimeout(done,480);});b.setAttribute('aria-label',`Add ingredient ${obj.x}`);row.appendChild(b);
      });
      area.appendChild(el('p','game-subtitle',`Recipe order: ${items.join(' → ')}`));
    }else if(d.type==='maze'){
      const stage=el('div','game-steps');area.appendChild(stage);
      d.steps.forEach((x,j)=>{const s=el('span','step-icon',j===0?'?':'✧');stage.appendChild(s);});
      area.appendChild(progress);progress.textContent='Choose the path to our little date';
      const row=el('div','game-row');area.appendChild(row);
      const options=['💗','☕','🚶','🍦','🪔'];options.forEach(x=>{
        const b=button(x,()=>{if(x!==d.steps[count]){feedback.textContent='A little detour! Try the next correct step. ♡';return;}const step=$$('.step-icon',stage)[count];step.textContent=x;step.classList.add('active');count++;progress.textContent=`${count} of ${d.steps.length} steps`;feedback.textContent='';if(count>=d.steps.length){$$('button',row).forEach(t=>t.disabled=true);setTimeout(done,430);}});row.appendChild(b);
      });area.appendChild(el('p','game-subtitle',`The path: ${d.steps.join(' → ')}`));
    }else if(d.type==='rhythm'){
      area.appendChild(progress);progress.textContent=`Tap the beat: 0 / ${target}`;
      const row=el('div','rhythm-tiles');area.appendChild(row);
      for(let j=0;j<target;j++){
        const b=button('',()=>{if(j!==count){feedback.textContent='Start at the left and follow the rhythm. ♡';return;}b.classList.add('hit');b.disabled=true;count++;feedback.textContent='';progress.textContent=`Tap the beat: ${count} / ${target}`;playTone(392+count*35,.13);if(count===target)setTimeout(done,550);},'');
        b.style.height=(54+((j*23)%50))+'px';b.setAttribute('aria-label',`Beat ${j+1}`);row.appendChild(b);
      }
      area.appendChild(el('p','game-subtitle','A little rhythm game, inspired by our dancing days.'));
    }else if(d.type==='finale'){
      area.appendChild(progress);progress.textContent='Make a wish. Five candles are waiting.';
      const cake=el('div','cake-display','🎂');cake.style.textAlign='center';area.appendChild(cake);
      const candles=el('div','candles');area.appendChild(candles);
      for(let j=0;j<target;j++){
        const b=button('🕯️',()=>{if(b.disabled)return;b.disabled=true;b.classList.add('out');b.textContent='✧';count++;progress.textContent=`${target-count} candles left`;if(count===target){feedback.textContent='Your wish is on its way. ✦';setTimeout(()=>{done();confetti(90);},750);}});b.setAttribute('aria-label',`Blow out candle ${j+1}`);candles.appendChild(b);
      }
    }else{
      area.appendChild(button('Open this memory ♡',done,'game-button'));
    }
  }
  // Tiny synthesised chimes: original sounds, no copyrighted songs or files required.
  let audioContext=null;let musicTimer=null;let noteCount=0;
  const tones=[261.63,329.63,392,523.25,392,329.63,293.66,349.23,440,349.23,293.66,261.63];
  function getAudioContext(){try{const AudioCtx=window.AudioContext||window.webkitAudioContext;if(!AudioCtx)return null;if(!audioContext)audioContext=new AudioCtx();if(audioContext.state==='suspended')audioContext.resume();return audioContext;}catch(_){return null;}}
  function playTone(frequency,duration=.68,volume=.018){
    const ctx=getAudioContext();if(!ctx)return;
    const oscillator=ctx.createOscillator(),gain=ctx.createGain();oscillator.type='sine';oscillator.frequency.value=frequency;
    gain.gain.setValueAtTime(.0001,ctx.currentTime);gain.gain.exponentialRampToValueAtTime(volume,ctx.currentTime+.055);gain.gain.exponentialRampToValueAtTime(.0001,ctx.currentTime+duration);
    oscillator.connect(gain);gain.connect(ctx.destination);oscillator.start(ctx.currentTime);oscillator.stop(ctx.currentTime+duration+.05);
  }
  function toggleMusic(){
    const btn=$('#musicButton');if(musicTimer){clearInterval(musicTimer);musicTimer=null;btn.setAttribute('aria-pressed','false');$('#musicText').textContent='music off';$('#musicIcon').textContent='♫';return;}
    if(!getAudioContext()){toast('This browser cannot play background music.');return;}
    playTone(tones[noteCount++%tones.length],.9,.012);musicTimer=setInterval(()=>{if(document.hidden)return;playTone(tones[noteCount++%tones.length],1.12,.012);},820);
    btn.setAttribute('aria-pressed','true');$('#musicText').textContent='music on';$('#musicIcon').textContent='♪';
  }
  function tiltCards(){
    if(window.matchMedia('(prefers-reduced-motion: reduce)').matches || !window.matchMedia('(hover:hover) and (pointer:fine)').matches)return;
    $$('.floating-card').forEach(card=>{
      card.addEventListener('pointermove',event=>{
        const box=card.getBoundingClientRect();const x=(event.clientX-box.left)/box.width-.5,y=(event.clientY-box.top)/box.height-.5;
        card.style.transform=`rotateY(${x*15}deg) rotateX(${-y*15}deg) translateY(-5px)`;card.style.animationPlayState='paused';
      });
      card.addEventListener('pointerleave',()=>{card.style.transform='';card.style.animationPlayState='running';});
    });
  }
  function init(){
    createStars();renderCalendar();renderStory();renderConstellation();renderLetter();tiltCards();
    $('#dialogClose').addEventListener('click',closeDialog);
    $('#giftDialog').addEventListener('click',event=>{if(event.target===$('#giftDialog'))closeDialog();});
    document.addEventListener('keydown',e=>{
      if($('#giftDialog').hidden)return;
      if(e.key==='Escape'){closeDialog();return;}
      if(e.key==='Tab'){
        const selectors='a[href],button:not([disabled]),input:not([disabled]),audio[controls]';const focusable=$$(selectors,$('.gift-dialog')).filter(x=>x.offsetParent!==null);
        if(!focusable.length)return;
        const first=focusable[0],last=focusable[focusable.length-1];
        if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}
        else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}
      }
    });
    $('#musicButton').addEventListener('click',toggleMusic);
    document.addEventListener('visibilitychange',()=>{if(!document.hidden)renderCalendar();});
    setInterval(()=>{renderCalendar();},60000);
    if(DEV_PREVIEW){const dev=el('div');dev.textContent='LOCAL PREVIEW · ALL DAYS UNLOCKED';dev.style.cssText='position:fixed;left:10px;bottom:84px;z-index:80;background:#d7c4e8;color:#25182e;padding:7px 11px;border-radius:6px;font:10px system-ui';document.body.appendChild(dev);}
  }
  init();
})();
