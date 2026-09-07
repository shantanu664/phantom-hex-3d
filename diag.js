const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox','--use-gl=swiftshader','--enable-webgl','--ignore-gpu-blocklist','--enable-unsafe-swiftshader']
  });
  const page = await browser.newPage();
  await page.setViewport({width:1280,height:800});
  const logs = [];
  page.on('console', m => logs.push(`[${m.type()}] ${m.text()}`));
  page.on('pageerror', e => logs.push(`[PAGEERROR] ${e.message}`));
  page.on('requestfailed', r => logs.push(`[REQFAIL] ${r.url()} :: ${r.failure()?.errorText}`));
  const url = process.argv[2] || 'https://phantom-hex-3d.pages.dev/';
  await page.goto(url, {waitUntil:'networkidle2', timeout:45000}).catch(e=>logs.push(`[GOTO] ${e.message}`));
  await new Promise(r=>setTimeout(r,3000));
  // inspect DOM state
  const state = await page.evaluate(() => {
    const canvas = document.querySelector('canvas');
    const vis = [...document.body.querySelectorAll('*')].filter(el=>{
      const s=getComputedStyle(el); return s.display!=='none' && s.visibility!=='hidden' && el.offsetWidth>0 && el.offsetHeight>0;
    }).length;
    return {
      title: document.title,
      hasTHREE: typeof window.THREE,
      hasCanvas: !!canvas,
      canvasSize: canvas?`${canvas.width}x${canvas.height}`:null,
      bodyText: (document.body.innerText||'').slice(0,200),
      visibleEls: vis,
      bg: getComputedStyle(document.body).backgroundColor
    };
  });
  console.log('=== DOM STATE ==='); console.log(JSON.stringify(state,null,2));
  console.log('=== CONSOLE / ERRORS ==='); console.log(logs.join('\n') || '(none)');
  await page.screenshot({path:'/tmp/shot.png'});
  await browser.close();
})();
