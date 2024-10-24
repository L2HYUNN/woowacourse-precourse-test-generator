import * as fs from 'fs';
import * as path from 'path';

export class System {
  createTestFile(testCode: string): void {
    const filePath = path.join(__dirname, '../../../dist/ApplicationTest.js');
    fs.appendFileSync(filePath, '\n', 'utf-8');
    fs.appendFileSync(filePath, testCode, 'utf-8');

    console.log(`Test file created successfully at: ${filePath}`);
  }
}
