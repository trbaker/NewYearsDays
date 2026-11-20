/* Label stacked table cells for narrow screens */
function labelStackCells(){for(const c of document.querySelectorAll('.stack td:not([data-l])')){let i=0,p=c;while(p=p.previousElementSibling)i+=p.colSpan;c.dataset.l=c.closest('table').rows[0].cells[i]?.textContent||''}}
labelStackCells();new MutationObserver(labelStackCells).observe(document.body,{childList:true,subtree:true});

{
/* ---------- data ---------- */
const TYPES={solar:'Solar',star:'Star-based',lunisolar:'Lunisolar',lunar:'Lunar'};
const DIFF={relocation:'Relocation',contagious:'Contagious expansion',hierarchical:'Hierarchical expansion',stimulus:'Stimulus expansion'};
const yrs=n=>Array.from({length:12},(_,i)=>2027+i);
const CASES=[
{id:'jan1',short:'January 1',title:'New Year’s Day (Gregorian)',when:'Friday, January 1, 2027',begins:'2027 CE',type:'solar',
 hearth:{name:'Rome',at:[12.48,41.89]},
 drift:Array(12).fill('01-01'),
 routes:[['Madrid · 1582',-3.70,40.42],['Mexico City · 1580s',-99.13,19.43],['London · 1752',-0.13,51.51],['Tokyo · 1873',139.69,35.68],['Beijing · 1912',116.40,39.90],['Moscow · 1918',37.62,55.76],['Istanbul · 1926',28.98,41.01]],
 choro:true,
 origins:'Roman consuls began their terms on January 1 from 153 BCE, and Julius Caesar’s Julian calendar (45 BCE) kept that start. Medieval Europe often began the year on other days: England used March 25 until 1752. In 1582 Pope Gregory XIII reformed the calendar by dropping ten days and tightening the leap-year rule.',
 spread:'Catholic kingdoms and their American empires switched first, Protestant states mostly in the 1700s (Britain and its colonies in 1752), and Orthodox and Asian states much later: Japan in 1873, China in 1912, Russia in 1918, Greece in 1923, Turkey in 1926. Colonial governments, trade, and later international standards made it the world’s shared civil calendar. A few countries still keep another calendar as official.',
 land:'Midnight fireworks over harbors and towers, countdown clocks, and the Times Square ball drop.',
 why:'January 1 sits just after the December solstice, but the date was set by Roman politics, not by farming or the sky.',
 look:'Find the countries shaded coral. They still use another calendar as official. What do Iran, Afghanistan, Ethiopia, and Nepal have in common in their history?',
 key:{type:'solar',dif:['hierarchical','relocation','contagious'],note:'<b>Hierarchical:</b> decreed by a pope, then adopted by monarchs and governments. <b>Relocation:</b> colonists carried it to the Americas and Oceania. <b>Contagious:</b> trade and globalization kept spreading it as a shared standard, even where another calendar sets religious holidays.',land:'Fireworks displays, countdown clocks, crowds in public squares.',why:'Political: Roman officials took office on January 1. It isn’t tied to a season or a harvest.'}},
{id:'lunar',short:'Lunar New Year',title:'Lunar New Year (Chunjie · Seollal · Tết · Tsagaan Sar)',when:'Saturday, February 6, 2027',begins:'Year of the Goat',type:'lunisolar',
 hearth:{name:'Yellow River valley',at:[112.45,34.62]},
 drift:['02-06','01-26','02-13','02-03','01-23','02-11','01-31','02-19','02-08','01-28','02-15','02-04'],
 core:['CN','TW','HK','MO','KR','KP','VN','SG','MY','ID','BN','PH','MN','MU'],obs:['US','CA','GB','AU','NZ','FR','PE','TH'],
 routes:[['Seoul',126.98,37.57],['Hanoi',105.85,21.03],['Ulaanbaatar',106.92,47.92],['San Francisco',-122.42,37.77,[113.26,23.13]],['Vancouver',-123.12,49.28,[113.26,23.13]],['Lima',-77.04,-12.05,[113.26,23.13]],['London',-0.13,51.51,[113.26,23.13]],['Sydney',151.21,-33.87,[113.26,23.13]],['Port Louis',57.50,-20.16,[113.26,23.13]]],
 origins:'Rooted in the farming calendar of China’s Yellow River valley, the year begins on the second new moon after the winter solstice, so it always lands between January 21 and February 20. Leap months keep the lunar months in step with the seasons.',
 spread:'Chinese dynasties’ influence carried the calendar to Korea, Vietnam, and Mongolia, and each society made it its own: Vietnam’s zodiac has a cat instead of a rabbit and a water buffalo instead of an ox. In the 1800s and 1900s, migrants from Guangdong and Fujian brought the festival to Chinatowns from San Francisco and Lima to Port Louis, where Mauritius now gives it a public holiday.',
 land:'Red lanterns and paper couplets on doorways, lion and dragon dances, Chinatown gateways, and the world’s largest yearly human migration as families travel home.',
 why:'It’s also called the Spring Festival, marking the turn from late winter toward planting time.',
 look:'The pale shading marks countries where the festival is a major local celebration but not a national holiday. How did it get there?',
 key:{type:'lunisolar',dif:['contagious','hierarchical','stimulus','relocation'],note:'<b>Expansion</b> through East Asia via trade and the courts of neighboring kingdoms (<b>hierarchical</b>). <b>Stimulus:</b> Korea and Vietnam adapted it into Seollal and Tết with their own customs. <b>Relocation:</b> the Chinese diaspora carried it to cities worldwide.',land:'Red lanterns, couplets, lion dances, Chinatown gates (paifang).',why:'End of winter and start of the farming year: a “spring” festival on a moon-based calendar.'}},
{id:'nowruz',short:'Nowruz',title:'Nowruz (Persian New Year)',when:'Sunday, March 21, 2027',begins:'Year 1406 (Solar Hijri)',type:'solar',
 hearth:{name:'Persepolis, Iran',at:[52.89,29.94]},
 drift:['03-21','03-20','03-20','03-21','03-21','03-20','03-20','03-21','03-21','03-20','03-20','03-21'],
 core:['IR','AF','AZ','TJ','UZ','KZ','KG','TM','AL','IQ'],obs:['TR','SY','IN','PK','GE','US','CA'],
 routes:[['Baku',49.87,40.41],['Samarkand',66.96,39.65],['Kabul',69.17,34.53],['Erbil',44.01,36.19],['Tirana',19.82,41.33],['Los Angeles',-118.24,34.05],['Toronto',-79.38,43.65]],
 origins:'Nowruz means “new day.” Its roots run back more than 3,000 years to Zoroastrian Persia. The year begins at the exact moment of the spring equinox. In 2027 that is 20:24 UTC on March 20, which is already March 21 in Tehran.',
 spread:'Persian empires and courts carried it across the Iranian plateau, the Caucasus, and Central Asia. It outlasted the arrival of Islam and became part of Muslim life, and Albania’s Sultan Nevruz is tied to the Bektashi order of Ottoman times. Central Asian republics made it a national holiday after the Soviet Union collapsed. The UN recognized an International Day of Nowruz in 2010. The Taliban has banned public celebrations in Afghanistan, and for Kurds, Newroz is also a statement of identity.',
 land:'The haft-sin table of seven symbolic items, sprouted wheat (sabzeh), bonfire jumping on the last Wednesday of the year, and whole-house spring cleaning.',
 why:'The spring equinox: equal day and night, the return of growth, planting season.',
 look:'Nowruz is shaded across countries that are mostly Muslim, yet it is older than Islam. What concept describes two traditions blending?',
 key:{type:'solar',dif:['hierarchical','contagious','relocation'],note:'<b>Hierarchical</b> through Persian imperial courts, <b>contagious</b> along Silk Road communities, and <b>relocation</b> through Iranian and Kurdish diasporas. It shows <b>syncretism</b>, a pre-Islamic festival living inside Islamic societies, and <b>cultural resistance</b> where it is restricted.',land:'Haft-sin tables, sabzeh sprouts, Chaharshanbe Suri bonfires.',why:'Set by the spring equinox: astronomy and the agricultural cycle.'}},
{id:'songkran',short:'Songkran',title:'Songkran and the April new years',when:'April 13–15, 2027 (Thailand)',begins:'Traditional new year (Thailand counts 2570 BE all of 2027)',type:'solar',
 hearth:{name:'Ujjain, India',at:[75.78,23.18]},
 drift:Array(12).fill('04-13'),
 core:['TH','LA','KH','MM','LK','BD','NP'],obs:['IN'],
 routes:[['Bangkok',100.50,13.76],['Vientiane',102.63,17.97],['Phnom Penh',104.92,11.56],['Yangon',96.17,16.84],['Colombo',79.86,6.93],['Dhaka',90.41,23.81],['Kathmandu',85.32,27.72]],
 origins:'Songkran comes from the Sanskrit <i>sankranti</i>, the sun’s passage into a new zodiac sign. The new year starts when the sun enters Aries on the star-fixed (sidereal) zodiac of Indian astronomy, whose reference meridian ran through Ujjain.',
 spread:'Traders, Buddhist monks, and Brahmin advisers at royal courts carried Indian calendar knowledge into Sri Lanka and mainland Southeast Asia. Each culture reshaped it: Songkran in Thailand, Pi Mai in Laos, Choul Chnam Thmey in Cambodia, Thingyan in Myanmar, Aluth Avurudu and Puthandu in Sri Lanka, Pohela Boishakh in Bangladesh, Vaisakhi in Punjab. Thailand moved its official new year to January 1 in 1941, but Songkran remains the cultural one. UNESCO listed Songkran in Thailand as Intangible Cultural Heritage in 2023.',
 land:'Water splashing in the streets, scented water poured over elders’ hands and Buddha images, and sand stupas built in temple courtyards.',
 why:'The hottest point of the dry season, just before monsoon rains begin the rice-planting year.',
 look:'Every shaded country sits near India. What kinds of connections (trade, religion, rulers) could explain this cluster?',
 key:{type:'solar',dif:['hierarchical','contagious','stimulus'],note:'<b>Hierarchical:</b> royal courts adopted Indian astronomy and Brahmin advisers. <b>Contagious:</b> trade and Buddhist monasteries spread it to ordinary people. <b>Stimulus:</b> each culture kept the idea but created its own customs, such as Thai water festivals and Burmese Thingyan.',land:'Water fights, temple sand stupas, water-pouring blessings.',why:'Solar timing at the end of the hot dry season, before the monsoon and planting.'}},
{id:'hijri',short:'Islamic New Year',title:'Islamic New Year (Ras as-Sana al-Hijriyya)',when:'Sunday, June 6, 2027 (begins at sunset June 5)',begins:'Year 1449 AH',type:'lunar',
 hearth:{name:'Mecca and Medina',at:[39.83,21.42]},
 drift:['06-06','05-25','05-14','05-04','04-23','04-11','04-01','03-22','03-11','02-29','02-17','02-06'],
 core:['MA','DZ','TN','LY','EG','SD','SO','DJ','MR','SN','GM','GN','ML','NE','TD','SL','BF','KM','TR','SY','LB','JO','IQ','IR','SA','YE','OM','AE','QA','BH','KW','PS','AF','PK','BD','MV','MY','ID','BN','AZ','KZ','UZ','TJ','TM','KG','AL','XK','BA'],obs:['IN','NG','ET','TZ','ER','CI'],
 routes:[['Medina (the Hijra, 622)',39.61,24.47],['Cairo',31.24,30.04],['Córdoba',-4.78,37.88],['Timbuktu',-3.01,16.77],['Istanbul',28.98,41.01],['Samarkand',66.96,39.65],['Delhi',77.21,28.61],['Jakarta',106.85,-6.21]],
 origins:'The Islamic calendar counts from the Hijra, Muhammad’s migration from Mecca to Medina in 622 CE, which was adopted as year 1 under Caliph Umar. It has 12 lunar months and no leap month, so the year is only 354 or 355 days long.',
 spread:'Islam is a universalizing religion. It spread with Arab caliphates, with merchants across the Sahara and the Indian Ocean to West Africa, the Swahili coast, and Indonesia, and through rulers who converted and brought their courts with them. Many Muslim-majority countries make 1 Muharram a public holiday. Saudi Arabia keeps the Hijri calendar as official but has paid its civil service by the Gregorian calendar since 2016.',
 land:'Usually quiet: sermons, prayer, and reflection rather than parties. For Shia Muslims, Muharram opens a period of mourning that ends on Ashura (10 Muharram), with large processions in cities such as Karbala, Iraq.',
 why:'No season at all. The date moves about 11 days earlier every year and passes through every season in roughly 33 years.',
 look:'The shading covers North Africa to Indonesia. Which parts of that region did Islam reach by trade rather than by conquest?',
 key:{type:'lunar',dif:['relocation','hierarchical','contagious'],note:'<b>Relocation:</b> the Hijra itself, and migrants and merchants who settled abroad. <b>Hierarchical:</b> conversion of rulers, such as the kings of Mali. <b>Contagious:</b> spread person to person along trade networks. Islam is a <b>universalizing</b> religion that seeks converts.',land:'Mosque sermons; Ashura processions and black banners in Shia communities.',why:'Purely lunar, with no link to seasons. Religious tradition, not agriculture, sets it.'}},
{id:'matariki',short:'Matariki',title:'Matariki (Māori New Year)',when:'Friday, June 25, 2027 (public holiday)',begins:'Te Mata Hou: the new year',type:'star',
 hearth:{name:'Raiatea, eastern Polynesia',at:[-151.43,-16.83]},
 drift:['06-25','07-14','07-06','06-21','07-11','07-02','06-24','07-07','06-29','07-18','07-10','06-25'],
 core:['NZ'],obs:['PF','CK'],
 routes:[['Aotearoa (New Zealand)',174.78,-41.29],['Hawaiʻi',-157.86,21.31],['Rapa Nui',-109.35,-27.11],['Rarotonga',-159.78,-21.23]],
 origins:'Matariki is the Māori name for the Pleiades star cluster. Its rising before dawn in midwinter, read alongside the maramataka (the Māori lunar calendar), marks the new year. Related Pleiades new years exist across Polynesia, such as Makaliʻi in Hawaiʻi and Matariʻi in Tahiti.',
 spread:'Polynesian voyagers carried this star knowledge across the Pacific and reached Aotearoa around 1250–1300 CE. Under colonization, many Māori practices were suppressed. A Māori-led revival grew from the 1990s, and in 2022 Matariki became New Zealand’s first public holiday to recognize te ao Māori. The law sets its dates through 2052, always on a Friday.',
 land:'Dawn gatherings to see the stars rise, remembering those who died during the year, shared meals, kite flying, and community festivals.',
 why:'Midwinter in the Southern Hemisphere: the harvest is stored and it’s time to plan the next planting.',
 look:'This new year falls in June. Why would a Southern Hemisphere new year fall in June and not in December?',
 key:{type:'star',dif:['relocation','hierarchical','contagious'],note:'<b>Relocation:</b> Polynesian voyaging carried it to Aotearoa. <b>Hierarchical:</b> the 2022 law made it national. <b>Contagious:</b> now spreading to non-Māori New Zealanders. It is a clear case of <b>cultural revival</b> and resistance to assimilation.',land:'Dawn star-viewing gatherings, kites, community feasts.',why:'Star-based: the Pleiades rising at midwinter, tied to the food-gathering cycle.'}},
{id:'enku',short:'Enkutatash',title:'Enkutatash (Ethiopian New Year)',when:'Sunday, September 12, 2027',begins:'Year 2020 (Ethiopian calendar)',type:'solar',
 hearth:{name:'Aksum, Ethiopia',at:[38.72,14.13]},
 drift:['09-12','09-11','09-11','09-11','09-12','09-11','09-11','09-11','09-12','09-11','09-11','09-11'],
 core:['ET','ER'],obs:['US'],
 routes:[['Aksum, from Alexandria (4th c.)',38.72,14.13,[29.92,31.20]],['Asmara',38.93,15.32],['Addis Ababa',38.74,9.03],['Washington, D.C.',-77.04,38.90]],
 origins:'The Ethiopian calendar has 12 months of 30 days plus a 13th month, Pagume, of 5 or 6 days. It comes from the Coptic calendar of Alexandria and counts years 7 to 8 behind the Gregorian. Enkutatash means “gift of jewels,” recalling the Queen of Sheba’s return home. The holiday moves to September 12 in the year before a Gregorian leap year, as in 2027.',
 spread:'It arrived with Christianity at the court of Aksum in the 4th century and spread through the Ethiopian Orthodox Church. Ethiopia avoided long-term colonization (Italy occupied it only from 1936 to 1941), so no colonial government ever replaced its calendar, and it is still the official one. The diaspora around Washington, D.C., celebrates it today.',
 land:'Yellow adey abeba flowers covering the highlands, girls going door to door singing, bonfires, and church services.',
 why:'The end of the long rainy season (kiremt), when the highlands turn green and gold.',
 look:'Compare this map with the January 1 map. Why would a country that was never fully colonized keep its own calendar?',
 key:{type:'solar',dif:['hierarchical','relocation'],note:'<b>Hierarchical:</b> it came with Christianity through the Aksumite king’s court, then spread through the church. <b>Relocation:</b> the diaspora in North America and Europe. Its survival shows how <b>colonialism</b> (or its absence) shapes cultural landscapes.',land:'Adey abeba flowers, singing children, church services at Entoto.',why:'End of the rainy season, near the September equinox.'}},
{id:'rosh',short:'Rosh Hashanah',title:'Rosh Hashanah (Jewish New Year)',when:'Sundown Friday, October 1 – nightfall Sunday, October 3, 2027',begins:'Year 5788',type:'lunisolar',
 hearth:{name:'Jerusalem',at:[35.23,31.78]},
 drift:['10-02','09-21','09-10','09-28','09-18','09-06','09-24','09-14','10-04','09-22','09-10','09-30'],
 core:['IL'],obs:['US','FR','CA','GB','AR','RU','AU','DE','BR','ZA','UA','HU','MX'],
 routes:[['Babylon (586 BCE)',44.42,32.54],['Rome',12.50,41.90],['Paris',2.35,48.86],['New York',-74.00,40.71],['Buenos Aires',-58.38,-34.60],['Melbourne',144.96,-37.81]],
 origins:'The Hebrew calendar is lunisolar. Its months follow the moon, but a 13th month is added seven times in every 19 years to keep the holidays in their seasons. Rosh Hashanah falls on 1 Tishrei. Tradition marks it as the anniversary of humanity’s creation and a day of judgment that opens the Ten Days of Awe, ending on Yom Kippur.',
 spread:'Judaism is an ethnic religion and does not seek converts, so its map was drawn mostly by relocation: exile to Babylon, Roman expulsions, the 1492 expulsion from Spain, and mass migration to the Americas in the 1800s and 1900s. The largest communities today are in Israel and the United States. It is a national holiday only in Israel.',
 land:'The blowing of the shofar (ram’s horn), apples dipped in honey, round challah bread, and tashlich prayers beside rivers.',
 why:'Early autumn, at the end of the harvest in the Levant.',
 look:'Compare this pattern with the Islamic New Year map. Why does one religion form a continuous region while the other forms scattered clusters?',
 key:{type:'lunisolar',dif:['relocation'],note:'<b>Relocation</b> almost entirely: the diaspora carried the calendar across the world. As an <b>ethnic</b> religion, Judaism did not spread by expansion the way universalizing religions like Islam did.',land:'Shofar, apples and honey, tashlich at rivers, synagogues.',why:'Autumn harvest season, kept in place by leap months.'}}
];
const LISTDATE={jan1:'Fri, Jan 1',lunar:'Sat, Feb 6',nowruz:'Sun, Mar 21',songkran:'Tue\u2013Thu, Apr 13\u201315',hijri:'Sun, Jun 6',matariki:'Fri, Jun 25',enku:'Sun, Sep 12',rosh:'Sundown Fri, Oct 1'};
const FROMNAME={lunar:'southern China (Guangdong and Fujian)',enku:'Alexandria, Egypt'};
const CORE='#d6336c',OBS='#f6b3c8';
const ERAS=[
 {label:'1582–1590s: Catholic Europe and Spanish and Portuguese empires',color:'#3b1f6e',iso:['ES','PT','IT','FR','PL','LT','AT','HU','CZ','SK','BE','LU','MX','GT','HN','SV','NI','CR','PA','CU','DO','CO','VE','EC','PE','BO','CL','AR','UY','PY','BR','PH']},
 {label:'1700–1753: Protestant Europe and the British Empire',color:'#6741a8',iso:['DE','DK','NO','NL','CH','GB','IE','SE','FI','IS','US','CA','AU','NZ']},
 {label:'1873–1896: modernizing states',color:'#9a72d6',iso:['JP','EG','KR','TH']},
 {label:'1912–1926: new republics and revolutions',color:'#c7a9ef',iso:['CN','RU','UA','BY','EE','LV','BG','RS','ME','MK','RO','GR','TR','AL']},
 {label:'Another calendar is still official',color:'#ff6b4a',iso:['IR','AF','ET','NP','SA']},
];
const ERA_OTHER={label:'Adopted under colonial rule or later',color:'#e8dff7'};
const TZNOTE={14:'Kiritimati, Kiribati: first to 2027',13:'Tonga, Samoa (New Zealand on summer time)',12:'Fiji, New Zealand standard time',10:'Eastern Australia (standard time)',9:'Tokyo, Seoul',8:'Beijing, Singapore, Perth',7:'Bangkok, Jakarta',5.5:'India',4.5:'Afghanistan',3.5:'Iran',3:'Moscow, Nairobi, Riyadh',2:'Cairo, Johannesburg',1:'Paris, Lagos',0:'London, Accra',[-3]:'Buenos Aires, São Paulo',[-5]:'New York, Lima',[-6]:'Chicago, Mexico City',[-8]:'Los Angeles, Vancouver',[-10]:'Honolulu',[-11]:'American Samoa',[-12]:'Baker Island (uninhabited): last to 2027'};

/* ---------- state ---------- */
const $=s=>document.querySelector(s);
let store={};try{store=JSON.parse(localStorage.getItem('wny2027')||'{}')}catch(e){store={}}
store.nb=store.nb||{};store.frq=store.frq||{};store.done=store.done||{};
const save=()=>{try{localStorage.setItem('wny2027',JSON.stringify(store))}catch(e){}};
let current=CASES[0];

/* ---------- sound ---------- */
let muted=store.muted===true,ac=null;
const sb=$('#soundBtn');
const setSoundBtn=()=>{sb.textContent=muted?'Sound off':'Sound on';sb.setAttribute('aria-pressed',String(!muted))};setSoundBtn();
sb.addEventListener('click',()=>{muted=!muted;store.muted=muted;save();setSoundBtn();if(!muted)chime([660,990])});
function ctx(){if(muted)return null;try{if(!ac)ac=new (window.AudioContext||window.webkitAudioContext)();if(ac.state==='suspended')ac.resume();return ac}catch(e){return null}}
function tone(f,t0,dur,vol,type){const c=ctx();if(!c)return;const o=c.createOscillator(),g=c.createGain();o.type=type||'sine';o.frequency.value=f;g.gain.setValueAtTime(0,c.currentTime+t0);g.gain.linearRampToValueAtTime(vol,c.currentTime+t0+.012);g.gain.exponentialRampToValueAtTime(.0001,c.currentTime+t0+dur);o.connect(g).connect(c.destination);o.start(c.currentTime+t0);o.stop(c.currentTime+t0+dur+.05)}
function chime(fs){fs.forEach((f,i)=>{tone(f,i*.09,1.4,.07);tone(f*2.01,i*.09,.6,.015)})}
function bell(){[[220,1],[548,.5],[1188,.25],[1690,.12]].forEach(([f,v])=>tone(f,0,2.6,.06*v))}
function tick(){tone(1320,0,.05,.035,'triangle')}
function whoosh(d){const c=ctx();if(!c)return;d=d||1.2;const n=c.sampleRate*d,b=c.createBuffer(1,n,c.sampleRate),a=b.getChannelData(0);for(let i=0;i<n;i++)a[i]=Math.random()*2-1;const s=c.createBufferSource();s.buffer=b;const f=c.createBiquadFilter();f.type='bandpass';f.Q.value=1.2;const t=c.currentTime;f.frequency.setValueAtTime(250,t);f.frequency.exponentialRampToValueAtTime(1800,t+d*.45);f.frequency.exponentialRampToValueAtTime(300,t+d);const g=c.createGain();g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(.09,t+d*.4);g.gain.linearRampToValueAtTime(0,t+d);s.connect(f).connect(g).connect(c.destination);s.start()}
function pop(){const c=ctx();if(!c)return;tone(900,0,.25,.04,'triangle');tone(1350,.05,.5,.025)}
const NOTES={jan1:[523,784],lunar:[587,880],nowruz:[659,988],songkran:[698,1047],hijri:[523,659],matariki:[784,1175],enku:[587,740],rosh:[494,740]};

/* ---------- launch: sky + counters ---------- */
(()=>{const s=$('#sky');let h='';const r=(a)=>{let x=Math.sin(a*99.1)*43758.5;return x-Math.floor(x)};
 for(let i=0;i<70;i++){h+=`<circle class="twinkle" cx="${(r(i)*1200).toFixed(0)}" cy="${(r(i+.5)*600).toFixed(0)}" r="${(r(i+.3)*1.6+.4).toFixed(1)}" fill="#fff" style="animation-delay:${(r(i+.7)*3).toFixed(2)}s"/>`}
 h+='<path d="M-50 560 Q600 120 1250 560" fill="none" stroke="#ffffff22" stroke-dasharray="4 8"/>';
 h+='<circle cx="600" cy="44" r="24" fill="#ffd9a8" opacity=".9"/><circle cx="611" cy="37" r="21" fill="#2f2350"/>';
 [[180,90],[196,104],[172,112],[205,88],[188,122],[214,116],[165,96]].forEach(([x,y])=>h+=`<circle cx="${x}" cy="${y}" r="2.6" fill="#cfe9ff"/>`);
 s.innerHTML=h})();
const CTRS=[
 {k:'Gregorian',n:'Most of the world, modern life',a:'2026',b:'2027',roll:true},
 {k:'Thai solar (Buddhist Era)',n:'Thailand, official since 1941',a:'2569',b:'2570',roll:true},
 {k:'Chinese lunisolar',n:'Changes February 6',a:'Horse',b:'Horse'},
 {k:'Solar Hijri',n:'Iran, Afghanistan · changes March 21',a:'1405',b:'1405'},
 {k:'Islamic (Hijri)',n:'Changes June 6',a:'1448',b:'1448'},
 {k:'Ethiopian',n:'Changes September 12',a:'2019',b:'2019'},
 {k:'Hebrew',n:'Changes at sundown October 1',a:'5787',b:'5787'}];
$('#counters').innerHTML=CTRS.map((c,i)=>`<div class="ctr" id="ctr${i}"><div><b>${c.k}</b><span class="n">${c.n}</span></div><div class="odo"><i>${c.a}</i><i>${c.b}</i></div></div>`).join('');
let struck=false;
$('#midnight').addEventListener('click',e=>{
 const btn=e.currentTarget;
 if(struck){CTRS.forEach((c,i)=>{const el=$('#ctr'+i);el.classList.remove('rolled');el.querySelector('.odo').classList.remove('flip')});struck=false;btn.textContent='Strike midnight';return}
 struck=true;btn.textContent='Reset to New Year’s Eve';bell();
 CTRS.forEach((c,i)=>{if(!c.roll)return;setTimeout(()=>{const el=$('#ctr'+i);el.querySelector('.odo').classList.add('flip');el.classList.add('rolled');burst(el);pop()},400+i*350)});
});
function burst(el){if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;const b=document.createElement('div');b.className='burst';const r=el.getBoundingClientRect(),p=$('#counters').getBoundingClientRect();b.style.left=(r.right-p.left-50)+'px';b.style.top=(r.top-p.top+r.height/2)+'px';
 b.innerHTML=Array.from({length:14},(_,i)=>`<i style="--a:${i*360/14}deg;--c:${['#ffd3c7','#ff6b4a','#cfe9ff','#ffe9a8'][i%4]}"></i>`).join('');$('#counters').appendChild(b);setTimeout(()=>b.remove(),1300)}

/* ---------- case list, reading, notebook ---------- */
$('#cases').innerHTML=CASES.map(c=>`<button class="case${store.done[c.id]?' done':''}" id="b-${c.id}" aria-pressed="false" data-id="${c.id}"><span class="dot"></span><span><b>${c.short}</b><span class="d">${LISTDATE[c.id]}</span></span><span class="ok">✓ notes</span></button>`).join('');
$('#calOpts').innerHTML=Object.entries(TYPES).map(([k,v])=>`<label><input type="radio" name="cal" value="${k}">${v}</label>`).join('');
$('#difOpts').innerHTML=Object.entries(DIFF).map(([k,v])=>`<label><input type="checkbox" name="dif" value="${k}">${v}</label>`).join('');
$('#cases').addEventListener('click',e=>{const b=e.target.closest('.case');if(b)selectCase(b.dataset.id,true)});
$('#nextBtn').addEventListener('click',()=>{const i=CASES.indexOf(current);selectCase(CASES[(i+1)%CASES.length].id,true);$('#investigate').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'})});

function renderReading(c){
 $('#reading').innerHTML=`<p class="when">${c.when} · ${c.begins}</p><h3>${c.title}</h3>
 <h4>Hearth and origins</h4><p>${c.origins}</p><h4>How it spread</h4><p>${c.spread}</p>
 <h4>On the landscape</h4><p>${c.land}</p><h4>Why then?</h4><p>${c.why}</p><p class="look">Look closer: ${c.look}</p>`;
}
function loadNotebook(c){
 $('#nbTitle').textContent=c.short;const n=store.nb[c.id]||{};
 document.querySelectorAll('input[name=cal]').forEach(r=>r.checked=r.value===n.cal);
 document.querySelectorAll('input[name=dif]').forEach(r=>r.checked=(n.dif||[]).includes(r.value));
 $('#nbLand').value=n.land||'';$('#nbWhy').value=n.why||'';
 const k=$('#key');k.classList.remove('show');k.innerHTML='';if(store.done[c.id])showKey(c,false);
}
function readNotebook(){const n={cal:(document.querySelector('input[name=cal]:checked')||{}).value||'',dif:[...document.querySelectorAll('input[name=dif]:checked')].map(x=>x.value),land:$('#nbLand').value,why:$('#nbWhy').value};store.nb[current.id]=n;save();return n}
$('#nb').addEventListener('input',readNotebook);$('#nb').addEventListener('change',readNotebook);
$('#compareBtn').addEventListener('click',()=>{readNotebook();store.done[current.id]=true;save();$('#b-'+current.id).classList.add('done');showKey(current,true)});
function showKey(c,sound){
 const n=store.nb[c.id]||{},k=c.key;
 const calMsg=!n.cal?'You didn’t choose a calendar type.':n.cal===k.type?'Your calendar type matches.':`You chose ${TYPES[n.cal]}; the reference says ${TYPES[k.type]}.`;
 const got=(n.dif||[]).filter(d=>k.dif.includes(d)).length;
 $('#key').innerHTML=`<p><b>Reference notes</b></p><p><span class="chip c-${k.type==='star'?'star':k.type}">${TYPES[k.type]}</span> <span class="match">${calMsg}</span></p>
 <p><b>Diffusion:</b> ${k.dif.map(d=>DIFF[d]).join(', ')}. <span class="small">(You marked ${got} of ${k.dif.length}.)</span><br>${k.note}</p>
 <p><b>Landscape:</b> ${k.land}</p><p><b>Why then:</b> ${k.why}</p><p class="small">Disagree? Good. Defend your answer with evidence from the map or the reading.</p>`;
 $('#key').classList.add('show');if(sound)chime([NOTES[c.id][0],NOTES[c.id][1],NOTES[c.id][0]*2]);
}
function renderLegend(c){
 if(c.choro){$('#legend').innerHTML=[...ERAS,ERA_OTHER].map(e=>`<span><i style="background:${e.color}"></i>${e.label}</span>`).join('')+'<span><i style="background:#1b1726;height:3px;border:0"></i>Documented spread</span>';return}
 $('#legend').innerHTML=`<span><i style="background:${CORE}"></i>Hearth region or national holiday</span><span><i style="background:${OBS}"></i>Observed by large communities</span><span><span style="width:14px;height:14px;border-radius:50%;background:var(--coral);display:inline-block;box-shadow:0 0 0 2px #fff"></span>Hearth: ${c.hearth.name}</span><span><i style="background:#1b1726;height:3px;border:0"></i>Documented spread</span>`;
}
function statusFor(iso){const c=current;
 if(c.choro){const e=ERAS.find(e=>e.iso.includes(iso));return e?e.label:ERA_OTHER.label}
 if(c.core.includes(iso))return'Hearth region or national holiday for '+c.short;if(c.obs.includes(iso))return c.short+' is observed by large communities here';return c.short+' is not widely observed here'}

/* ---------- map ---------- */
let map=null;
function selectCase(id,user){
 current=CASES.find(c=>c.id===id);
 document.querySelectorAll('.case').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.id===id)));
 renderReading(current);loadNotebook(current);renderLegend(current);
 $('#waveBtn').hidden=current.id!=='jan1';
 if(map)map.show(current,user);
 if(user){whoosh(1.4)}
}
function initMap(){
 if(window.__esriFail||typeof require!=='function'){$('#mapmsg').style.display='grid';return}
 require(['esri/Map','esri/views/MapView','esri/layers/FeatureLayer','esri/layers/GraphicsLayer','esri/Graphic','esri/geometry/Polyline','esri/geometry/Point','esri/core/reactiveUtils'],
 (EMap,MapView,FeatureLayer,GraphicsLayer,Graphic,Polyline,Point,reactiveUtils)=>{
  const SR={wkid:102100},R=6378137;
  const merc=(lon,lat)=>[lon*Math.PI/180*R,Math.log(Math.tan(Math.PI/4+lat*Math.PI/360))*R];
  function arc(a,b,n){const rad=Math.PI/180,v=([lo,la])=>[Math.cos(la*rad)*Math.cos(lo*rad),Math.cos(la*rad)*Math.sin(lo*rad),Math.sin(la*rad)];
   const p=v(a),q=v(b),d=Math.acos(Math.min(1,Math.max(-1,p[0]*q[0]+p[1]*q[1]+p[2]*q[2])));const out=[];let prev=null;
   for(let i=0;i<=n;i++){const t=i/n;let x,y,z;if(d<1e-6){[x,y,z]=p}else{const A=Math.sin((1-t)*d)/Math.sin(d),B=Math.sin(t*d)/Math.sin(d);x=A*p[0]+B*q[0];y=A*p[1]+B*q[1];z=A*p[2]+B*q[2]}
    let lon=Math.atan2(y,x)/rad;const lat=Math.atan2(z,Math.hypot(x,y))/rad;if(prev!==null){while(lon-prev>180)lon-=360;while(lon-prev<-180)lon+=360}prev=lon;out.push([lon,lat])}
   const shift=a[0]-out[0][0];return out.map(([lo,la])=>merc(lo+shift,la))}
  const fill=(c,a)=>({type:'simple-fill',color:c+(a||''),outline:{color:[255,255,255,.9],width:.5}});
  const countries=new FeatureLayer({url:'https://services.arcgis.com/P3ePLMYs2RVChkJx/arcgis/rest/services/World_Countries_(Generalized)/FeatureServer/0',outFields:['COUNTRY','ISO'],opacity:0,popupEnabled:false});
  const tz=new FeatureLayer({url:'https://services.arcgis.com/P3ePLMYs2RVChkJx/arcgis/rest/services/World_Time_Zones/FeatureServer/0',outFields:['ZONE'],visible:false,opacity:.9,popupEnabled:false});
  const lines=new GraphicsLayer(),pts=new GraphicsLayer();
  const m=new EMap({basemap:'gray-vector',layers:[countries,tz,lines,pts]});
  const view=new MapView({container:'viewDiv',map:m,center:[20,25],zoom:1,constraints:{minZoom:1,snapToZoom:false,rotationEnabled:false},popupEnabled:false});
  view.ui.move('zoom','top-right');
  view.when(()=>{},()=>{$('#mapmsg').style.display='grid'});
  countries.when(null,()=>{$('#mapmsg').style.display='grid'});
  let gen=0,hearthPt=null,fullPaths=[];
  const pulse=$('#pulse');
  const placePulse=()=>{if(!hearthPt){pulse.style.display='none';return}const s=view.toScreen(hearthPt);if(!s){pulse.style.display='none';return}pulse.style.display='block';pulse.style.left=s.x+'px';pulse.style.top=s.y+'px'};
  reactiveUtils.watch(()=>view.extent,placePulse);
  function fade(layer,to,ms){return new Promise(res=>{const from=layer.opacity,t0=performance.now();const step=t=>{const k=Math.min(1,(t-t0)/ms);layer.opacity=from+(to-from)*k;k<1?requestAnimationFrame(step):res()};requestAnimationFrame(step)})}
  function renderer(c){
   if(c.choro){const infos=[];ERAS.forEach(e=>e.iso.forEach(i=>infos.push({value:i,symbol:fill(e.color,'')})));return{type:'unique-value',field:'ISO',defaultSymbol:fill(ERA_OTHER.color,''),uniqueValueInfos:infos}}
   return{type:'unique-value',field:'ISO',defaultSymbol:{type:'simple-fill',color:[0,0,0,0],outline:{color:[255,255,255,0],width:0}},
    uniqueValueInfos:[...c.core.map(i=>({value:i,symbol:fill(CORE,'')})),...c.obs.map(i=>({value:i,symbol:fill(OBS,'')}))]}}
  async function show(c){
   const g=++gen;stopWave();closePop();lines.removeAll();pts.removeAll();
   hearthPt=new Point({longitude:c.hearth.at[0],latitude:c.hearth.at[1]});placePulse();
   pts.add(new Graphic({geometry:hearthPt,attributes:{kind:'hearth'},symbol:{type:'simple-marker',size:24,color:[255,107,74,.02],outline:{color:[255,107,74,.02],width:1}}}));
   fullPaths=c.routes.map(r=>{const from=r[3]||c.hearth.at;return{name:r[0],from:r[3]?(FROMNAME[c.id]||'another hearth'):c.hearth.name,to:[r[1],r[2]],path:arc(from,[r[1],r[2]],64)}});
   await fade(countries,0,220);if(g!==gen)return;
   countries.renderer=renderer(c);fade(countries,c.choro?0.8:0.85,700);
   const targets=fullPaths.map(p=>new Polyline({paths:[p.path],spatialReference:SR}));
   try{await view.goTo(targets.length?targets:hearthPt,{duration:1500,easing:'in-out-expo'}).catch(()=>{});await view.goTo({zoom:Math.max(1,view.zoom-.35)},{duration:300}).catch(()=>{})}catch(e){}
   if(g!==gen)return;
   const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
   const gs=fullPaths.map(p=>{const gr=new Graphic({geometry:new Polyline({paths:[p.path.slice(0,2)],spatialReference:SR}),symbol:{type:'simple-line',color:[27,23,38,.85],width:2.25,cap:'round'}});lines.add(gr);return gr});
   const dur=reduce?1:1300,t0=performance.now();
   await new Promise(res=>{const step=t=>{if(g!==gen)return res();gs.forEach((gr,i)=>{const k=Math.max(0,Math.min(1,(t-t0-i*110)/dur));const e=1-Math.pow(1-k,3);const n=Math.max(2,Math.round(e*fullPaths[i].path.length));gr.geometry=new Polyline({paths:[fullPaths[i].path.slice(0,n)],spatialReference:SR})});
    (t-t0)<dur+gs.length*110?requestAnimationFrame(step):res()};requestAnimationFrame(step)});
   if(g!==gen)return;
   fullPaths.forEach(p=>{const end=p.path[p.path.length-1];const pt=new Point({x:end[0],y:end[1],spatialReference:SR});
    const at={kind:'dest',name:p.name,from:p.from};
    pts.add(new Graphic({geometry:pt,attributes:at,symbol:{type:'simple-marker',size:9,color:'#1b1726',outline:{color:'#fff',width:1.5}}}));
    pts.add(new Graphic({geometry:pt,attributes:at,symbol:{type:'text',text:p.name,color:'#1b1726',haloColor:'#ffffff',haloSize:1.6,yoffset:10,font:{size:10.5,weight:'bold'}}}))});
   chime(NOTES[c.id]);
  }
  /* midnight wave over the Living Atlas time-zone layer */
  let waving=false,waveTimer=null;
  function tzRenderer(cur,zones){return{type:'unique-value',field:'ZONE',defaultSymbol:{type:'simple-fill',color:[0,0,0,0],outline:{color:[60,50,90,.25],width:.4}},
   uniqueValueInfos:zones.map(z=>({value:z,symbol:{type:'simple-fill',color:z===cur?[255,107,74,.75]:z>cur?[103,65,168,.42]:[0,0,0,0],outline:{color:[60,50,90,.3],width:.4}}}))}}
  function stopWave(){waving=false;clearTimeout(waveTimer);tz.visible=false;$('#ticker').style.display='none';$('#waveBtn').textContent='Play the midnight wave';if(current&&current.id==='jan1'&&countries.opacity<.5)countries.opacity=.8}
  async function wave(){
   if(waving){stopWave();return}waving=true;$('#waveBtn').textContent='Stop the wave';
   let zones=[14,13,12.75,12,11.5,11,10.5,10,9.5,9,8,7,6.5,6,5.75,5.5,5,4.5,4,3.5,3,2,1,0,-1,-2,-3,-3.5,-4,-4.5,-5,-6,-7,-8,-9,-9.5,-10,-11,-12];
   try{const r=await tz.queryFeatures({where:'1=1',outFields:['ZONE'],returnDistinctValues:true,returnGeometry:false});const z=r.features.map(f=>f.attributes.ZONE).filter(v=>v!=null);if(z.length>10)zones=z.sort((a,b)=>b-a)}catch(e){}
   closePop();countries.opacity=.18;tz.visible=true;view.goTo({center:[160,10],zoom:1},{duration:800}).catch(()=>{});
   const tk=$('#ticker');tk.style.display='block';let i=0;
   const step=()=>{if(!waving)return;if(i>=zones.length){bell();tk.innerHTML='<b>Every time zone has reached January 1, 2027.</b> It took 26 hours from first to last.';waving=false;$('#waveBtn').textContent='Play the midnight wave';return}
    const z=zones[i];tz.renderer=tzRenderer(z,zones);const sign=z>=0?'+':'−',a=Math.abs(z),hh=Math.floor(a),mm=Math.round((a-hh)*60);
    tk.innerHTML=`<b>Midnight at UTC${sign}${hh}${mm?':'+String(mm).padStart(2,'0'):''}</b>${TZNOTE[z]?' · '+TZNOTE[z]:''}<br><span style="font-size:13px;opacity:.8">Standard time zones; summer time shifts some places by an hour in January.</span>`;
    tick();i++;waveTimer=setTimeout(step,i===1?900:300)};
   setTimeout(step,700)}
  $('#waveBtn').addEventListener('click',wave);
  $('#resetBtn').addEventListener('click',()=>{const t=fullPaths.map(p=>new Polyline({paths:[p.path],spatialReference:SR}));view.goTo(t.length?t:{center:[20,25],zoom:1},{duration:900}).catch(()=>{});whoosh(.8)});
  /* custom pop-ups (replace the default ArcGIS popup) */
  const pop=$('#mpop'),popBody=$('#mpopBody');let popAt=null;
  function closePop(){pop.classList.remove('show');popAt=null}
  function placePop(){if(!popAt)return;const s=view.toScreen(popAt),box=$('.mapbox').getBoundingClientRect();if(!s||s.x<0||s.y<0||s.x>box.width||s.y>box.height){pop.style.visibility='hidden';return}pop.style.visibility='visible';
   const w=pop.offsetWidth,h=pop.offsetHeight;let left=Math.min(Math.max(12,s.x-w/2),box.width-w-12);const below=s.y-h-18<8;pop.classList.toggle('below',below);
   pop.style.left=left+'px';pop.style.top=(below?s.y+18:s.y-h-18)+'px';pop.style.setProperty('--ax',Math.min(w-16,Math.max(16,s.x-left))+'px')}
  function openPop(mp,kicker,color,title,body,q){popAt=mp;popBody.innerHTML=`<p class="k"><i style="background:${color}"></i>${kicker}</p><h4>${title}</h4><p>${body}</p>${q?`<p class="q">${q}</p>`:''}`;
   pop.classList.remove('show');void pop.offsetWidth;pop.classList.add('show');placePop();tick()}
  reactiveUtils.watch(()=>view.extent,placePop);
  $('#mpopX').addEventListener('click',closePop);
  document.addEventListener('keydown',e=>{if(e.key==='Escape')closePop()});
  const swatch=iso=>{const c=current;if(c.choro){const e=ERAS.find(e=>e.iso.includes(iso));return e?e.color:ERA_OTHER.color}return c.core.includes(iso)?CORE:c.obs.includes(iso)?OBS:'#ffffff'};
  view.on('click',async ev=>{
   let hit;try{hit=await view.hitTest(ev,{include:[pts,countries]})}catch(e){return}
   const r=hit.results.filter(x=>x.graphic);const pt=r.find(x=>x.graphic.layer===pts),ct=r.find(x=>x.graphic.layer===countries);const c=current;
   if(pt){const a=pt.graphic.attributes||{};
    if(a.kind==='hearth'){openPop(hearthPt,'Hearth','var(--coral)',c.hearth.name,`Where ${c.short} began. ${c.origins.split('. ')[0].replace(/<[^>]+>/g,'')}.`,'What made this place a starting point?');return}
    if(a.kind==='dest'){const [place,yr]=a.name.split(' · ');
     const body=c.id==='jan1'?`Adopted the Gregorian calendar in ${yr}, as the reform spread outward from ${a.from}.`:`${c.short} reached here from ${a.from}.`;
     openPop(pt.graphic.geometry,c.id==='jan1'?'Calendar adoption':'Spread destination','#1b1726',place,body,'');return}}
   if(ct){const at=ct.graphic.attributes||{};if(!at.ISO)return;openPop(ev.mapPoint,'Country',swatch(at.ISO),at.COUNTRY||at.ISO,(current.choro?'Gregorian adoption: ':'')+statusFor(at.ISO)+'.','');return}
   closePop()});
  let hov=0;view.on('pointer-move',ev=>{const now=performance.now();if(now-hov<90)return;hov=now;view.hitTest(ev,{include:[pts]}).then(h=>{$('#viewDiv').style.cursor=h.results.length?'pointer':'default'}).catch(()=>{})});
  map={show};
  view.when(()=>show(current,false));
 });
}

