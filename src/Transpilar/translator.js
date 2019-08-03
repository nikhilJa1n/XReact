/* eslint-disable no-param-reassign */
const fs = require('fs');
const tokenizer = require('./tokenizer');
const reserveKeywords = require('./Keyword.js');
const solveHtmlDomTree = require('./solveHtmlDomTree');

function convertJSXExpression(leftCounter, tokenArray, lengthOfTokenArray) {
  const responseObject = {
    isValidDomTree: false,
    DomTree: '',
    rightIndex: leftCounter,
  };
  if (leftCounter >= lengthOfTokenArray) {
    return responseObject;
  }
  const argumentObject = {
    leftCounter,
    tokenArray,
    lengthOfTokenArray,
    stack: [
      {
        currentDom: {
          props: {
            children: [],
          },
        },
      },
    ],
  };
  const result = solveHtmlDomTree.solveHtmlDomTree(argumentObject);
  responseObject.DomTree = result.htmlDom;
  console.log('result Object dom Tree =', responseObject.DomTree);
  responseObject.rightIndex = result.leftCounter;
  return responseObject;
}

function extractHtmlTagFromText(leftCounter, tokenArray, lengthOfTokenArray) {
  // reomovewhiteSpace after jsX
  while (leftCounter < lengthOfTokenArray && tokenArray === ' ')
    leftCounter += 1;
  return convertJSXExpression(leftCounter, tokenArray, lengthOfTokenArray);
}

async function transpilar() {
  const tokenArray = await tokenizer.tokenizer();
  console.log('token Array =', tokenArray);
  const lengthOfTokenArray = tokenArray.length;
  let leftCounter = 0;
  let newText = '';
  while (leftCounter < lengthOfTokenArray) {
    if (tokenArray[leftCounter].startsWith('JSX')) {
      const response = extractHtmlTagFromText(
        leftCounter + 1,
        tokenArray,
        lengthOfTokenArray,
      );
      console.log(' domTree = ', response.DomTree);
      console.log(' 1newText=', newText);
      console.log('check this',response.DomTree);
      newText += response.DomTree;
      console.log(' 2newText=', newText);
      leftCounter = response.rightIndex;
    } else {
      console.log('tokenArray[leftCounter]',tokenArray[leftCounter]);
      
      newText += tokenArray[leftCounter];
      if (leftCounter !== lengthOfTokenArray) newText += ' ';
      leftCounter += 1;
      console.log('in if', newText);
      
    }
  }
  console.log('---------tranpiled code --------');
  console.log(newText);
console.log(process.argv[2]);    
  fs.writeFile(`../${process.argv[2]}Transpiled.js`, newText, err => {
    if (err) console.log(' error ', err);
  });
}
transpilar();
