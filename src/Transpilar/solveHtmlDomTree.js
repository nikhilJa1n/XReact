/* eslint-disable prefer-destructuring */
/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
/* eslint-disable no-lonely-if */

const attributes = require('./attributes.js');
const extractTextNode = require('./extractTextNode.js');

// function trimNewLine(token) {
//   const lengthOfToken = token.length;
//   console.log('      token before=', token);
//   let l = 0; let r = lengthOfToken - 1;
//   while (l < lengthOfToken && token[l] === '\n') l++;
//   while (r >= 0 && token[r] === '\n') r--;
//   if (l > r) return '';
//   const newToken = token.substring(l, r + 1);
//   console.log('      token after =', newToken);
//   return newToken;
// }

function removeWhiteSpaceAndFindDomType(leftCounter, tokenArray, lengthOfTokenArray) {
  const responseObject = {
    token: null,
    isValid: false,
    leftCounter,
  };
  while (
    leftCounter < lengthOfTokenArray
    && (tokenArray[leftCounter] === '' || tokenArray[leftCounter] === '\n')
  ) {
    leftCounter += 1;
  }
  //   console.log('exit leftCounter =', leftCounter);
  //   console.log('-------token=', tokenArray[leftCounter])
  const token = tokenArray[leftCounter].trim();
  if (leftCounter < lengthOfTokenArray) {
    responseObject.token = token;
    responseObject.isValid = true;
    responseObject.leftCounter = leftCounter;
  }
  return responseObject;
}

function startswithForwardSlash(domType) {
  return domType.startsWith('/');
}

function endsWithForwardSlash(domType) {
  return domType.endsWith('/') || domType.endsWith('/>');
}

function endsWithAngleBracket(domType) {
  const regex = /^'>'['\n']*$/;
  return regex.test(domType);
}

function isValidDomtype(domType) {
  console.log('      domType = ', domType);
  const regex = /^[A-Za-z0-9_]+$/;
  const isValid = regex.test(domType);
  console.log('      isValid=', isValid);
  return isValid;
}

function checkIsClosingTagAndValidity(domType) {
  const length = domType.length;
  const responseObject = {
    // function responseFormat
    isValidDom: false,
    domType: null,
    isClosing: false,
    isNullDom: false,
    isOpenDom: false,
  };
  const domTypeStartsWithForwardSlash = startswithForwardSlash(domType);
  const domTypeEndsWithBackwardSlash = endsWithForwardSlash(domType);
  if (domTypeStartsWithForwardSlash && domTypeEndsWithBackwardSlash) {
    return responseObject;
  }

  let currentDom = domType;
  console.log('      current Dom=', currentDom);

  if (domTypeStartsWithForwardSlash && currentDom[length - 1] === '>') {
    currentDom = domType.substring(1, length - 1).trim();
    responseObject.isClosing = true;
  } else if (domTypeStartsWithForwardSlash) {
    currentDom = domType.substring(1, length).trim();
    console.log('      if current Dom=', currentDom);
    responseObject.isClosing = true;
  } else if (domTypeEndsWithBackwardSlash) {
    console.log('      else if current Dom=', currentDom);
    if (domType.endsWith('/>')) {
      currentDom = domType.substring(0, length - 2).trim();
    } else {
      // loop whole check for closing angle bracket;
      currentDom = domType.substring(0, length - 1).trim();
    }
    responseObject.isNullDom = true;
  } else if (endsWithAngleBracket(currentDom)) {
    console.log('      else if last  current Dom=', currentDom);
    currentDom = domType.substring(0, length - 1).trim();
    responseObject.isOpenDom = true;
  }
  console.log('      currentDom=', currentDom);
  if (!isValidDomtype(currentDom)) {
    return responseObject;
  }
  if (!responseObject.isClosing && !responseObject.isNullDom && !responseObject.isOpenDom) {
    responseObject.isOpenDom = true;
  }

  responseObject.isValidDom = true;
  responseObject.domType = currentDom;

  return responseObject;
}

