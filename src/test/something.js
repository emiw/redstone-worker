/* eslint-disable */
module.exports = function(num = 100) {
  let i = 0;
  while(i < num) {
    var lines = [];
    lines.push('Hi!');
    lines.push('This is the');
    lines.push('*' + i + '*');
    lines.push('Itteration.');
    lines.push('Have a good day!');
    var str = lines.reduce((str, line) => str + '\n' + line, '');
    if (str.length > 1000) {
      console.log('Long string alert!');
    }
    console.log(str);
    ++i;
  }
}

module.exports(72);
/* eslint-enable */
