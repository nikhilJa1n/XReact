/* eslint-disable import/prefer-default-export */
export class Component {
  constructor(props) {
    this.props = props;
    this.state = this.state || {};
  }

  setState(dataToBeUpdated) {
    this.state = Object.assign({}, this.state, dataToBeUpdated);
  }
}
