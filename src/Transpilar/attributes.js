/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */

function extractTypeAndValue(token) {
  // console.log('extract with space = ', token);
  const lengthOfToken = token.length;
  const responseObject = {
    type: null,
    value: null,
  };

  let leftCounter = 0;
  let text = '';
  while (leftCounter < lengthOfToken) {
    if (token[leftCounter] === '=') {
      if (text !== '') responseObject.type = text;
      text = '';
      leftCounter++;
    } else {
      text += token[leftCounter++];
    }
  }
  if (text !== '') {
    if (text.startsWith('{')) {
      text = text.trim();
      text = JSON.parse(text.substring(1,text.length-1));
    }
    responseObject.value = text;
  }
  return responseObject;
}

function extractWithSpace(leftCounter, tokenArray, lengthOfTokenArray) {
  let count = 0;
  const responseObject = {
    type: null,
    value: null,
    currentIndex: leftCounter,
  };

  console.log('        leftCounter=', leftCounter, 'lengthOfTokenArray=', lengthOfTokenArray);
  const text = '';
  while (leftCounter < lengthOfTokenArray) {
    // console.log(' token = ', tokenArray[leftCounter])
    if (tokenArray[leftCounter] !== '' && tokenArray[leftCounter] !== '=') {
      if (count === 0) {
        responseObject.type = tokenArray[leftCounter];
        count++;
      } else {
        responseObject.value = tokenArray[leftCounter];
        break;
      }
    }
    leftCounter++;
  }
  responseObject.currentIndex = leftCounter;
  return responseObject;
}

function isTerminationCondition(leftCounter, tokenArray) {
  const value = tokenArray[leftCounter].startsWith('>')
    || tokenArray[leftCounter].startsWith('/>')
    || leftCounter >= tokenArray.length;
  // console.log('termination condition =', value);
  return value;
}

function isValidDom(leftcounter, tokenArray) {
  return token;
}

function extractAttribute(leftCounter, tokenArray, lengthOfTokenArray, props = {}) {
  const responseObject = {
    isClosingAngleBracket: false,
    isDomClosed: false,
    props: null,
  };

  let secondLastToken = null;
  console.log('       ------in extractAtrributes-------');
  console.log('       ', 'leftCounter=', leftCounter, 'length =', lengthOfTokenArray);
  while (!isTerminationCondition(leftCounter, tokenArray)) {
    if (tokenArray[leftCounter] === '' || tokenArray[leftCounter] === '/') {
      leftCounter++;
      if (tokenArray[leftCounter] === '/') secondLastToken = '/';
      continue;
    }
    const token = tokenArray[leftCounter];
    secondLastToken = token;
    let attributeObject;
    if (token.includes('=')) {
      attributeObject = extractTypeAndValue(token);
    } else {
      attributeObject = extractWithSpace(leftCounter, tokenArray, lengthOfTokenArray);
      leftCounter = attributeObject.currentIndex;
    }

    const type = attributeObject.type;
    const value = attributeObject.value;
    console.log('      type = ', type, ' value =', value, ' nextIndex=', leftCounter);
    if (type && value) {
      props[`${type}`] = value;
    } else {
      throw new Error(' sytax Error');
    }
    // console.log('porps = ', props);
    leftCounter++;
  }

  // console.log('leftCounter=', leftCounter, ' lengthOfTokenArray=',lengthOfTokenArray);
  responseObject.props = props;
  responseObject.currentIndex = leftCounter + 1;
  if (leftCounter !== lengthOfTokenArray) {
    // console.log(' within if ');
    responseObject.isClosingAngleBracket = tokenArray[leftCounter].startsWith('>') || tokenArray[leftCounter].startsWith('/>');
    responseObject.isDomClosed = tokenArray[leftCounter] === '/>' || secondLastToken === '/';
  }
  return responseObject;
}

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
