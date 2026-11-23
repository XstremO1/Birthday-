/*
  OUR LITTLE FOREVER — editable story content
  All dates in the advent calendar are in 2026 (India Standard Time).
  Memories are presented in the order of your story, without assuming a year
  for the original events. No real names/photos have been invented.
*/
window.LOVE_SITE = {
  title: 'Our Little Forever',
  openingDate: '2026-11-25',
  birthdayDate: '2026-12-25',
  timezone: 'Asia/Kolkata',
  greeting: 'Hey, my favourite person.',
  openingLine: 'Some stories begin with fireworks. Ours began with a packet of chips.',
  signature: 'Always yours',
  letter: [
    'I still smile when I think about the day we first met. A packet of chips, an ordinary date, and absolutely no idea that this would become one of the most beautiful chapters of my life.',
    'Somewhere between our little walks, our silly jokes, surprise meetings, shared food, and the way we somehow turn simple days into stories, you became my favourite person to make memories with.',
    'I love the big moments, of course. But I love the small ones just as much: holding your hand, hearing you laugh, seeing you unexpectedly, and realising that even five minutes with you can feel special.',
    'This little world is my way of remembering the things we have shared and celebrating all the beautiful moments still waiting for us.',
    'Happy birthday, my love. I hope this year gives you as much happiness as you have brought into my world.'
  ],
  // Each challenge works without photos. To add personal photos, see photos/README.md.
  days: [
    {date:'2026-11-25',icon:'🍟',title:'It Started with Chips',memory:'August 25 · Our first meeting',type:'collect',item:'🍟',count:5,prompt:'Collect five little chips to open the first page of our story.',message:'Who knew our first chips date would become the beginning of so many favourite memories? It wasn’t about where we went or what we ate. It was the very first page of us.',line:'The best stories sometimes start with the simplest snacks.',star:'The First Spark',photo:'chips-date.jpg'},
    {date:'2026-11-26',icon:'💞',title:'The Day We Became Us',memory:'August 31 · Our beginning',type:'gift',count:5,prompt:'Untie the five little ribbons on this very important gift.',message:'August 31 became our date. A day that changed ordinary calendars into something meaningful, because from then on there was an us to celebrate.',line:'One date. Two hearts. A whole story waiting.',star:'The Beginning'},
    {date:'2026-11-27',icon:'🌼',title:'A Sweet Little Blessing',memory:'September 11 · At Shelke’s home',type:'lantern',count:5,prompt:'Light the five little lamps to bring this memory to life.',message:'That day at Shelke’s home, when we offered our respects together, became another quiet memory I keep close. Something about sharing even the simple traditions felt lovely.',line:'Some moments feel special because they are shared.',star:'The Blessing'},
    {date:'2026-11-28',icon:'💌',title:'Three Little Words',memory:'September 14 · Our first “I love you”',type:'phrase',answer:'I LOVE YOU',prompt:'Type the three words that changed everything. (Hint: I ___ ___)',message:'The first time I said “I love you.” Three small words, yet somehow they carried everything my heart had been trying to say.',line:'I love you. Then, now, and in every little moment.',star:'The Three Words'},
    {date:'2026-11-29',icon:'🤝',title:'Hand in Hand',memory:'September 21 · Middle Class Society',type:'slider',prompt:'Slide the two hearts together until they meet.',message:'Holding hands at Middle Class Society was such a tiny gesture, but it made the world feel different. One hand in mine; one memory I will always treasure.',line:'Sometimes holding a hand says everything.',star:'The First Handhold'},
    {date:'2026-11-30',icon:'🪔',title:'A Night of Lights',memory:'October 7 · Navratri at MCS',type:'stars',count:5,prompt:'Find and tap all five glowing stars from that festive night.',message:'Our Navratri meet at MCS had its own kind of sparkle. I remember the excitement of seeing you more than anything around us.',line:'Every festival felt brighter with you there.',star:'The Festival Light'},
    {date:'2026-12-01',icon:'🌺',title:'A Day Worth Keeping',memory:'October 12 · The puja at your home',type:'bloom',count:5,prompt:'Give this flower five little touches to help it bloom.',message:'The puja at your home and the little moment of holding hands afterward made a day that already felt special even sweeter.',line:'The loveliest memories grow quietly.',star:'The Quiet Bloom'},
    {date:'2026-12-02',icon:'🍬',title:'Sweet Like That Day',memory:'October 31 · Our faral date',type:'match',symbols:['🍬','🪔','💗'],prompt:'Find all three matching pairs to unlock our festive memory.',message:'Faral, a festive mood, and the chance to meet you again. I could turn so many of our ordinary meet-ups into a list of favourite dates.',line:'The sweetest part of every celebration was you.',star:'The Sweet Memory'},
    {date:'2026-12-03',icon:'🌊',title:'By the Lake',memory:'November 2 · A first little arm hold',type:'choice',choices:['The beautiful view','The snacks','The moment you held my arm'],prompt:'What do you think I remember most about that lake visit? Pick one.',message:'We met with everyone by the lake, and you held my arm for the first time. It was small, unexpected, and more memorable than the whole view.',line:'The most important detail was standing right beside me.',star:'The Lake'},
    {date:'2026-12-04',icon:'🫂',title:'The Hug I Didn’t Expect',memory:'November 17 · Our first hug',type:'slider',prompt:'Bring these two little hearts together, just like that first hug.',message:'You surprised me with our very first hug. I still love the thought of that moment: the surprise, the warmth, and the feeling of being close to you.',line:'Some surprises feel like home.',star:'The First Hug'},
    {date:'2026-12-05',icon:'📸',title:'Our Favourite Frame',memory:'November 22 · Our first best picture',type:'match',symbols:['📸','✨','💞'],prompt:'Match three little pairs to reveal our photo memory.',message:'Our first truly favourite picture together. I love that one photograph can carry the feeling of an entire day.',line:'A picture of us is never just a picture.',star:'The Photograph',photo:'first-best-photo.jpg'},
    {date:'2026-12-06',icon:'🌻',title:'Golden Hour',memory:'December 4 · Seeing you at the Haldi',type:'bloom',count:5,prompt:'Wake up five golden petals to reveal this memory.',message:'Seeing you at the Haldi was one of those times I simply thought: how can someone look this cute? That memory still makes me smile.',line:'You made a golden day even brighter.',star:'The Golden Petal'},
    {date:'2026-12-07',icon:'👨‍👩‍👧‍👦',title:'A Picture with Everyone',memory:'December 5 · A photograph in front of the family',type:'scratch',count:6,prompt:'Flip four little snapshots to uncover the moment.',message:'A picture together in front of the whole family—and you looked so beautiful. One of those photographs that feels extra precious because of everything around it.',line:'One frame. So many butterflies.',star:'The Family Frame',photo:'family-photo.jpg'},
    {date:'2026-12-08',icon:'🏡',title:'The Almost-Surprise',memory:'December 12 · A visit to your home',type:'choice',choices:['A calm little visit','An unexpected plot twist','A perfectly planned movie scene'],prompt:'What kind of movie would that visit make?',message:'That visit to your home turned into a funny, heart-racing little adventure when your mother came back unexpectedly. Even our unexpected moments become stories I smile at.',line:'Every good love story has a few funny plot twists.',star:'The Plot Twist'},
    {date:'2026-12-09',icon:'✨',title:'Five Minutes, Forever',memory:'December 16 · Our private mangalsutra moment',type:'lantern',count:5,prompt:'Light five little streetlights—one for every minute of our special meeting.',message:'An empty street. Just five minutes together. And I put the mangalsutra on you as a birthday gift. It was never a real wedding; it was our own private, playful, heartfelt “unofficial wedding” moment—special because of what it meant to us.',line:'Some promises live in moments, not ceremonies.',star:'The Five-Minute Promise'},
    {date:'2026-12-10',icon:'😘',title:'A Kiss on the Cheek',memory:'December 22 · An early birthday celebration',type:'collect',item:'💋',count:5,prompt:'Catch five little kisses floating through the air.',message:'That sweet birthday celebration, and our first kiss on the cheek. A simple, tender memory that still makes me a little shy to think about.',line:'A tiny kiss. A very big smile.',star:'The First Cheek Kiss'},
    {date:'2026-12-11',icon:'💋',title:'Our First Kiss',memory:'February 2 · A new first',type:'stars',count:5,prompt:'Connect the memory by finding its five little stars.',message:'Our first kiss. One of those moments that doesn’t need a big description, because some memories are beautiful enough just as they are.',line:'A moment I hold close to my heart.',star:'The Kiss'},
    {date:'2026-12-12',icon:'☕',title:'An Ordinary Day, Made Ours',memory:'February 25 and March 6 · Meeting again',type:'cups',items:['☕','💗','✨'],prompt:'Add the three ingredients for our perfect little date.',message:'From seeing each other again to meeting outside Orion, we kept finding reasons to make time for us. The little meet-ups always mattered.',line:'It never needed to be a grand plan.',star:'The Little Date'},
    {date:'2026-12-13',icon:'🍔',title:'Six Months and a Burger',memory:'March 13 · Six-month celebration at Orion',type:'recipe',items:['🍞','🥬','🧀','💗'],prompt:'Make the perfect little celebration burger, layer by layer.',message:'Celebrating six months with a burger at Orion feels wonderfully us. Nothing overly fancy—just food, laughter, and another milestone together.',line:'Six months, countless little reasons to smile.',star:'The Six-Month Star'},
    {date:'2026-12-14',icon:'🌿',title:'My Beautiful Lakshmi',memory:'March 30 · Gudi Padwa and vada pav',type:'match',symbols:['🌿','🥪','💗'],prompt:'Find the three matching pairs from this festive date.',message:'On Gudi Padwa, I came to see my beautiful Lakshmi. You looked lovely, and even our vada pav date felt like a celebration.',line:'A little festival, a little food, a lot of love.',star:'The Gudi Padwa Glow'},
    {date:'2026-12-15',icon:'🍦',title:'Ice Cream & Long Walks',memory:'April 13 · Ice cream at MCS ground',type:'collect',item:'🍦',count:5,prompt:'Collect five scoops to make a sweet memory.',message:'Ice cream at MCS ground, walking around, and being together. The kind of date that proves the simplest afternoons can be the best.',line:'I’d choose another simple walk with you any day.',star:'The Ice Cream Scoop'},
    {date:'2026-12-16',icon:'🍳',title:'Our Kitchen Date',memory:'April 17 · Six hours at your home',type:'recipe',items:['🥕','🍅','🍲','💗'],prompt:'Add the ingredients in order to cook up this lovely memory.',message:'Six hours together, cooking food, laughing, enjoying the day, and feeding each other. Our little kitchen date felt like having a beautiful world all to ourselves.',line:'My favourite ingredient will always be you.',star:'The Kitchen Star'},
    {date:'2026-12-17',icon:'🍨',title:'The Ice Cream Club',memory:'May 5 · Back to Orion',type:'choice',choices:['Another ice cream','Another little date','Both, obviously!'],prompt:'Choose our official ice-cream-club answer.',message:'Back to Orion for ice cream. Somehow, every return visit gave us a completely new memory.',line:'Same place, new smiles.',star:'The Second Scoop'},
    {date:'2026-12-18',icon:'📿',title:'The Little Anklet',memory:'May 21 · An anklet and lots of teasing',type:'scratch',count:6,prompt:'Reveal four tiny charms hidden in this jewellery box.',message:'Meeting Satvik, teasing him a little, and getting to put the anklet on you. I love how our stories are a mixture of sweetness and mischief.',line:'The littlest gifts can hold the loveliest memories.',star:'The Anklet Charm'},
    {date:'2026-12-19',icon:'🧁',title:'The Trio Café Date',memory:'May 31 · Our favourite café date',type:'match',symbols:['☕','📸','💗'],prompt:'Match the little café icons to unlock one of our best dates.',message:'Trio Café: one of our very best dates, and one of our favourite photos. If I could revisit one happy afternoon, this would be high on the list.',line:'The kind of date that becomes a forever favourite.',star:'The Café Frame',photo:'trio-cafe.jpg'},
    {date:'2026-12-20',icon:'🍵',title:'Tea, You & Me',memory:'June 20 · Tealogy kulhad tea date',type:'cups',items:['🍵','✨','💗'],prompt:'Add warmth, sparkle, and love to our little tea cup.',message:'Kulhad tea at Tealogy, and one more lovely date to add to our story. Sometimes all I need is a cup of tea and a little time with you.',line:'You make even tea taste like a memory.',star:'The Kulhad'},
    {date:'2026-12-21',icon:'🗺️',title:'The Unplanned Adventures',memory:'June 27 & July 5 · Mystery café dates',type:'maze',steps:['🚶','☕','💗'],prompt:'Follow the little path: a walk, a café, and a happy ending.',message:'Those spontaneous café trips—sometimes we hardly remembered what we ordered, but we remembered being together. That’s what I love about us.',line:'Not every adventure needs a map.',star:'The Detour'},
    {date:'2026-12-22',icon:'🎶',title:'Dance with Me',memory:'August 6–9 · Our dancing days',type:'rhythm',count:7,prompt:'Tap through seven beats and make our little hearts dance.',message:'From the dancing days to the moment we finished, I loved the energy, the fun, and the chance to share another little adventure with you.',line:'Every memory has a rhythm. Yours is my favourite.',star:'The Dance'},
    {date:'2026-12-23',icon:'🫶',title:'The Best Kind of Detour',memory:'August 10–31 · Bistro, hugs and surprises',type:'gift',count:5,prompt:'Open the surprise box and find out why plans do not need to be perfect.',message:'The trek didn’t work out, but our Bistro date did—and it was lovely. Then came our stairway hugs and your amazing August 31 surprise, including that action figure. You have such a beautiful way of making ordinary days feel exciting.',line:'My favourite plans are the ones that end with you.',star:'The Surprise'},
    {date:'2026-12-24',icon:'🎇',title:'Every Road Led to Us',memory:'September–October · Surprises, Kharghar, Diwali & cuddles',type:'stars',count:5,prompt:'Light the five stars that lead us toward tomorrow.',message:'More surprise visits, our Kharghar outing and shopping, Diwali with the perfect little friend group, and those cosy hugs and cuddles. There are so many moments I couldn’t possibly fit into just one page—but I remember how they made me feel.',line:'Tomorrow is your day, and I already can’t wait.',star:'The Night Before'},
    {date:'2026-12-25',icon:'🎂',title:'The Birthday of My Favourite Person',memory:'December 25 · Your special day',type:'finale',count:5,prompt:'Make a wish and gently blow out five little birthday candles.',message:'I still remember the birthday surprise, our happy hug, dancing together to Darkhaast, laughing and enjoying the ice-cream cone you love. Those memories are among my favourites. Today, I want to celebrate you again—not just for the moments we shared, but for the wonderful person you are.',line:'Happy birthday, my love. Here’s to every tomorrow with you.',star:'Our Little Forever',photo:'birthday-memory.jpg'}
  ],
  chapters: [
    {id:'beginning',kicker:'CHAPTER ONE',title:'The beautiful beginning',subtitle:'A packet of chips. One first hello. So many unexpected firsts.',events:[
      ['Aug 25','Our first meeting','Our first date was a chips date. Simple, sweet, unforgettable.','🍟','chips-date.jpg'],
      ['Aug 31','We became us','The date our story officially began.','💞'],
      ['Sep 11','A day at Shelke’s home','Offering our respects together and making a quiet memory.','🌼'],
      ['Sep 14','The first “I love you”','Three words we would never forget.','💌'],
      ['Sep 21','The first handhold','Holding hands at Middle Class Society.','🤝'],
      ['Oct 7','Navratri together','A festive meet-up at MCS.','🪔'],
      ['Oct 12','The puja and a handhold','A lovely visit to your home, followed by a quiet moment.','🌺'],
      ['Oct 31','Our faral date','Festive treats and another reason to meet.','🍬'],
      ['Nov 2','By the lake','You held my arm for the first time.','🌊'],
      ['Nov 17','Our first hug','You surprised me with a hug I still remember.','🫂'],
      ['Nov 22','A favourite photo','Our first picture that felt truly special.','📸','first-best-photo.jpg'],
      ['Dec 4','Haldi day','You looked impossibly cute.','🌻'],
      ['Dec 5','A photo in front of the family','A beautiful moment caught in a frame.','👨‍👩‍👧‍👦','family-photo.jpg'],
      ['Dec 12','The unexpected visit','A home visit and a funny last-minute surprise.','🏡'],
      ['Dec 16','Our five-minute promise','On an empty street, I put the mangalsutra on you as a birthday gift. Our private, symbolic “unofficial wedding” moment—not an actual wedding.','✨'],
      ['Dec 22','An early birthday celebration','Our first kiss on the cheek.','😘'],
      ['Dec 25','A birthday to remember','A surprise, a hug, dancing to Darkhaast, and your favourite ice-cream cone.','🎂','birthday-memory.jpg']
    ]},
    {id:'little-dates',kicker:'CHAPTER TWO',title:'Our thousand little dates',subtitle:'The places that became special because we were together.',events:[
      ['Feb 2','Our first kiss','A sweet, meaningful first.','💋'],
      ['Feb 25','Meeting again','Another little day for us.','💗'],
      ['Mar 6','Outside Orion','A date made special by your company.','☕'],
      ['Mar 13','Celebrating six months','A burger and a sweet little milestone at Orion.','🍔'],
      ['Mar 30','Gudi Padwa together','I met my beautiful Lakshmi, and we had a vada pav date.','🌿'],
      ['Apr 13','Ice cream and a walk','MCS ground, ice cream and wandering together.','🍦'],
      ['Apr 17','Our kitchen date','Six wonderful hours, cooking and feeding each other.','🍳'],
      ['May 5','Back to Orion','Another ice-cream date.','🍨'],
      ['May 21','The little anklet','Meeting Satvik, teasing him, and putting an anklet on you.','📿'],
      ['May 31','Trio Café','One of our best dates and a favourite photograph.','🧁','trio-cafe.jpg'],
      ['Jun 20','Tealogy','Kulhad tea and another sweet memory.','🍵'],
      ['Jun 27','An unplanned café visit','A spontaneous little escape and a lot of laughter.','🗺️']
    ]},
    {id:'more-adventures',kicker:'CHAPTER THREE',title:'More stories, more us',subtitle:'Surprises, tiny detours, dancing and all the everyday magic.',events:[
      ['Jul 5','Another café adventure','We went for coffee and probably ordered something else!','☕'],
      ['Aug 6–9','Dance days','A little adventure with music and movement.','🎶'],
      ['Aug 10','The trek that became a date','The trek failed, but our Bistro date was perfect.','🫂'],
      ['Aug 22','A stairway hug','One of those short, cosy meetings.','🫶'],
      ['Aug 31','Your beautiful surprise','You surprised me, and even brought an action figure.','🎁'],
      ['Sep 9','Baked treats and a date','Another sweet little outing.','🥐'],
      ['Sep 14','A surprise with everyone','Smiles, company, and another hug.','🎈'],
      ['Sep 26','The almost-secret surprise','A plan that became a funny little story.','💌'],
      ['Sep 30','Our Kharghar day','Walking, eating, and shopping for your mother’s birthday.','🛍️'],
      ['Oct 7','A cute little meet-up','Another reason to share a hug.','🫂'],
      ['Oct 18','A simple Diwali visit','An evening at Middle Class ground.','🪔'],
      ['Oct 20','A Diwali to remember','A lovely festival with a wonderful friend group.','🎆'],
      ['Oct 22','Our Padwa meet-up','Another little celebration together.','🌼'],
      ['Oct 28–30','Finding our cosy moments','Time to talk, be together, hug and cuddle.','💗']
    ]}
  ]
};
