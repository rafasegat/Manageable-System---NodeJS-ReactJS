import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter  } from 'reactstrap';

class ModalContainer extends Component{
  constructor(props){
    super(props);
    this.state = {
      showModal: true
    }
    
  }

  render() {
    const { 
      title,
      closeModal,
      showModal
    } = this.props;
    
    return (
      <Modal isOpen={showModal} toggle={closeModal} className={this.props.className}>
          <ModalHeader toggle={closeModal}>{title}</ModalHeader>
          <ModalBody>
              {this.children}
          </ModalBody>
      </Modal>
    );
  }

}

export default ModalContainer;