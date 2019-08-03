const fs = require('fs');

function split(rawText) {
  const tokenArray = rawText.split('\n');
  const lengthOfTokenArray = tokenArray.length;
  const newTokenArray = [];
  for (let counter = 0; counter < lengthOfTokenArray; counter += 1) {
    const currentArray = tokenArray[counter].split(' ');
    newTokenArray.push(...currentArray);
    newTokenArray.push('\n');
  }
  return newTokenArray;
}

function tokenizer() {
  return new Promise(resolve => {
    const input = fs.createReadStream(`../${process.argv[2]}.js`);
    let rawText = '';
    let tokenArray = [];
    input.on('data', chunk => {
      rawText += chunk;
    });

    input.on('error', error => {
      throw error;
    });

    return input.on('end', () => {
      tokenArray = split(rawText);
      resolve(tokenArray);
    });
  });
}
tokenizer();

module.exports.tokenizer = tokenizer;
