import React from 'react'

import {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalClose,
  ModalBody,
  ModalFooter
} from 'react-modal-bootstrap';

var BootstrapModal = React.createClass({
    getInitialState : function () {
        return {
           show : false
        }
    },
    close: function() {
        this.setState({
           show: false
        });
    },
    open: function() {
        this.setState({
            show : true
        });
    },
    render: function() {
        return (
            <Modal isOpen={this.state.show} onRequestHide={this.close}>
              <ModalHeader>
                <ModalClose onClick={this.close}/>
                <ModalTitle>{this.props.title}</ModalTitle>
              </ModalHeader>
              <ModalBody>
                <p>Are you sure, Do you want to delete ?</p>
              </ModalBody>
              <ModalFooter>
                <button type="button" className='btn btn-default' onClick={this.close}>
                  Cancel
                </button>
                <button type="button" className='btn btn-primary' onClick={this.props.confirm}>
                  Confirm
                </button>
              </ModalFooter>
            </Modal>
        );
    },
});

export default BootstrapModal;