import React, { Component } from 'react';
import { getFromStorage } from '../../utils/Storage';
import Loading from '../../components/Common/Loading';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter  } from 'reactstrap';
import ProviderCustomerOrganizationForm from '../../components/ProviderCustomerOrganization/ProviderCustomerOrganizationForm';
import ProviderCustomerOrganizationList from './ProviderCustomerOrganizationList';
import ProviderCustomerOrganizationAction from '../../flux/provider-customer-organization/ProviderCustomerOrganizationAction';
import * as Action from '../../flux/provider-customer-organization/ProviderCustomerOrganizationAction';

class ProviderCustomerOrganization extends Component {
    constructor(props, match){
        super(props);

        let id_project = getFromStorage('FB360_Project').id,
            id_organization = getFromStorage('FB360_Organization').id,
            model = {
                id: -1,
                name: '',
                id_organization: id_organization
            };
        this.state = {
            isLoading: false, 
            listProviderCustomerOrganization: [],
            showModal: false,
            id_project: id_project,
            id_organization: id_organization,
            modelCurrent: model,
            modelCurrentDefault: model,
            messageValidation: '',
            submitDisabled: true,
            showTooltip: -1
        };
        
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.updateModel = this.updateModel.bind(this);
        this.handleNew = this.handleNew.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleTooltip = this.handleTooltip.bind(this);

        let currentInstance = this;
        ProviderCustomerOrganizationAction.addListener((type, payload)=>currentInstance.onProviderCustomerOrganizationStoreChanged(type, payload, currentInstance));
    }

    onProviderCustomerOrganizationStoreChanged(type, payload, currentInstance){
        const { id_organization } = this.state;
        if(type===Action.ALL){
            currentInstance.setState({
                isLoading: false,
                listProviderCustomerOrganization: payload.data
            });
        }
        if(type===Action.SAVE){
            if(payload.status==='success'){
                ProviderCustomerOrganizationAction.all({ id_organization: id_organization });
                currentInstance.closeModal();
            }
        }
        if(type===Action.DELETE){
            if(payload.status==='success'){
                currentInstance.setState({
                    isLoading: true,
                    showTooltip: -1 
                });
                ProviderCustomerOrganizationAction.all({ id_organization: id_organization });
            }
        }
    }

    componentDidMount(){
        const { 
            id_project,
            id_organization,
            modelCurrent
        } = this.state;

        // If there's no organization, let's go back
        if(!id_project)
            this.props.history.push('/organizations');

        if(!id_organization)
            this.props.history.push('/organizations');
        
        this.setState({ isLoading: true });
        ProviderCustomerOrganizationAction.all({ id_organization: id_organization });
    }

    refreshModel(){
        const {
            modelCurrent,
            modelCurrentDefault
        } = this.state;
        let aux = {};
        for(var prop in modelCurrentDefault)
            aux[prop] = modelCurrentDefault[prop];
        this.setState({ 
            modelCurrent: aux 
        });
    }

    openModal() {
        this.setState({ showModal: true });
    }

    closeModal() {
        this.refreshModel();
        this.setState({ showModal: false });
    }

    updateModel(data){
        const { 
            modelCurrent 
        } = this.state;
        let aux = modelCurrent;
        aux[data.field] = data.value;
        this.setState({
            modelCurrent: aux
        });
        this.validateForm();
    }

    validateForm(){
        const { 
            modelCurrent
        } = this.state;
        let message = '';

        if(!modelCurrent.name) message += 'Name cannot be blank.\n';
        if(message) this.setState({ submitDisabled: true  });
        else this.setState({ submitDisabled: false  });
        
        this.setState({ messageValidation: message  }); 
    }

    handleSubmit(){
        const { 
            modelCurrent 
        } = this.state;
        this.setState({ isLoading: true });
        ProviderCustomerOrganizationAction.save(modelCurrent);
    }

    handleNew(){
        this.refreshModel();
        this.openModal();
    }

    handleDelete(id){
        this.setState({ isLoading: true });
        ProviderCustomerOrganizationAction.delete( { id: id } );
    }

    handleTooltip(id){
        this.setState({ showTooltip: id });
    }

    handleEdit(id){
        const {
            listProviderCustomerOrganization,
            modelCurrent
        } = this.state;
        const currentRow = listProviderCustomerOrganization.filter((el) => {
            return el.id == id;
        });
        let aux = {};
        for(var prop in currentRow[0])
            aux[prop] = currentRow[0][prop];

        this.setState({ 
            modelCurrent: aux 
        });
        this.openModal();
    }

    render(){
        const { 
            isLoading,
            listProviderCustomerOrganization,
            showModal,
            modelCurrent,
            messageValidation,
            submitDisabled,
            showTooltip
        } = this.state;

        if(isLoading)
            return (<Loading />);

        return(
            <section className="provider-customer">

                <div className="provider-customer-list">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-12">
                                <h2>Provider - External Customers</h2>
                                <ProviderCustomerOrganizationList 
                                    list={listProviderCustomerOrganization}
                                    handleNew={this.handleNew}
                                    handleEdit={this.handleEdit}
                                    handleDelete={this.handleDelete}
                                    handleTooltip={this.handleTooltip}
                                    showTooltip={showTooltip}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <Modal isOpen={showModal} toggle={this.closeModal} className={this.props.className}>
                    <ModalHeader toggle={this.closeModal}>Customer</ModalHeader>
                    <ModalBody>
                        <ProviderCustomerOrganizationForm
                            modelCurrent={modelCurrent}
                            updateModel={this.updateModel}
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

export default ProviderCustomerOrganization;