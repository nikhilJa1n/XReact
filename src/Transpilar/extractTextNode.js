/* eslint-disable no-param-reassign */
const validHtmlDom = require('./htmlDom.js');

const Dom = validHtmlDom.htmlDom;

// console.log('Dom = ', Dom)

// function compareCurrentDomAndExpectedDom(currentDom, expectedDom) {
//   return currentDom === expectedDom;
// }

// function checkValidityOfChildNode(leftCounter, tokenArray, stack) {
//   const responseObject = {
//     isValidDom: false,
//     isOpenTag: false,
//     isCloseTag: false,
//     rightIndex: leftCounter,
//   };
//   const lengthOfTokenArray = tokenArray.length;
//   console.log('          leftCounter=', leftCounter,
//     'tokenArray=', tokenArray,
//     'stack=', stack);
//   if (leftCounter === lengthOfTokenArray && stack.length === 1) {
//     console.log('          leftCounter is equivalent to length of array');
//     responseObject.isValidDom = true;
//   } else if (leftCounter !== lengthOfTokenArray && stack.length) {
//     const token = tokenArray[leftCounter];
//     const lengthOfToken = token.length;
//     const expectedDom = stack[stack.length - 1];
//     console.log('           expectedDom =', expectedDom);
//     if (token.startsWith('<') && token.endsWith('>')) {
//       const currentDom = token.substring(1, lengthOfToken - 1).trim();
//       console.log('         currentDom=', currentDom);
//       if (compareCurrentDomAndExpectedDom(currentDom, expectedDom)) {
//         responseObject.isValidDom = true;
//         responseObject.isOpenTag = true;
//       } else if (currentDom.startsWith('/')) {
//         console.log();
//         const domType = currentDom.substring(1, currentDom.length).trim();
//         // console.log('current Dom=',domType);
//         if (compareCurrentDomAndExpectedDom(domType, expectedDom)) {
//           responseObject.isValidDom = true;
//           responseObject.isCloseTag = true;
//         }
//       }
//     }
//   }
//   return responseObject;
// }

function isWhileShouldTerminate(leftCounter, lengthOfTokenArray, tokenArray) {
  if (leftCounter === lengthOfTokenArray) return true;
  if (tokenArray[leftCounter].startsWith('<')) return true;
  return false;
}

function extractTextNode(leftCounter, tokenArray, stack) {
  const lengthOfTokenArray = tokenArray.length;
  let childText = '';
  let isSpaceArea = false;
  while (!isWhileShouldTerminate(leftCounter, lengthOfTokenArray, tokenArray)) {
    // console.log('token = ', tokenArray[leftCounter]);
    if (isSpaceArea === false && tokenArray[leftCounter] === '') {
      isSpaceArea = true;
      childText += ' ';
    } else if (tokenArray[leftCounter] === '' || tokenArray === '\n') {
      childText += tokenArray[leftCounter];
    } else {
      isSpaceArea = false;
      childText += `${tokenArray[leftCounter]} `;
    }
    leftCounter += 1;
  }
  if(childText.startsWith('{')) {
    childText = childText.trim();
    childText = childText.substring(1,childText.length-1)
  } else {
    childText = JSON.stringify(childText)
  }
  // boundary cases is to be handled take care those too.
  const responseObject = {
    leftCounter,
    type: 'TEXT_ELEMENT',
    props: {
      textValue:childText,
    },
  };
  return responseObject;
}

// const array = [
//    ' ',
//    ' ',
//    'hello',
//    'i',
//    'am',
//    'programmer',
//    'hhello',
//    'kekr',
// ]

// const result = extractTextNode(0, array, []);
// console.log('result = ', result);

module.exports.extractTextNode = extractTextNode;
