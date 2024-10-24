import { Extractor } from './extractor/extractor';
import { Crawler } from './crawler/crawler';
import { URLS } from './crawler/urls';
import { System } from './system/system';

class App {
  async run() {
    const crawler = new Crawler();
    const extractor = new Extractor();
    const system = new System();

    crawler.setURLs(Object.values(URLS));

    const testcodes = await crawler.crawl();
    const extractedTestCodes = testcodes.map((testCode) => extractor.extractDescirbeFromHTML(testCode));
    system.createTestFile(extractedTestCodes.join('\n'), './dist/javascript-calculator/ApplicationTest.js');
  }
}

const app = new App();
(async () => {
  app.run();
})();
