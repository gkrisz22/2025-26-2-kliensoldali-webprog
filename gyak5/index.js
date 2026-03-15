//const cowsay = require("cowsay");

import cowsay from 'cowsay';
import alma, { div as osztas, mul } from './math.js';

const message = cowsay.say({
    text: "Nem szeretem a pénteki órákat"
});

console.log(message);

// 2. feladat

console.log(alma(1, 2));
console.log(osztas(8, 2));