// function isTerminateCondition(leftCounter, tokenArray, lengthOfTokenArray) {
//   if (leftCounter === lengthOfTokenArray) {
//     return true;
//   } if (tokenArray[leftCounter] === ')') {
//     return true;
//   }

//   return false;
// }

function handleParentDom(parentDom, currentDom) {
  if (parentDom.props) {
    if (!parentDom.props.children) {
      parentDom.props.children = [];
    }
  } else {
    parentDom.props = {};
    parentDom.props.children = [];
  }
  //   console.log('parentDom.props', parentDom.props.children);
  parentDom.props.children.push(currentDom);
  return parentDom;
}

function throwError() {
  throw new Error('invalid jsx');
}

function dfs(object) {
  let type;
  const regex = /^[A-Z]$/
  if(regex.test(object.type[0])){
    type = `${object.type}`;
  }
  else {
  type = `'${object.type}'`;
}
  if (object.props === {}) {
    console.log('element =', `createElement(${type}, ${null})`);
    return `createElement(${type}, ${null})`;
  }
  let element = `createElement(${type}, {`;
  let children = object.props.children || [];
  Object.keys(object.props).forEach((key) => {
    if (key === 'children') {
      children = object.props.children;
    } else {
      element += ` ${key}:${object.props[key]}, `;
    }
  });

  element += '} ';
  children.forEach((childObject) => {
    const response = dfs(childObject);
    element += `, ${response}`;
  });
  element += ')';
  console.log('      element=', element);
  return element;
}

