/* eslint-disable no-continue */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
const fs = require('fs');

function isSkip(tokenCharacter) {
  return tokenCharacter === ' ' || tokenCharacter === '\n';
}

function skipWhiteCharacterAndNewLine(counter, rawText, lengthOfRawText) {
  let localCounter = counter;
  console.log('         totalLength:', lengthOfRawText);
  console.log('         skipwithWhiteCharacter:');
  console.log('         entryCharacter=', rawText[counter]);
  console.log('         entryCounter=', counter);
  while (localCounter < lengthOfRawText && isSkip(rawText[localCounter])) {
    localCounter += 1;
  }
  console.log('           exitCharacter =', rawText[localCounter]);
  console.log('           exitCounter =', localCounter);
  return localCounter;
}

function throwError() {
  throw new Error(' invalid jsx syntax ');
}


function solveExpression(counter, rawText, lengthOfRawText) {
  let numberOfOpenCurlyBraces = 1;
  let localRawText = '{';
  let localCounter = counter;
  console.log('          solveExpression:');
  console.log('          counter=', counter);
  console.log('          rawText=', rawText);
  console.log('          lenthofRawText', lengthOfRawText);
  while (localCounter < lengthOfRawText && numberOfOpenCurlyBraces) {
    if (rawText[localCounter] === '{') numberOfOpenCurlyBraces += 1;
    else if (rawText[localCounter] === '}') numberOfOpenCurlyBraces -= 1;
    localRawText += rawText[localCounter];
    localCounter += 1;
  }
  return {
    counter: localCounter,
    text: localRawText,
  };
}

function isCharacterToBeAddedNow(textCharacter) {
  return (textCharacter !== '>' && textCharacter !== '=' && textCharacter !== '{');
}

function solveDomCase(rawText, lengthOfRawText, responseObject) {
  console.log('---------begin');
  let { counter } = responseObject;
  const { prevText } = responseObject;
  if (counter > lengthOfRawText) {
    if (prevText !== '') responseObject.tokenArray.push(prevText);
    responseObject.prevText = '';
    return responseObject;
  }
  if (rawText[counter] === '>') {
    if (prevText !== '' && prevText !== '/') {
      responseObject.tokenArray.push(prevText);
      responseObject.prevText = '';
    }
    if (prevText === '/') {
      responseObject.tokenArray.push('/>');
    } else {
      responseObject.tokenArray.push('>');
    }
    responseObject.counter = counter + 1;
    return responseObject;
  }
  if (rawText[counter] === '{') {
    const response = solveExpression(counter + 1, rawText, lengthOfRawText);
    if (prevText !== '') {
      responseObject.tokenArray.push(prevText);
      responseObject.prevText = '';
    }
    if (response.text !== '') {
      responseObject.tokenArray.push(response.text);
    }
    responseObject.counter = response.counter;
    return solveDomCase(rawText, lengthOfRawText, responseObject);
  }
  if (rawText[counter] === '=') {
    if (prevText !== '') {
      responseObject.tokenArray.push(prevText);
      responseObject.prevText = '';
    }
    responseObject.tokenArray.push('=');
    responseObject.counter = skipWhiteCharacterAndNewLine(counter + 1,
      rawText, lengthOfRawText);
    return solveDomCase(rawText, lengthOfRawText, responseObject);
  }

  if ((rawText[counter] === ' ' || rawText === '\n')) {
    console.log('      emptyCase:');
    if (prevText !== '') {
      responseObject.tokenArray.push(prevText);
      responseObject.prevText = '';
    }
    counter = skipWhiteCharacterAndNewLine(counter + 1, rawText, lengthOfRawText);
    responseObject.counter = counter;
    return solveDomCase(rawText, lengthOfRawText, responseObject);
  }
  console.log('         counter=', counter);
  console.log('         prevText=', prevText);
  const localCounter = skipWhiteCharacterAndNewLine(counter, rawText, lengthOfRawText);
  console.log('         localCounter=', prevText, 'character=', rawText[localCounter]);
  console.log('         character to be added', isCharacterToBeAddedNow(rawText[localCounter]));
  if (localCounter < lengthOfRawText && isCharacterToBeAddedNow(rawText[localCounter])) {
    responseObject.prevText += rawText[localCounter];
    responseObject.counter = localCounter + 1;
  }
  return solveDomCase(rawText, lengthOfRawText, responseObject);
}

