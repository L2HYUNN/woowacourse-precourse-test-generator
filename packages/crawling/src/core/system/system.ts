import * as fs from 'fs';
import * as path from 'path';
import { ISystem } from './system.interface';
import clipboard from 'clipboardy';

export class System implements ISystem {
  createTestFile(testCode: string, testFilePath: string): void {
    const rootPath = process.cwd();
    const filePath = path.join(rootPath, testFilePath);

    if (fs.existsSync(filePath)) {
      fs.appendFileSync(filePath, testCode, 'utf-8');
    }

    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, testCode, 'utf-8');
    }

    console.log(`Test file created successfully at: ${filePath}`);
  }

  clipboardCopy(filePath: string): void {
    if (!fs.existsSync(filePath)) {
      console.log('파일이 존재하지 않습니다.');
    }

    const fileContent = fs.readFileSync(filePath, 'utf8');
    clipboard.writeSync(fileContent);
  }
}
