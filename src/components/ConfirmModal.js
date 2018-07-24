import React from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  Button,
  ModalBody,
  ModalFooter,
  ModalHeader
} from 'reactstrap';

export default class ConfirmModal extends React.PureComponent {
  static propTypes = {
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    onConfirm: PropTypes.func.isRequired,
    buttonContent: PropTypes.any.isRequired,
    className: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.state = {show: false}
  }

  handleShow = () => {
    this.setState({show: true})
  };

  handleClose = () => {
    this.setState({show: false})
  };

  handleConfirm = () => {
    const {onConfirm} = this.props;
    onConfirm();
    this.handleClose();
  };

  render() {
    const {title, message, buttonContent, className} = this.props;
    const {show} = this.state;
    return (
      <span className={className}>
        <Button color="danger" onClick={this.handleShow}>
          {buttonContent}
        </Button>

        <Modal isOpen={show} toggle={this.handleShow}>
          <ModalHeader toggle={this.handleShow}>{title}</ModalHeader>
          <ModalBody>
            {message}
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.handleClose}>Cancel</Button>
            <Button color="primary" onClick={this.handleConfirm}>Confirm</Button>
          </ModalFooter>
        </Modal>
      </span>
    );
  }

}