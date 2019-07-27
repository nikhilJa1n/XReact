# XReact

Rebuilding the React.js library in our own way

## Getting Started

Clone the component branch.

```
git clone https://github.com/nikhilJa1n/XReact.git -b master
```

### Prerequisites

What things you need to install the software and how to install them

```
Launch vscode press (ctrl+P) to open command palette
then copy below the command
ext install ritwickdey.LiveServer
```

### Usage

This a App file

```
import XReact from './XReact';

export class App extends Component {
constructor(props) {
  super(props);
}
render() {
  return createElement("div", {}, createElement("p", {}, "paraTry"));
}
}
```

Then in main method use like this

```
XReact.render(
  "<App name={this.state.value} value={this.state.hello} />",
  document.getElementById("root")
);
```

## Running the tests

```
For running the tests open => test/index.html
it will run all automated tests
```

### And coding style tests

Explain what these tests test and why

```
describe('what are you testing for', function(done){
it('what should it give', function() {
    const element = {
      type: '',  //type: 'div',
      props: {},
    };
    render(element, document.getElementById('root'));
    chai
      .expect(document.getElementById('root').innerHTML)
      .to.equal('');  //<div></div>
  });
})
```

## Deployment

Still WIP

## Built With

- [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) - The Language used

## Authors

- **Nikhil Jain** - _Initial work_ - [Github](https://github.com/nikhilja1n)
- **Karan Arora** - _Initial work_ - [Github](https://github.com/Kashirou)
- **Lokpati Mishra** - _Initial work_ - [Github](https://github.com/lokpatimishra)

## License

No Licence as of now

## Acknowledgments

- Google
- Mountblue
- [Nitesh Sharma]()
