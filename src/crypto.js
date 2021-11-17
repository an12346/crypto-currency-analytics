export default class Crypto {
  static getCurrency() {
    return new Promise(function(resolve,reject) {
      let request = new XMLHttpRequest();
      const url = `https://api.nomics.com/v1/currencies/ticker?key=38ead8263d5621b37b1d6a1ea5c7731d3964847e`;
      request.onload = function() {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(request.response);
        }
      };
      request.open("GET", url, true);
      request.send();
    });
  }
}