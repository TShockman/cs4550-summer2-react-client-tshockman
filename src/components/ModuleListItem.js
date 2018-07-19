import React from 'react';
import PropTypes from 'prop-types';

export default class ModuleListItem extends React.Component {
  static propTypes = {
    module: PropTypes.object.isRequired,
    selectModule: PropTypes.func.isRequired
  };

  handleSelect = () => {
    const {module, selectModule} = this.props;
    selectModule(module);
  };

  render() {
    const {module} = this.props;

    return (
      <li className="nav-item" onClick={this.handleSelect}>
        <a className="nav-link" href="#">
          {module.title}
        </a>
      </li>
    );
  }
}