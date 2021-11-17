import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import Crypto from './crypto.js';

$(document).ready(function() {
  $('#list-currencies').click(function() {
    // const type = "currencies/ticker";
    let promise = Crypto.getCurrency();
    console.log(promise);
    promise.then(function(response) {
      const body = JSON.parse(response);
      console.log(body);
      for(let i=0; i<10; i++) {
        $('#currencies').append(`<li>${body[i].name}<span></span></li>`);
      }
      $('#price').click(function() {
        $("span").each(function(i) {
          let roundedPrice = Math.round(`${body[i].price}` * 100) / 100;          
          roundedPrice = roundedPrice.toLocaleString();
          this.append(` - Price: ` + roundedPrice);        
        });
      });
    }, function(error) {
      $('#errors').text(`There was an error processing your request: ${error}`);
    });
  });
});