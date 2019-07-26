// const {X} = require('./element-didact')
// const element = X('div',
//                   X('p','first'),
//                   X ('p',
//                     X('ul',
//                       X('li','hello')))
//                   )
// const fakeX = require('fakeX')

const element2 = X(
  "div",
  {id : "container"},
  X("input"),
  X("a",
    { href: "/bar" },
    "bar"
  ),
  X("span",
    { onClick: e => alert("Hi") },
    "click me"
  )
);
{/* <Div> </Div> */}
// const element3 = '<div><p>hello</p></div>'
// const testElement =(
//   <div>hello</div>
// ) 

// console.log(element2)
// document.getElementById('root').innerHTML= element3
XReact.render(element2, document.getElementById('root'));