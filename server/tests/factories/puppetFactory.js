const puppeteer = require('puppeteer');
const tokenFactory = require('../factories/tokenFactory');
const userFactory = require('../factories/userFactory');

class PuppetFactory {
  static async build() {
    const browser = await puppeteer.launch({
      headless: false,
      args: ['--no-sandbox']
    });

    const page = await browser.newPage();
    const App = new PuppetFactory(page);

    return new Proxy(App, {
      get: function(target, property) {
        return App[property] || browser[property] || page[property];
      }
    });
  }

  constructor(page) {
    this.page = page;
  }

  async login() {
    const user = await userFactory();
    const token = tokenFactory(user);

    await this.page.setExtraHTTPHeaders(`Bearer ${token}`);
    await this.page.goto('http://localhost:3000/');
    await this.page.waitFor('img[alt="Rozalado Services"]');
  }

  async contents(selector) {
    return this.page.$eval(selector, element => element.innerHTML);
  }

  get(path) {
    return this.page.evaluate(p => {
      return fetch(p, {
        method: 'GET',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => res.json());
    }, path);
  }

  post(path, body) {
    return this.page.evaluate(
      (p, b) => {
        return fetch(p, {
          method: 'POST',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(b)
        }).then(res => res.json());
      },
      path,
      body
    );
  }

  put(path, body) {
    return this.page.evaluate(
      (p, b) => {
        return fetch(p, {
          method: 'PUT',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(b)
        }).then(res => res.json());
      },
      path,
      body
    );
  }

  delete(path, body) {
    return this.page.evaluate(
      (p, b) => {
        return fetch(p, {
          method: 'DELETE',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(b)
        }).then(res => res.json());
      },
      path,
      body
    );
  }

  execute(actions) {
    return Promise.all(actions.map(({ method, path, data }) => this[method](path, data)));
  }
}

module.exports = PuppetFactory;