/* ---------- calendar wheel ---------- */
const W=440,C=220,RING={solar:168,star:138,lunisolar:108,lunar:78},COL={solar:'var(--solar)',star:'var(--star)',lunisolar:'var(--luni)',lunar:'var(--lunar)'};
const doy=(y,md)=>{const[m,d]=md.split('-').map(Number);const t=Date.UTC(y,m-1,d),s=Date.UTC(y,0,1),e=Date.UTC(y+1,0,1);return (t-s)/(e-s)};
const MONTHS=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
function buildWheel(){
 let h=`<circle cx="${C}" cy="${C}" r="196" fill="none" stroke="var(--line)" stroke-width="1.5"/>`;
 Object.entries(RING).forEach(([k,r])=>h+=`<circle cx="${C}" cy="${C}" r="${r}" fill="none" stroke="${COL[k]}" stroke-opacity=".28" stroke-width="10"/>`);
 MONTHS.forEach((m,i)=>{const a=doy(2027,String(i+1).padStart(2,'0')+'-01')*2*Math.PI-Math.PI/2,a2=a+Math.PI/12;
  h+=`<line x1="${C+Math.cos(a)*58}" y1="${C+Math.sin(a)*58}" x2="${C+Math.cos(a)*196}" y2="${C+Math.sin(a)*196}" stroke="var(--line)"/>`;
  h+=`<text x="${C+Math.cos(a2)*208}" y="${C+Math.sin(a2)*208+4}" text-anchor="middle" font-size="12" fill="var(--soft)">${m}</text>`});
 h+=`<g id="trailG"></g>`;
 h+=`<text x="${C}" y="${C-4}" text-anchor="middle" font-family="Fraunces,Georgia,serif" font-size="28" fill="var(--ink)" id="wYear">2027</text><text x="${C}" y="${C+16}" text-anchor="middle" font-size="11" fill="var(--soft)">Gregorian year</text>`;
 CASES.forEach(c=>{const r=RING[c.type];h+=`<g class="mk" id="mk-${c.id}" style="transform-origin:${C}px ${C}px"><circle cx="${C}" cy="${C-r}" r="9" fill="${COL[c.type]}" stroke="var(--bg)" stroke-width="2.5"/><g class="lbl" style="transform-origin:${C}px ${C-r}px;transition:transform 1s cubic-bezier(.3,.7,.2,1)"><text x="${C+13}" y="${C-r+4}" font-size="11.5" font-weight="700" fill="var(--ink)" stroke="var(--panel)" stroke-width="3" paint-order="stroke">${c.short}</text></g></g>`});
 $('#wheel').innerHTML=h;
}
function setYear(y,sound){
 const i=y-2027;$('#yrOut').textContent=y;$('#yrTh').textContent=y;$('#wYear').textContent=y;
 CASES.forEach(c=>{const deg=doy(y,c.drift[i])*360;const g=$('#mk-'+c.id);g.style.transform=`rotate(${deg}deg)`;g.querySelector('.lbl').style.transform=`rotate(${-deg}deg)`;const tx=g.querySelector('text'),right=Math.sin(deg*Math.PI/180)*RING[c.type]>95;tx.setAttribute('text-anchor',right?'end':'start');tx.setAttribute('x',right?C-13:C+13)});
 const fmt=(y,md)=>new Date(Date.UTC(y,+md.slice(0,2)-1,+md.slice(3))).toLocaleDateString('en-US',{timeZone:'UTC',weekday:'short',month:'short',day:'numeric'});
 const BEG={jan1:y+' CE',lunar:'Year of the '+['Goat','Monkey','Rooster','Dog','Pig','Rat','Ox','Tiger','Rabbit','Dragon','Snake','Horse'][i],nowruz:(1406+i)+' SH',songkran:'Traditional new year',hijri:(1449+i)+' AH',matariki:'Te Mata Hou',enku:(2020+i)+' EC',rosh:String(5788+i)};
 $('#dates tbody').innerHTML=[...CASES].sort((a,b)=>a.drift[i].localeCompare(b.drift[i])).map(c=>`<tr><td><b>${c.short}</b></td><td><span class="chip c-${c.type}">${TYPES[c.type]}</span></td><td class="num">${fmt(y,c.drift[i])}${c.id==='rosh'||c.id==='hijri'?'*':''}</td><td>${BEG[c.id]}</td></tr>`).join('');
 if(sound)tick();
}
function trails(on){$('#trailG').innerHTML=on?CASES.map(c=>c.drift.map((md,i)=>{const a=doy(2027+i,md)*2*Math.PI-Math.PI/2,r=RING[c.type];return `<circle cx="${(C+Math.cos(a)*r).toFixed(1)}" cy="${(C+Math.sin(a)*r).toFixed(1)}" r="3" fill="${COL[c.type]}" opacity="${.25+i*.05}"/>`}).join('')).join(''):'';if(on)chime([440,660])}
buildWheel();setYear(2027,false);
$('#yr').addEventListener('input',e=>setYear(+e.target.value,true));
$('#trails').addEventListener('change',e=>trails(e.target.checked));
$('#dates').insertAdjacentHTML('afterend','<p class="small" style="margin:6px 0 0">* Begins at sunset the evening before.</p>');

