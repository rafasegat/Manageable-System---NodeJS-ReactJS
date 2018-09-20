import React, { Component } from 'react';
import {validateEmail} from '../../utils/Tools'
import { getFromStorage } from '../../utils/Storage';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import { status as statusParticipant } from '../../flux/participant/ParticipantAction';
import Loading from '../../components/Common/Loading';

import ParticipantAction from '../../flux/participant/ParticipantAction';
import ProviderAction from '../../flux/provider/ProviderAction';
import { relationship_provider_info, status_provider_info } from '../../flux/provider/ProviderAction';

import AddProviderForm from '../../components/Provider/AddProviderForm';

import * as ActionParticipant from '../../flux/participant/ParticipantAction';
import * as ActionProvider from '../../flux/provider/ProviderAction';
import ProviderList from '../Provider/ProviderList';

class FeedbackForm extends Component {

    constructor(props, match){
        super(props);

        let id_participant = props.currentParticipant.id,
            id_project = getFromStorage('FB360_Project').id;

        this.state = {
            listProviders: [],
            currentParticipant: props.currentParticipant,
            id_participant: id_participant,
            id_project: id_project,
            activeTab: '1',
            messageValidation: '',
            submitDisabled: true,
            isLoading: false,
            modelProvider: { 
                             relationship: relationship_provider_info.self_assessment.key,
                             id_project: id_project,
                             id_participant: id_participant,
                             id_provider: null,
                             id_provider_customer: null,
                             status: null
                           },
            participantProviderOptions: []
        };

        this.toggle = this.toggle.bind(this);
        this.updateDataProvider = this.updateDataProvider.bind(this);
        this.handleSubmitAddProvider = this.handleSubmitAddProvider.bind(this);
        this.handleDeleteProvider = this.handleDeleteProvider.bind(this);

        let currentInstance = this;
        ParticipantAction.addListener((type, payload)=>currentInstance.onParticipantStoreChanged(type, payload, currentInstance));
        ProviderAction.addListener((type, payload)=>currentInstance.onProviderStoreChanged(type, payload, currentInstance));
    }

