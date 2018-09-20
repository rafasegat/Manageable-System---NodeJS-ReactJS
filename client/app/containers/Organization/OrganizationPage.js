import React, { Component } from 'react';
import { Route, Redirect, withRouter } from 'react-router'
import { getFromStorage } from '../../utils/Storage';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter  } from 'reactstrap';
import Loading from '../../components/Common/Loading';
import OrganizationList from './OrganizationList';
import OrganizationForm from '../../components/Organization/Form';

import OrganizationAction from '../../flux/organization/OrganizationAction';
import * as Action from '../../flux/organization/OrganizationAction';

//Context
import { LoadingContext } from '../../context/Loading.context';

class Organization extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLoading: false,
            isLogged: true,
            listOrganizations: [],
            showModal: false,
            modelOrganization: {
                name: '',
                id_user: getFromStorage('FB360_Token').user
            },
            messageValidation: '',
            submitDisabled: true
        };
        
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateModelOrganization = this.updateModelOrganization.bind(this);

        let currentInstance = this;
        OrganizationAction.addListener((type, payload)=>currentInstance.onOrganizationStoreChanged(type, payload, currentInstance));
    }

    onOrganizationStoreChanged(type, payload, currentInstance){
        if(type===Action.ALL){
            currentInstance.setState({
                isLoading: false,
                listOrganizations: payload.data
            });
        }
        if(type===Action.SAVE){
            if(payload.status==='success'){
                OrganizationAction.all();
                currentInstance.closeModal();
            }
        }
    }

    componentDidMount(){
        this.setState({
            isLoading: true
        });
        OrganizationAction.all();
    }

    closeModal() {
        this.setState({ showModal: false });
    }

    openModal() {
        this.setState({ showModal: true });
    }

    updateModelOrganization(data){
        const { 
            modelOrganization 
        } = this.state;
        let aux = modelOrganization;
        aux[data.field] = data.value;
        this.setState({
            modelOrganization: aux
        });
        this.validateForm();
    }

    validateForm(){
        const { 
            modelOrganization 
        } = this.state;

        let message = '';

        if(!modelOrganization.name)
            message += 'Name cannot be blank.';
        
        if(message)
            this.setState({ submitDisabled: true  });
        else
            this.setState({ submitDisabled: false  });
        
        this.setState({ messageValidation: message  });
        
    }

    handleSubmit(){
        const { 
            modelOrganization,
            submitDisabled
        } = this.state;

        this.setState({
            isLoading: true
        });

        if(!submitDisabled)
            OrganizationAction.save(modelOrganization);
    }

    render() {
        const {
            isLoading,
            listOrganizations,
            showModal,
            modelOrganization,
            messageValidation,
            submitDisabled
        } = this.state;

        if(isLoading)
            return(<Loading />);

        return (
            <section className="organizations">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <OrganizationList 
                                list={listOrganizations}
                                openModal={this.openModal} 
                            />
                        </div> 
                    </div>
                </div>

                 <Modal isOpen={showModal} toggle={this.closeModal} className={this.props.className}>
                    <ModalHeader toggle={this.closeModal}>New Organization</ModalHeader>
                    <ModalBody>
                        <OrganizationForm 
                            modelOrganization={modelOrganization}
                            updateModelOrganization={this.updateModelOrganization}
                            handleSubmit={this.handleSubmit}
                            messageValidation={messageValidation}
                            submitDisabled={submitDisabled}
                        />
                    </ModalBody>
                </Modal>

            </section>
        );
    }
}

export default Organization;