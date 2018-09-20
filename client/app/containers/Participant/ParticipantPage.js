import React, { Component } from 'react';
import { Route, Redirect } from 'react-router'
import { getFromStorage } from '../../utils/Storage';
import Loading from '../../components/Common/Loading';
import { validateEmail } from '../../utils/Tools'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter  } from 'reactstrap';
import ParticipantForm from '../../components/Participant/ParticipantForm';
import ParticipantList from './ParticipantList';
import ParticipantAction from '../../flux/participant/ParticipantAction';
import FeedbackForm from './FeedbackForm';
import * as Action from '../../flux/participant/ParticipantAction';

class Participant extends Component {
    constructor(props, match){
        super(props);
        this.state = {
            isLoading: false,
            listParticipants: [],
            showParticipantModal: false,
            showFeedbackModal: false,
            id_project: getFromStorage('FB360_Project').id,
            currentParticipant: [],
            reportReviewerOptions: [],
            modelParticipant: {
                name: '',
                email: '',
                position: '',
                self_assessment: true,
                choose_own_feedback_provider: true,
                feedback_provider_needs_approval: false,
                id_participant_feedback_reviewer: null
            },
            messageValidation: '',
            submitDisabled: true
        };
        
        // Events
        this.openParticipantModal = this.openParticipantModal.bind(this);
        this.closeParticipantModal = this.closeParticipantModal.bind(this);
        this.updateModelParticipant = this.updateModelParticipant.bind(this);
        this.openFeedbackModal = this.openFeedbackModal.bind(this);
        this.closeFeedbackModal = this.closeFeedbackModal.bind(this);
        this.handleNewParticipant = this.handleNewParticipant.bind(this);

        let currentInstance = this;
        ParticipantAction.addListener((type, payload)=>currentInstance.onParticipantStoreChanged(type, payload, currentInstance));

    }

    onParticipantStoreChanged(type, payload, currentInstance){
        const { id_project } = this.state;
        if(type===Action.ALL){
            currentInstance.setState({
                isLoading: false,
                listParticipants: payload.data
            });
        }
        if(type===Action.SAVE){
            if(payload.status==='success'){
                ParticipantAction.all({ id_project: id_project });
                currentInstance.closeParticipantModal();
            }
        }
    }

    componentDidMount(){
        const { id_project } = this.state;

        // If there's no organization, let's go back
        if(!id_project)
            this.props.history.push('/organizations');
        
        this.setState({ isLoading: true });
        ParticipantAction.all({ id_project: id_project });
    }

    openParticipantModal() {
        this.setState({ showParticipantModal: true });
    }

    closeParticipantModal() {
        this.setState({ showParticipantModal: false });
    }

    openFeedbackModal(currentParticipant){
        this.setState({ 
            currentParticipant: currentParticipant,
            showFeedbackModal: true 
        });
    }

    closeFeedbackModal(){
        this.setState({ showFeedbackModal: false });
    }

    updateModelParticipant(data){
        const { 
            modelParticipant 
        } = this.state;
        let aux = modelParticipant;
        aux[data.field] = data.value;
        this.setState({
            modelParticipant: aux
        });
        this.validateForm();
    }

    validateForm(){
        const { 
            modelParticipant 
        } = this.state;
        let message = '';

        if(!modelParticipant.name) message += 'Name cannot be blank.\n';
        if(!modelParticipant.email) message += 'Email cannot be blank.\n';
        if(!validateEmail(modelParticipant.email)) message += 'Email not valid.\n';
        
        if(message) this.setState({ submitDisabled: true  });
        else this.setState({ submitDisabled: false  });
        
        this.setState({ messageValidation: message  });
    }

    handleNewParticipant(){
        const { 
            modelParticipant 
        } = this.state;
        this.setState({ isLoading: true });
        modelParticipant['status'] = 1; // waiting_for_feedback
        ParticipantAction.save(modelParticipant);
    }

    render() {
        const {
            isLoading,
            listParticipants,
            showParticipantModal,
            showFeedbackModal,
            currentParticipant,
            modelParticipant,
            reportReviewerOptions,
            messageValidation,
            submitDisabled
        } = this.state;
        
        if(isLoading)
            return (<Loading />);

        return (
            <section className="participants">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12">
                            <h2>Collect feedback</h2>
                            <ParticipantList 
                                list={listParticipants}
                                openParticipantModal={this.openParticipantModal}
                                openFeedbackModal={this.openFeedbackModal}
                            />
                        </div> 
                    </div>
                </div>
                <Modal isOpen={showParticipantModal} toggle={this.closeParticipantModal} className={this.props.className}>
                    <ModalHeader toggle={this.closeParticipantModal}>New Participant</ModalHeader>
                    <ModalBody>
                        <ParticipantForm
                            modelParticipant={modelParticipant}
                            updateModelParticipant={this.updateModelParticipant}
                            handleNewParticipant={this.handleNewParticipant}
                            listParticipants={listParticipants}
                            messageValidation={messageValidation}
                            submitDisabled={submitDisabled}
                        />
                    </ModalBody>
                </Modal>

                <Modal isOpen={showFeedbackModal} toggle={this.closeFeedbackModal} className={this.props.className}>
                    <ModalHeader toggle={this.closeFeedbackModal}>Feedback Manager</ModalHeader>
                    <ModalBody>
                        <FeedbackForm
                            currentParticipant={currentParticipant} 
                            onSubmit={this.handleFeedbackSubmit}/>
                    </ModalBody>
                </Modal>

            </section>
        );
    }
}

export default Participant;