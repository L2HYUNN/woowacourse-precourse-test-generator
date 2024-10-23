import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  // Navigate to the PR test file URL
  const url =
    'https://github.com/woowacourse-precourse/javascript-calculator-7/blob/e2f7c5b49146d0aef63dad00f3b4dc211e8d838f/__tests__/ApplicationTest.js#L11';
  await page.goto(url, { waitUntil: 'networkidle0' });

  await page.waitForSelector('#read-only-cursor-text-area');
  // Extract the test code content
  const testCode = await page.evaluate(() => {
    const codeElement = document.querySelector('#read-only-cursor-text-area'); // Target the code block container
    console.log('codeElement:', codeElement);
    return codeElement ? (codeElement as HTMLElement).innerHTML : 'Code not found';
  });

  console.log('Extracted Test Code:');
  console.log(testCode);

  await browser.close();
})();