/* ---------- FRQ ---------- */
const FRQ=[
 ['A','Identify the type of calendar used to set the date of the Islamic New Year, and describe how its Gregorian date changes from 2027 to 2038.'],
 ['B','Explain why the Islamic New Year moves through all the seasons while Rosh Hashanah stays in early autumn.'],
 ['C','Describe one example of relocation diffusion of a new year celebration shown on the map.'],
 ['D','Explain how colonialism contributed to the global diffusion of January 1 as New Year’s Day.'],
 ['E','Explain one reason Ethiopia or Iran continues to use its own official calendar.'],
 ['F','Explain how making Matariki a national public holiday in 2022 illustrates cultural revival or resistance to assimilation.'],
 ['G','Explain one limitation of using country-level public holiday data to show where a new year celebration takes place.']];
$('#frq').innerHTML=FRQ.map(([k,q])=>`<div><label for="frq${k}">${k}. ${q}</label><textarea id="frq${k}" data-k="${k}"></textarea></div>`).join('');
FRQ.forEach(([k])=>{$('#frq'+k).value=store.frq[k]||''});$('#sName').value=store.name||'';
$('#frq').addEventListener('input',e=>{if(e.target.dataset.k){store.frq[e.target.dataset.k]=e.target.value;save()}});
$('#sName').addEventListener('input',e=>{store.name=e.target.value;save()});
function compile(){let t=`Where is the New Year? 2027: ${store.name||'(no name)'}\n\nFIELD NOTEBOOK\n`;
 CASES.forEach(c=>{const n=store.nb[c.id];if(!n)return;t+=`\n${c.short}\n  Calendar: ${TYPES[n.cal]||'-'}\n  Diffusion: ${(n.dif||[]).map(d=>DIFF[d]).join(', ')||'-'}\n  Landscape: ${n.land||'-'}\n  Why then: ${n.why||'-'}\n`});
 t+='\nFREE RESPONSE\n';FRQ.forEach(([k,q])=>t+=`\n${k}. ${q}\n${store.frq[k]||'-'}\n`);return t}
