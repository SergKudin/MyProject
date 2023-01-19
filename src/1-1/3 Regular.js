
let validator = {};

validator.validateEmail = function (email) {
    const regexpEmail = /[a-zA-Z0-9][a-zA-Z0-9\-\.\+]{1,19}@[\w\.\!\$\%\&\’\*\+\/\=\?\^\_\-]{2,15}\.[a-zA-Z]{1,5}/g;
    let checkString = email.match(regexpEmail);
    checkString = (checkString == null) ? '' : checkString[0];
    return checkString === email.toString();
};

console.log(validator.validateEmail(`fi@secondpart.end`));
console.log(validator.validateEmail(`first-part@.se=cond%p.art.end`));
console.log(validator.validateEmail(`first.part@se=cond%part.r`));
console.log(validator.validateEmail(`f@secondart.end,`));
console.log(validator.validateEmail(`first-part@.se=cond@part.end`));
console.log(validator.validateEmail(`-firstpart@.se=cond%.enddeded`));
console.log(validator.validateEmail(`firs_tpart@.se.en`));
console.log(validator.validateEmail(`firstpart@.se.enddeded`));









