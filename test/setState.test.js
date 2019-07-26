/* eslint-disable no-undef */
import { Component } from '../src/Component.js';


describe('SetState ', () => {
  it('should return state of the class', () => {
    class TickCounter extends Component {
      constructor() {
        super();
        this.state = {
          TickCounter: 0,
        };
      }

      hitMetoIncreaseTickCounter() {
        this.setState({
          TickCounter: this.state.TickCounter + 1,
        });
      }

      getState() {
        return this.state;
      }
    }
    const instanceOfTickCounter = new TickCounter();
    instanceOfTickCounter.hitMetoIncreaseTickCounter();
    const output = instanceOfTickCounter.getState();
    const expectedOutput = {
      TickCounter: 1,
    };
    chai.expect(output).to.deep.equal(expectedOutput);
  });
});