const toast=m=>{const el=$('#toast');el.textContent=m;el.style.display='block';clearTimeout(toast.t);toast.t=setTimeout(()=>el.style.display='none',2600)};
$('#copyBtn').addEventListener('click',async()=>{const t=compile();try{await navigator.clipboard.writeText(t);toast('Copied. Paste it into your assignment.');chime([660,880])}catch(e){const o=$('#copyOut');o.style.display='block';o.value=t;o.focus();o.select();toast('Select all and copy the text below.')}});
$('#printBtn').addEventListener('click',()=>{try{window.print()}catch(e){toast('Printing isn’t available here. Use Copy instead.')}});
const clearMsg=$('#clearBtn');let armed=false;
clearMsg.addEventListener('click',()=>{if(!armed){armed=true;clearMsg.textContent='Click again to erase everything';setTimeout(()=>{armed=false;clearMsg.textContent='Clear my work'},4000);return}
 store={nb:{},frq:{},done:{},muted};save();document.querySelectorAll('#frq textarea').forEach(t=>t.value='');$('#sName').value='';document.querySelectorAll('.case').forEach(b=>b.classList.remove('done'));loadNotebook(current);armed=false;clearMsg.textContent='Clear my work';toast('Your work was cleared.')});

/* ---------- start ---------- */
selectCase('jan1',false);
initMap();
}
