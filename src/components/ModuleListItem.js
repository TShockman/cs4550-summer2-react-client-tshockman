import React from 'react';
import PropTypes from 'prop-types';

export default class ModuleListItem extends React.PureComponent {
  static propTypes = {
    module: PropTypes.object.isRequired,
    selectModule: PropTypes.func.isRequired,
    active: PropTypes.bool
  };

  handleSelect = () => {
    const {module, selectModule} = this.props;
    selectModule(module);
  };

  render() {
    const {module, active} = this.props;

    return (
      <li className="nav-item" onClick={this.handleSelect}>
        <a className={`nav-link ${active && "active"}`} href="#">
          {module.title}
        </a>
      </li>
    );
  }
}