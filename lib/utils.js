exports.isEmpt = val => !(val && val.length);

exports.firstLetterUpper = val => val ? val[0].toUpperCase() + val.substr(1) : ''; 