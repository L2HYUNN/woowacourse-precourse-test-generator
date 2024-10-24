import puppeteer, { Browser, Page } from 'puppeteer';
import { ICrawler } from './crawler.interface';

export class Crawler implements ICrawler {
  private browser!: Browser;
  private page!: Page;
  private URLS: string[] = [];
  private testCodes: string[] = [];

  private async createBrowser() {
    this.browser = await puppeteer.launch({ headless: true });
  }

  private async createPage() {
    this.page = await this.browser.newPage();
  }

  setURLs(URLS: string[]) {
    this.URLS = URLS;
  }

  async getTestCode(url: string) {
    await this.createBrowser();
    await this.createPage();

    await this.page.goto(url, { waitUntil: 'networkidle0' });

    await this.page.waitForSelector('#read-only-cursor-text-area');

    const testCode = await this.page.evaluate(() => {
      const codeElement = document.querySelector('#read-only-cursor-text-area');

      return codeElement ? (codeElement as HTMLElement).textContent : 'Code not found';
    });

    return testCode;
  }

  async crawl() {
    for (const url of this.URLS) {
      const testCode = await this.getTestCode(url);
      this.testCodes.push(testCode || '');
    }

    return this.testCodes;
  }
}
