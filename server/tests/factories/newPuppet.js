const puppeteer = require('puppeteer');
const sessionFactory = require('../factories/sessionFactory');
const userFactory = require('../factories/userFactory');

class Puppeteer {
  static async build() {
    const browser = await puppeteer.launch({
      headless: false,
      args: ['--no-sandbox']
    });

    const page = await browser.newPage();
    const App = new Puppeteer(page);

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
    const { session, signature } = sessionFactory(user);

    await this.page.setCookie({ name: 'session', value: session });
    await this.page.setCookie({ name: 'session.sig', value: signature });
    await this.page.goto('http://localhost:3000/blogs');
    await this.page.waitFor('a[href="/auth/logout"]');
  }

  async contents(selector) {
    return this.page.$eval(selector, element => element.innerHTML);
  }

  request(method, route, data) {
    const credentials = 'same-origin';
    const headers = { 'Content-Type': 'application/json' };

    if (data) {
      return this.page.evaluate(
        (method, path, credentials, headers, body) => fetch(path, { method, credentials, headers, body }).then(res => res.json()),
        method,
        route,
        credentials,
        headers,
        data
      );
    } else {
      return this.page.evaluate(
        (method, path, credentials, headers) => fetch(path, { method, credentials, headers }).then(res => res.json()),
        method,
        route,
        credentials,
        headers
      );
    }
  }

  execute(actions) {
    return Promise.all(actions.map(({ method, route, data }) => this.request(method, route, JSON.stringify(data))));
  }
}

module.exports = Puppeteer;
