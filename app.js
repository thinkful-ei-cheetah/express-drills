'use strict';

const express = require('express');
const app = express();
const morgan = require('morgan');

app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send('Hello Express!');
});

app.get('/sum', (req, res) => {
  if (req.query.a && req.query.b) {
    let a = Number(req.query.a);
    let b = Number(req.query.b);
    res.status(200).send(`The sum of ${a} and ${b} is ${a+b}`);
  } else {
    res.status(400).send('incorrect query params');
  }
});

app.get('/cipher', (req, res) => {
  if (req.query.text && req.query.shift) {
    let text = req.query.text.toUpperCase();
    let shift = Number(req.query.shift);

    const encrypted = text.split('').map(letter => {
      let charCode = letter.charCodeAt(0);
      if (charCode+shift > 90) {
        let diff = (charCode+shift) - 90;
        return String.fromCharCode((64+diff)); 
      } else {
        return String.fromCharCode(charCode+shift);
      }
    }).join('');
    res.status(200).send(`${text} encrypted is ${encrypted}`);
  } else {
    res.status(400).send('incorrect query params');
  }
});

app.get('/lotto', (req,res) => {
  if (req.query.numbers.length === 6) {
    let numbers = req.query.numbers.map(num => Number(num));
    const lotto = [...Array(6)].map(x => Math.ceil(Math.random()*20));
    const dupLotto = [...lotto];

    let count = 0;
    let msg;
    numbers.forEach(num => {
      const index = dupLotto.findIndex(lottoNum => lottoNum === num);
      if (index !== -1) {
        count++;
        dupLotto.splice(index, 1);
      }
    });

    if (count < 4) {
      msg = 'You win nothing';
    } else if (count === 4) {
      msg = 'You win a free ticket!';
    } else if (count === 5) {
      msg = 'You win $100!';
    } else {
      msg = 'Holy banana boats, you won 1M dollars!';
    }

    res.status(200).send(`
      Your Numbers: ${numbers}
      Lotto Numbers: ${lotto}
      Result: You had ${count} matches - ${msg}
      `);
  } else {
    res.status(400).send(`expected 6 numbers, got ${req.query.numbers.length}`);
  }
});

app.listen(8000, () => {
  console.log('Express server is listening on port 8000!');
});

