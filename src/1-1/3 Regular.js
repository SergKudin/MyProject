
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

validator.validatePhone = function (phone) {
    const regexpPhone = /^(-* *)?(\+)?([- (]?\d[- )]?){10,12}/g;
    let checkString = phone.match(regexpPhone);
    checkString = (checkString == null) ? '' : checkString[0];
    return (checkString === phone.toString()) && (phone.length < 25);
}

console.log(`-----------`);
console.log(validator.validatePhone(`+38 (099) 567 8901`));
console.log(validator.validatePhone(`+38 099 5 6 7 8 9  01`));
console.log(validator.validatePhone(`(09-9) 567-890-1`));
console.log(validator.validatePhone(`--  (099) 567 890-1`));
console.log(validator.validatePhone(`+38 (099) 567 8901 0`));
console.log(validator.validatePhone(`+38 099 a0000000`));
console.log(validator.validatePhone(`+38 (0989) 567 8901`));
console.log(validator.validatePhone(`+48 (0989) 567 8901`));
console.log(validator.validatePhone(`+38 (0 9 9) 5 6 7 8 9 0 1`));

validator.validatePassword = function (pass) {
    const regexpPass = /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z_]{8,}/g;
    let checkString = pass.match(regexpPass);
    checkString = (checkString == null) ? '' : checkString[0];
    return checkString === pass.toString();
}

console.log(`-----------`);
console.log(validator.validatePassword(`C00l_Pass`));
console.log(validator.validatePassword(`SupperPas1`));
console.log(validator.validatePassword(`Cool_pass`));
console.log(validator.validatePassword(`C00l`));





