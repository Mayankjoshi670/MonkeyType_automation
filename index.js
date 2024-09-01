const puppeteer = require("puppeteer");
(async ()=>{
  const url = "https://monkeytype.com/";
  const browser = await puppeteer.launch({
    headless: false,
    args: [
        '--disable-features=IsolateOrigins,site-per-process', 
        '--disable-site-isolation-trials',
        '--disable-web-security',
        '--disable-features=SameSiteByDefaultCookies,CookiesWithoutSameSiteMustBeSecure',
    ],
  });
  await puppeteer.launch({defaultViewport: null});
  const newPage = await browser.newPage();
  await newPage.goto(url, { waitUntil: "networkidle0" });
 
 
  const cookiePopup = await newPage.$("#cookiePopup");
  if (cookiePopup) {
    await newPage.click("#cookiePopup .acceptAll");
  }
  
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const words = await newPage.$$(".word");
  for (let i = 0; i < words.length; i++) {
    const letters = await words[i].$$("letter");
    for (let j = 0; j < letters.length; j++) {
      await newPage.keyboard.press(
        await letters[j].evaluate((node) => node.innerText)
      );
      await delay(25); 
    }
    await newPage.keyboard.press("Space");
    await delay(25);  
  }
})() ; 