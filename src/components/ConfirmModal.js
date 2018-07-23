import React from 'react';
import PropTypes from 'prop-types';
import {Modal, Button} from 'react-bootstrap';

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
      <div className={className}>
        <Button className="btn btn-primary" onClick={this.handleShow}>
          {buttonContent}
        </Button>

        {show &&
          <div className="static-modal">
            <Modal.Dialog>
              <Modal.Header>
                <Modal.Title>{title}</Modal.Title>
              </Modal.Header>

              <Modal.Body>{message}</Modal.Body>

              <Modal.Footer>
                <Button onClick={this.handleClose}>Cancel</Button>
                <Button bsStyle="primary" onClick={this.handleConfirm}>Confirm</Button>
              </Modal.Footer>
            </Modal.Dialog>
          </div>
        }
      </div>
    );
  }

}