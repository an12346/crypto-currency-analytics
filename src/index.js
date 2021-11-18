import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import Crypto from './crypto.js';

$(document).ready(function() {

  let promise = Crypto.getCurrency();

  $('#list-currencies').click(function() {
    promise.then(function(response) {
      const body = JSON.parse(response);
      for(let i=0; i<body.length; i++) {
        $('#currencies').append(`<li>${body[i].name}<span></span></li>`);
      }
      $('#price').click(function() {
        $("span").each(function(i) {
          let roundedPrice = Math.round(`${body[i].price}` * 100) / 100;          
          roundedPrice = roundedPrice.toLocaleString();
          this.append(` - Price: $` + roundedPrice + ` USD`);        
        });
      });
    }, function(error) {
      $('#errors').text(`There was an error processing your request: ${error}`);
    });
  });
  
  $('#exchange').click(function() {
    promise.then(function(response) {
      const body2 = JSON.parse(response);
      const input = $('#input').val();
      const inputCurrency = $('#inputCurrency').val();
      const outputCurrency = $('#outputCurrency').val();
      for(let i=0; i<body2.length; i++) {
        if(inputCurrency === `${body2[i].name}`) {
          const inputPrice = `${body2[i].price}`;
          for(let i=0; i<body2.length; i++) {
            if(outputCurrency === `${body2[i].name}`) {
              const outputPrice = `${body2[i].price}`;
              const output = (inputPrice / outputPrice) * input;
              $("#showExchange").append(output);
              console.log(output);
            }
          }
        }
      }
    });
  });
});