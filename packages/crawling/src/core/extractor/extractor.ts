import { IExtractor } from './extractor.interface';

export class Extractor implements IExtractor {
  private describeRegex = /describe\(.*?[^]+/g;

  extractDescirbeFromHTML(html: string) {
    const match = html.match(this.describeRegex);

    return match ? match[0] : '';
  }
}