function tokenizeTextElement(rawText, responseObject) {
  let { counter, prevText } = responseObject;
  const lengthOfRawText = rawText.length;
  let isWord = false;
  while (counter < lengthOfRawText && rawText[counter] !== '<') {
    if (rawText[counter] === '{') {
      if (prevText !== '') {
        responseObject.tokenArray.push(prevText);
        prevText = '';
      }
      const response = solveExpression(counter + 1, rawText, lengthOfRawText);
      counter = response.counter;
      responseObject.tokenArray.push(response.text);
      continue;
    }
    if (isWord === false) {
      counter = skipWhiteCharacterAndNewLine(counter, rawText, lengthOfRawText);
      isWord = true;
    } else if (rawText[counter] === '\n') {
      counter += 1;
      isWord = false;
      if (prevText !== '') {
        responseObject.tokenArray.push(prevText);
        prevText = '';
      }
    } else {
      prevText += rawText[counter];
      counter += 1;
    }
  }
  if (prevText !== '') responseObject.tokenArray.push(prevText);
  responseObject.counter = counter;
  return responseObject;
}

function tokenizeJSX(rawText, responseObject) {
  const lengthOfRawText = rawText.length;
  console.log(' responseObject of begin=', responseObject);
  const { counter } = responseObject;
  const localCounter = skipWhiteCharacterAndNewLine(counter, rawText, lengthOfRawText);
  if (rawText[localCounter] === ')') {
    responseObject.counter = localCounter + 1;
    responseObject.tokenArray.push(')');
    console.log('---------------------------------------------------------------------');
    return responseObject;
  }
  if (localCounter >= lengthOfRawText) {
    throwError('You forgot to close the JSX');
    console.log('---------------------------------------------------------------------');
    return responseObject;
  }
  if (rawText[localCounter] === '<') {
    responseObject.counter = localCounter + 1;
    responseObject.tokenArray.push('<');
    responseObject.prevText = '';
    console.log('      solveDomCase function');
    const newResponseObject = solveDomCase(rawText, lengthOfRawText, responseObject);
    console.log('        response tokenizeJSX=', newResponseObject);
    console.log('      end solveDomCase');
    // return responseObject;
    return tokenizeJSX(rawText, newResponseObject);
  }
  console.log('-------text---secotion');
  responseObject.counter = localCounter;
  responseObject.prevText = '';
  console.log('--------tokenizeTextElement');
  const newResponseObject = tokenizeTextElement(rawText, responseObject);
  console.log('-------response Received=:', newResponseObject);
  console.log('--------text Length=', rawText.length);
  console.log('--------endtokenizeTextElement');
  return tokenizeJSX(rawText, newResponseObject);
}


function customSplit(rawText) {
  const lengthOfRawText = rawText.length;
  let jsx = '';
  let prevText = '';
  const tokenArray = [];
  for (let counter = 0; counter < lengthOfRawText; counter += 1) {
    jsx += rawText[counter];
    prevText += rawText[counter];
    if (jsx === 'JSX') {
      tokenArray.push(...prevText.substring(0, prevText.length - 3).split(' '));
      counter = skipWhiteCharacterAndNewLine(counter + 1, rawText, lengthOfRawText);
      if (rawText[counter] !== '(') throwError();
      tokenArray.push('JSX(');
      prevText = '';
      console.log('   rawTextCounter=', rawText[counter]);
      const responseObject = {
        counter: counter + 1,
        prevText,
        tokenArray: [],
      };
      console.log('  tokenizeJSX');
      const response = tokenizeJSX(rawText, responseObject);
      console.log('     response received=', response);
      console.log('  end of tokenizeJSX');
      tokenArray.push(...response.tokenArray);
      counter = response.counter;
    }
    if (jsx.length >= 3) jsx = jsx.substring(1, 3);
  }
  if (prevText !== '') tokenArray.push(...prevText.split(' '));
  return tokenArray;
}

// function split(rawText) {
//   const tokenArray = rawText.split('\n');
//   const lengthOfTokenArray = tokenArray.length;
//   const newTokenArray = [];
//   for (let counter = 0; counter < lengthOfTokenArray; counter += 1) {
//     const currentArray = tokenArray[counter].split(' ');
//     newTokenArray.push(...currentArray);
//     newTokenArray.push('\n');
//   }
//   return newTokenArray;
// }

function tokenizer() {
  return new Promise((resolve) => {
    const input = fs.createReadStream(`../${process.argv[2]}.js`);
    let rawText = '';
    let tokenArray = [];
    input.on('data', (chunk) => {
      rawText += chunk;
    });

    input.on('error', (error) => {
      throw error;
    });

    return input.on('end', () => {
      console.log(rawText);
      console.log('customsplit function');
      tokenArray = customSplit(rawText);
      console.log(' final token array =', tokenArray);
      resolve(tokenArray);
    });
  });
}
tokenizer();

module.exports.tokenizer = tokenizer;
