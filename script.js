// random QR-style pattern generator
  function paintQR(el, n){
    let html='';
    for(let i=0;i<n*n;i++){ html += `<span style="opacity:${Math.random()>0.42?1:0}"></span>`; }
    el.innerHTML = html;
  }
  document.querySelectorAll('#qr, #wallet-qr').forEach(el=>paintQR(el,5));
  const scannerQR = document.getElementById('scanner-qr');
  scannerQR.style.display='grid';
  scannerQR.style.gridTemplateColumns='repeat(9,1fr)';
  scannerQR.style.gridTemplateRows='repeat(9,1fr)';
  scannerQR.style.padding='10px';
  scannerQR.style.gap='3px';
  function paintScannerQR(){
    let html='';
    for(let i=0;i<81;i++){ html += `<span style="background:${Math.random()>0.4?'#F6F4EC':'transparent'};border-radius:1px;"></span>`; }
    scannerQR.innerHTML = html;
  }
  paintScannerQR();
  setInterval(paintScannerQR, 2400);

  // badge tilt on mouse move (responds to user action)
  const stage = document.querySelector('.badge-stage');
  const badge = document.getElementById('badge');
  if(window.matchMedia('(hover: hover)').matches){
    stage.addEventListener('mousemove', (e)=>{
      const r = stage.getBoundingClientRect();
      const x = (e.clientX - r.left)/r.width - 0.5;
      const y = (e.clientY - r.top)/r.height - 0.5;
      badge.style.transform = `rotateY(${x*14}deg) rotateX(${-y*14}deg)`;
    });
    stage.addEventListener('mouseleave', ()=>{ badge.style.transform = 'rotateY(0) rotateX(0)'; });
  }

  // capability list reveal-in-sequence, triggered once when scrolled into view
  const capItems = document.querySelectorAll('#cap-list li');
  let capDone = false;
  const capObserver = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting && !capDone){
        capDone = true;
        capItems.forEach((li, i)=>{
          setTimeout(()=> li.classList.add('done'), i*130);
        });
      }
    });
  }, {threshold:0.4});
  capObserver.observe(document.getElementById('cap-list'));

  // mobile nav fallback: smooth scroll already via CSS scroll-behavior
