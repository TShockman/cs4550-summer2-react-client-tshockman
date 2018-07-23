import React from 'react';
import PropTypes from 'prop-types';
import ConfirmModal from './ConfirmModal';

export default class ModuleListItem extends React.PureComponent {
  static propTypes = {
    module: PropTypes.object.isRequired,
    selectModule: PropTypes.func.isRequired,
    deleteModule: PropTypes.func.isRequired,
    active: PropTypes.bool
  };

  handleSelect = () => {
    const {module, selectModule} = this.props;
    selectModule(module);
  };

  handleDelete = () => {
    const {module, deleteModule} = this.props;
    deleteModule(module);
  };

  render() {
    const {module, active} = this.props;

    return (
      <li className="nav-item" onClick={this.handleSelect}>
        <a className={`nav-link ${active && "active"}`} href="#">
          {module.title}
        </a>
        <ConfirmModal
          title="Confirm Delete"
          message={`Are you sure you want to delete "${module.title}?"`}
          onConfirm={this.handleDelete}
          buttonContent={<i className="fa fa-trash"/>}/>
      </li>
    );
  }
}