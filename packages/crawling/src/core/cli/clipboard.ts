import { System } from '../system/system';

class App {
  async run() {
    const system = new System();
    system.clipboardCopy('./dist/javascript-calculator/ApplicationTest.js');
  }
}

const app = new App();
(async () => {
  app.run();
})();
