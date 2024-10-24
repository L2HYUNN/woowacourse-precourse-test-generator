export interface ICrawler {
  setURLs(URLS: string[]): void;
  getTestCode(url: string): Promise<string | null>;
  crawl(): Promise<string[]>;
}