function solveHtmlDomTree(argumentObject) {
  // alson consider the empty case
  const { tokenArray, lengthOfTokenArray } = argumentObject;
  let { leftCounter, stack } = argumentObject;
  console.log('      --------argument Detail for solveHtmlDomTree---------------');
  console.log('      leftCounter = ', leftCounter);
  console.log('      lengthOfTokenArray=', lengthOfTokenArray);
  console.log('      stackElements:');
  stack.forEach((element) => {
    console.log('         :children=', element);
  });
  console.log('      ---------end of argument Detail for solveHtmlDomTree---------------');
  console.log('\n      removeWhiteSpaceAndFindDomType:');
  const result = removeWhiteSpaceAndFindDomType(leftCounter, tokenArray, lengthOfTokenArray);
  console.log('      end removeWhiteSpaceAndFindDomType:');
  const recursionFunctionArgumentObject = argumentObject;
  let token = result.token;
  leftCounter = result.leftCounter;
  leftCounter = result.leftCounter;
  const currentDom = {
    type: null,
    props: null,
  };

  //   console.log('------hi i am in solve Html Dom Tree and current token = ', token);

  const tokenLength = token.length;

  if (token === ')' || token === ');') {
    if (stack.length === 1) {
      console.log(JSON.stringify(stack[0].currentDom));
      const returnObject = dfs(stack[0].currentDom.props.children[0]);
      return {
        htmlDom: returnObject,
        leftCounter: leftCounter+1,
      };
    }
    throwError();
  }

  if (token.startsWith('<')) {
    // constraints text element cannot starts with angleBracket;
    token = token.substring(1, tokenLength);
    console.log('      checkIsClosingTagAndValidity:');
    const validityResponse = checkIsClosingTagAndValidity(token);
    console.log('      end checkIsClosingTagAndValidity:');
    console.log('      validity Response Received=', validityResponse);

    // invalid dom
    if (validityResponse.isValidDom === false) {
      throwError();
    }

    // closing dom

    if (validityResponse.isClosing === true) {
      console.log('      :closeing dom case:');
      const lengthOfStack = stack.length;
      if (lengthOfStack === 1) throwError();
      const topElement = stack[lengthOfStack - 1];
      const domOfClosingTag = topElement.currentDom;
      const currentDomType = domOfClosingTag.type;
      if (currentDomType !== validityResponse.domType) throwError();
      stack.pop();
      if (typeof stack[lengthOfStack - 2].currentDom.props.children === 'undefined') {
        stack[lengthOfStack - 2].currentDom.props.children = [];
      }
      stack[lengthOfStack - 2].currentDom.props.children.push(domOfClosingTag);
      recursionFunctionArgumentObject.leftCounter = leftCounter + 1;
      console.log('      :end closeing dom case:');
      return solveHtmlDomTree(recursionFunctionArgumentObject);
    }

    // null dom
    // if (validityResponse.isNullDom === true) {
    //   if (parentDom === null && leftCounter !== lengthOfTokenArray - 1) {
    //     throw new Error('    invalid jsx');
    //   }
    //   // consider also finding closing angle bracket if it does not met
    //   if (token.endsWith('/>')) {
    //     currentDom.type = validityResponse.domType;
    //     currentDom.props = null;
    //     if (parentDom === null) {
    //       return currentDom;
    //     }
    //     parentDom = handleParentDom(parentDom, currentDom);
    //     console.log('parentDom=', parentDom);
    //     return parentDom;
    //   }
    //   return parentDom;
    // }

    // child dom
    if (validityResponse.isOpenDom) {
      currentDom.type = validityResponse.domType;
      console.log('      open domCase:');

      console.log('     ---------------in attribute function---------------------');
      const response = attributes.extractAttribute(leftCounter + 1, tokenArray, lengthOfTokenArray);

      console.log('    ----------end of attribute function----------------------');
      console.log('    response Props=', response.props);
      if (response.isClosingAngleBracket === false) {
        throw new Error('invalid jsx Syntax');
      }
      if (response.isClosingAngleBracket === true) {
        recursionFunctionArgumentObject.leftCounter = response.currentIndex;
        currentDom.props = response.props;
        recursionFunctionArgumentObject.stack.push({
          currentDom,
        });
        return solveHtmlDomTree(recursionFunctionArgumentObject);
      }
      // consider Below too.
      //   if (response.isDomClosed) {
      //     currentDom.props = response.props;
      //     //   console.log('    currentDom=', currentDom);
      //     parentDom = handleParentDom(parentDom, currentDom);
      //     //   console.log('    currentDom props children =', parentDom.props.children);
      //     return parentDom;
      //   }
      //   return parentDom;
    }
  } else {
    console.log('      extractTextNode function');
    const response = extractTextNode.extractTextNode(leftCounter, tokenArray, stack);
    console.log('      end extractTextNode function');
    recursionFunctionArgumentObject.leftCounter = response.leftCounter;
    console.log('response received=', response);
    const lengthOfStack = stack.length;
    if (lengthOfStack === 0) throwError();
    if (typeof stack[lengthOfStack - 1].currentDom.props.children === 'undefined') {
      stack[lengthOfStack - 1].currentDom.props.children = [];
    }
    delete response.leftCounter;
    stack[lengthOfStack - 1].currentDom.props.children.push(response);
    recursionFunctionArgumentObject.stack = stack;
    return solveHtmlDomTree(recursionFunctionArgumentObject);
  }
}

// let tag = 'div';
// console.log('result=', checkIsClosingTag(tag));
// tag = '/ div';
// console.log('result=', checkIsClosingTag(tag));
// tag =  '/div/';
// console.log('result=', checkIsClosingTag(tag));
// tag = '/div>'
// console.log('result=', checkIsClosingTag(tag));
// tag = 'div/';
// console.log('result=', checkIsClosingTag(tag));
// tag = 'div/>';
// console.log('result=', checkIsClosingTag(tag));

// // console.log( 'a' in [a-z])

// solveHtmlDomTree tests

// const array = [
//   '<div',
//   'name=lokpati mishra',
//   'class',
//   '=',
//   '11th',
//   '/>',
// ];

// const parentDom = {
//   type: 'div',
//   props: null,
// };

// const a = [];
// console.log(a.push('hello'));
// const result = solveHtmlDomTree(0, array, 6, parentDom);
// console.log('result=', result);

module.exports.solveHtmlDomTree = solveHtmlDomTree;
