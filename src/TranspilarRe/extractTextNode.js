/* eslint-disable no-param-reassign */

function isWhileShouldTerminate(leftCounter, lengthOfTokenArray, tokenArray) {
  if (leftCounter >= lengthOfTokenArray) return true;
  if (tokenArray[leftCounter].startsWith('<')) return true;
  return false;
}

function extractTextNode(leftCounter, tokenArray) {
  const lengthOfTokenArray = tokenArray.length;
  let childText = '';
  let prevText = '';
  while (!isWhileShouldTerminate(leftCounter, lengthOfTokenArray, tokenArray)) {
    const token = tokenArray[leftCounter];
    if (token.startsWith('{') && token.endsWith('}')) {
      if (prevText !== '') {
        childText += JSON.stringify(prevText);
        prevText = '';
      }
      childText += token.substring(1, token.length - 1).trim();
    } else {
      prevText += token;
    }
    leftCounter += 1;
  }
  if (prevText !== '') childText += JSON.stringify(prevText);
  const responseObject = {
    leftCounter,
    type: 'TEXT_ELEMENT',
    props: {
      textValue: childText,
    },
  };
  return responseObject;
}

module.exports.extractTextNode = extractTextNode;
