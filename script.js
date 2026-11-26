
const toggle=document.querySelector('.nav-toggle');
const links=document.querySelector('.nav-links');
if(toggle&&links){toggle.addEventListener('click',()=>{const open=links.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));toggle.textContent=open?'×':'☰';});}
const current=location.pathname.split('/').pop()||'index.html';
document.querySelectorAll('.nav-link').forEach(a=>{if(a.getAttribute('href')===current)a.classList.add('active');});
document.querySelectorAll('a[href$=".html"]').forEach(a=>{a.addEventListener('click',e=>{const href=a.getAttribute('href');if(href===current)return;e.preventDefault();document.body.classList.add('page-leave');setTimeout(()=>location.href=href,140);});});
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

const questions=[
{q:'Apa peran utama otak dalam sistem saraf?',a:['Menghubungkan tulang satu dengan lainnya','Mengolah informasi dan mengoordinasikan aktivitas tubuh','Menghasilkan gerakan melalui kontraksi','Membentuk sel-sel darah'],c:1,e:'Otak mengolah informasi dan mengoordinasikan berbagai aktivitas tubuh.'},
{q:'Bagian sistem saraf yang menjadi jalur penghantar impuls sekaligus pusat refleks tertentu adalah ...',a:['Saraf tepi','Otot rangka','Sumsum tulang belakang','Sendi'],c:2,e:'Sumsum tulang belakang menghantarkan impuls dan memproses beberapa gerak refleks.'},
{q:'Struktur yang menghubungkan tulang dengan tulang dan memungkinkan gerakan disebut ...',a:['Otot','Reseptor','Saraf','Sendi'],c:3,e:'Sendi merupakan tempat bertemunya dua tulang atau lebih.'},
{q:'Otot dapat menggerakkan tulang karena otot mampu ...',a:['Berkontraksi dan relaksasi','Mengolah rangsangan','Menghasilkan impuls saraf','Menyambungkan tulang'],c:0,e:'Otot berkontraksi dan relaksasi untuk menghasilkan tarikan pada tulang.'},
{q:'Saat tangan spontan ditarik setelah menyentuh benda panas, respons tersebut disebut ...',a:['Gerak sadar','Gerak refleks','Gerak pasif','Gerak sendi'],c:1,e:'Menarik tangan dari benda panas adalah contoh gerak refleks yang cepat dan otomatis.'}
];
const $=id=>document.getElementById(id);
if($('quizCard')){
 let index=0,score=0,locked=false;
 function render(){locked=false;const item=questions[index];$('counter').textContent=`SOAL ${index+1} DARI ${questions.length}`;$('score').textContent=`SKOR ${score}`;$('bar').style.width=`${index/questions.length*100}%`;$('question').textContent=item.q;$('feedback').textContent='Pilih satu jawaban yang paling tepat.';$('next').disabled=true;$('next').textContent=index===questions.length-1?'Lihat hasil →':'Selanjutnya →';$('answers').innerHTML='';item.a.forEach((answer,i)=>{const b=document.createElement('button');b.className='answer';b.textContent=String.fromCharCode(65+i)+'. '+answer;b.addEventListener('click',()=>choose(i));$('answers').appendChild(b);});}
 function choose(i){if(locked)return;locked=true;const item=questions[index];[...$('answers').children].forEach((b,n)=>{b.disabled=true;if(n===item.c)b.classList.add('correct');if(n===i&&i!==item.c)b.classList.add('wrong');});if(i===item.c){score++;$('feedback').textContent='Benar! '+item.e;}else{$('feedback').textContent='Belum tepat. '+item.e;}$('score').textContent=`SKOR ${score}`;$('next').disabled=false;}
 $('next').addEventListener('click',()=>{if(!locked)return;if(index<questions.length-1){index++;render();}else{$('quizCard').hidden=true;$('result').hidden=false;$('bar').style.width='100%';$('resultTitle').textContent=score>=4?'Kerja bagus!':'Tetap semangat!';$('resultText').textContent=`Kamu menjawab ${score} dari ${questions.length} pertanyaan dengan benar. `+(score===5?'Semua jawaban benar. Mantap!':'Pelajari lagi bagian yang belum kamu kuasai, lalu coba ulangi kuisnya.');}});
 $('restart').addEventListener('click',()=>{index=0;score=0;$('result').hidden=true;$('quizCard').hidden=false;render();});render();
}