    componentDidMount(){
        const { 
            id_project,
            id_participant 
        } = this.state;

        if(!id_project)
            this.props.history.push('/organizations');

        this.setState({ isLoading: true });

        ParticipantAction.providers({
            id_participant: id_participant,
            id_project: id_project
        });

        ParticipantAction.all({ 
            id_project: id_project 
        });
        
        ParticipantAction.allLessCurrent({ 
            id_project: id_project,
            id_participant: id_participant
        });

        this.updateDataProvider({
            field: 'relationship',
            value: relationship_provider_info.self_assessment.key
        });
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    onParticipantStoreChanged(type, payload, currentInstance){
        const { id_project } = this.state;

        if(type===ActionParticipant.PROVIDERS){
            currentInstance.setState({
                //isLoading: false,
                listProviders: payload.data
            });
        }
        if(type===ActionParticipant.ALL_LESS_CURRENT){
            currentInstance.setState({
                isLoading: false,
                participantProviderOptions: payload.data
            });
        }
    }

    onProviderStoreChanged(type, payload, currentInstance){
        const { 
            id_project,
            id_participant 
          } = this.state;

        if(type===ActionProvider.SAVE){
            currentInstance.setState({
                isLoading: false
            });
            // Load providers again
            ParticipantAction.providers({
                id_participant: id_participant,
                id_project: id_project
            });
        }
        if(type===ActionProvider.DELETE){
            currentInstance.setState({
                isLoading: false
            });
            ParticipantAction.providers({
                id_participant: id_participant,
                id_project: id_project
            });
        }
    }

    validateForm(){
        const { 
            modelProvider 
        } = this.state;

        let message = '';

        if( modelProvider.relationship == relationship_provider_info.line_manager.key ||
            modelProvider.relationship == relationship_provider_info.peer.key ||
            modelProvider.relationship == relationship_provider_info.direct_report.key ){

            if(!modelProvider.id_provider)
                message += 'Provider cannot be blank.\n';

        }

        if( modelProvider.relationship == relationship_provider_info.customer.key ||
            modelProvider.relationship == relationship_provider_info.supplier.key ){

            if(!modelProvider.external_name)
                message += 'External Name cannot be blank.\n';
            
            if(!modelProvider.external_email)
                message += 'External Email cannot be blank.\n';

            if(!validateEmail(modelProvider.external_email))
                message += 'External Email is invalid.\n';

        }

        if( modelProvider.relationship == relationship_provider_info.customer.key ||
            modelProvider.relationship == relationship_provider_info.supplier.key ){

                if(modelProvider.id_provider)
                    message += 'Provider must be blank.\n';

        }

        if(!modelProvider.relationship)
            message += 'Select Relationship.\n';
        
        if(message)
            this.setState({ submitDisabled: true  });
        else
            this.setState({ submitDisabled: false  });
        
        this.setState({ messageValidation: message  });
        
    }

    updateDataProvider(data){
        const { 
            modelProvider, 
            id_participant 
        } = this.state;
        let aux = modelProvider;
        aux[data.field] = data.value;

        // Clear id_provider if change relationship
        if(  data.field =='relationship' ) {
            aux['id_provider'] = null;
        }

        // Clear id_provider if is Self aassessment / Customer / Supplier
        if(  data.field =='relationship' &&
             data.value == relationship_provider_info.self_assessment.key
         ) {
                    aux['id_provider'] = id_participant;
        }

        // Clear external if is 
        if(  data.field =='relationship' &&
           ( data.value == relationship_provider_info.self_assessment.key ||
             data.value == relationship_provider_info.line_manager.key ||
             data.value == relationship_provider_info.peer.key ||
             data.value == relationship_provider_info.direct_report.key
            )
         ) {
                aux['external_name'] = '';
                aux['external_email'] = '';
        }
        this.setState({
            modelProvider: aux
        });
        this.validateForm();
    }

    handleSubmitAddProvider(){
       const {
        modelProvider,
        id_participant
       } = this.state;
       modelProvider.status = status_provider_info.invited.key;
       this.setState({ isLoading: true });
       ProviderAction.save(modelProvider);
    }

    handleDeleteProvider(id){
        if(!id)
            return;
        this.setState({ isLoading: true });
        ProviderAction.delete({
            id: id
        })
    }

    render(){
        const {
            listProviders,
            currentParticipant,
            showAddProvider,
            modelProvider,
            messageValidation,
            submitDisabled,
            participantProviderOptions,
            isLoading
        } = this.state;
        
        let status = statusParticipant.find(x => x.id_status === currentParticipant.status);

        if(isLoading)
            return (<Loading />);

        return(
            <div>
                <Nav tabs>
                    <NavItem>
                        <NavLink className="active" onClick={() => { this.toggle('1'); }} >
                            Feedback Providers
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink onClick={() => { this.toggle('2'); }} >
                            Tasks
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink onClick={() => { this.toggle('3'); }} >
                            Profile Settings
                        </NavLink>
                    </NavItem>
                </Nav>

                <TabContent activeTab={this.state.activeTab}>
                    
                    <TabPane tabId="1">
                        <Row>
                            <Col sm="12">
                                
                                <h4>List of Feedback Providers</h4>
                                <h5>Status: {status!=undefined && status.name}</h5>
                                <ProviderList 
                                    listProviders={listProviders}
                                    currentParticipant={currentParticipant}
                                    handleDeleteProvider={this.handleDeleteProvider}
                                />
                                
                                <AddProviderForm  
                                    modelProvider={modelProvider} 
                                    updateDataProvider={this.updateDataProvider}
                                    handleSubmitAddProvider={this.handleSubmitAddProvider}
                                    submitDisabled={submitDisabled}
                                    messageValidation={messageValidation}
                                    participantProviderOptions={participantProviderOptions}
                                />

                            </Col> 
                        </Row>
                    </TabPane>
                    
                    <TabPane tabId="2">
                        <Row>
                        <Col sm="12">

                            <h4>Tab 2 Contents</h4>

                        </Col>
                        </Row>
                    </TabPane>

                    <TabPane tabId="3">
                        <Row>
                        <Col sm="12">

                            <h4>Tab 3 Contents</h4>

                        </Col>
                        </Row>
                    </TabPane>

                </TabContent>
            </div>
        )

    }
}

export default FeedbackForm;