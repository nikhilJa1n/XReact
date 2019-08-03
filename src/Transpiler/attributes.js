/* eslint-disable prefer-destructuring */
/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */

function throwError(message) {
  throw new Error(message);
}

function isExit(counter, lengthOfTokenArray, tokenArray) {
  return !(counter >= lengthOfTokenArray || tokenArray[counter] === '>' || tokenArray[counter] === '/>');
}

function extractAttribute(leftCounter, tokenArray, lengthOfTokenArray) {
  let localLeftCounter = leftCounter;
  let count = 0;
  const responseObject = {
    isClosingAngleBracket: false,
    isDomClosed: false,
    props: {},
  };
  const attributeValuePair = [null, null, null];
  while (isExit(localLeftCounter, lengthOfTokenArray, tokenArray)) {
    const token = tokenArray[localLeftCounter];
    attributeValuePair[count] = token;
    count += 1;
    if (count === 3) {
      count = 0;
      if (attributeValuePair[0] !== null && attributeValuePair[1] === '=') {
        if (attributeValuePair[2].startsWith('{') && attributeValuePair[2].endsWith('}')) {
          attributeValuePair[2] = attributeValuePair[2].substring(1,
            attributeValuePair[2].length - 1).trim();
        }
        responseObject.props[attributeValuePair[0]] = attributeValuePair[2];
        attributeValuePair[0] = null; attributeValuePair[1] = null; attributeValuePair[3] = null;
      } else throwError('invalid attribute value pair');
    }
    localLeftCounter += 1;
  }
  if (localLeftCounter !== lengthOfTokenArray) {
    if (tokenArray[localLeftCounter] === '/>' || tokenArray[localLeftCounter - 1].endsWith('/')) {
      responseObject.isDomClosed = true;
    }
    if (tokenArray[localLeftCounter] === '>' || tokenArray[localLeftCounter].endsWith('>')) {
      responseObject.isClosingAngleBracket = true;
    }
  }
  console.log(' response Object =', responseObject);
  responseObject.currentIndex = localLeftCounter + 1;
  return responseObject;
}

// function extractTypeAndValue(token) {
//   // console.log('extract with space = ', token);
//   const lengthOfToken = token.length;
//   const responseObject = {
//     type: null,
//     value: null,
//   };

//   let leftCounter = 0;
//   let text = '';
//   while (leftCounter < lengthOfToken) {
//     if (token[leftCounter] === '=') {
//       if (text !== '') responseObject.type = text;
//       text = '';
//       leftCounter++;
//     } else {
//       text += token[leftCounter++];
//     }
//   }
//   if (text !== '') {
//     if (text.startsWith('this.')) {
//       text = JSON.parse(text);
//     }
//     responseObject.value = text;
//   }
//   return responseObject;
// }

// function extractWithSpace(leftCounter, tokenArray, lengthOfTokenArray) {
//   let count = 0;
//   const responseObject = {
//     type: null,
//     value: null,
//     currentIndex: leftCounter,
//   };

//   console.log('        leftCounter=', leftCounter, 'lengthOfTokenArray=', lengthOfTokenArray);
//   const text = '';
//   while (leftCounter < lengthOfTokenArray) {
//     // console.log(' token = ', tokenArray[leftCounter])
//     if (tokenArray[leftCounter] !== '' && tokenArray[leftCounter] !== '=') {
//       if (count === 0) {
//         responseObject.type = tokenArray[leftCounter];
//         count++;
//       } else {
//         responseObject.value = tokenArray[leftCounter];
//         break;
//       }
//     }
//     leftCounter++;
//   }
//   responseObject.currentIndex = leftCounter;
//   return responseObject;
// }

// function isTerminationCondition(leftCounter, tokenArray) {
//   const value = tokenArray[leftCounter].startsWith('>')
//     || tokenArray[leftCounter].startsWith('/>')
//     || leftCounter >= tokenArray.length;
//   // console.log('termination condition =', value);
//   return value;
// }

// function isValidDom(leftcounter, tokenArray) {
//   return token;
// }

// function extractAttribute(leftCounter, tokenArray, lengthOfTokenArray, props = {}) {
//   const responseObject = {
//     isClosingAngleBracket: false,
//     isDomClosed: false,
//     props: null,
//   };

//   let secondLastToken = null;
//   console.log('       ------in extractAtrributes-------');
//   console.log('       ', 'leftCounter=', leftCounter, 'length =', lengthOfTokenArray);
//   while (!isTerminationCondition(leftCounter, tokenArray)) {
//     if (tokenArray[leftCounter] === '' || tokenArray[leftCounter] === '/') {
//       leftCounter++;
//       if (tokenArray[leftCounter] === '/') secondLastToken = '/';
//       continue;
//     }
//     const token = tokenArray[leftCounter];
//     secondLastToken = token;
//     let attributeObject;
//     if (token.includes('=')) {
//       attributeObject = extractTypeAndValue(token);
//     } else {
//       attributeObject = extractWithSpace(leftCounter, tokenArray, lengthOfTokenArray);
//       leftCounter = attributeObject.currentIndex;
//     }

//     const type = attributeObject.type;
//     const value = attributeObject.value;
//     console.log('      type = ', type, ' value =', value, ' nextIndex=', leftCounter);
//     if (type && value) {
//       props[`${type}`] = value;
//     } else {
//       throw new Error(' sytax Error');
//     }
//     // console.log('porps = ', props);
//     leftCounter++;
//   }

//   // console.log('leftCounter=', leftCounter, ' lengthOfTokenArray=',lengthOfTokenArray);
//   responseObject.props = props;
//   responseObject.currentIndex = leftCounter + 1;
//   if (leftCounter !== lengthOfTokenArray) {
//     // console.log(' within if ');
//     responseObject.isClosingAngleBracket = tokenArray[leftCounter].startsWith('>') || tokenArray[leftCounter].startsWith('/>');
//     responseObject.isDomClosed = tokenArray[leftCounter] === '/>' || secondLastToken === '/';
//   }
//   return responseObject;
// }

// const array = [
//  'name',
//  '=',
//  'lokpati',
//  'class',
//  '=',
//  '11th',
//  'company= \'<\'',
// ]

// const result = extractAttribute(0, array, 7);
// console.log('final result = ', result);

module.exports.extractAttribute = extractAttribute;
