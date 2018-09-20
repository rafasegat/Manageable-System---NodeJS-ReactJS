import React, { Component } from 'react';
import { Route, Redirect } from 'react-router'
import { getFromStorage, setInStorage } from '../../utils/Storage';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter  } from 'reactstrap';
import Loading from '../../components/Common/Loading';
import ProjectForm from '../../components/Project/Form';
import ProjectList from './ProjectList';
import ProjectAction from '../../flux/project/ProjectAction';
import * as Action from '../../flux/project/ProjectAction';

class Project extends Component {
    constructor(props, match){
        super(props);
        this.state = {
            isLoading: false,
            listProjects: [],
            showModal: false,
            id_organization: null,
            modelProject: {
                name: '',
                id_organization: null,
                status: null
            },
            messageValidation: '',
            submitDisabled: true
        };
        
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.updateModelProject = this.updateModelProject.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.redirectParticipants = this.redirectParticipants.bind(this);

        // ID organization from param
        let href = this.props.location.pathname;
        let hrefWithId = href.match(/([^\/]*)\/*$/)[1];
        this.state.id_organization = hrefWithId;

        let currentInstance = this;
        ProjectAction.addListener((type, payload)=>currentInstance.onProjectStoreChanged(type, payload, currentInstance));

    }

    onProjectStoreChanged(type, payload, currentInstance){
        const {
            id_organization
        } = this.state;
        if(type===Action.ALL){
            currentInstance.setState({
                isLoading: false,
                listProjects: payload.data
            });
        }
        if(type===Action.SAVE){
            if(payload.status==='success'){
                ProjectAction.all({ id_organization: id_organization });
                currentInstance.closeModal();
            }
        }
    }

    componentDidMount(){
        const {
            id_organization
        } = this.state;

        // If there's no organization, let's go back
        if(!id_organization)
            this.props.history.push('/organizations');

        setInStorage('FB360_Organization', { 
            id: id_organization
        });
        
        this.setState({
            isLoading: true
        });

        ProjectAction.all({ id_organization: id_organization });
    }

    closeModal() {
        this.setState({ showModal: false });
    }

    openModal() {
        this.setState({ showModal: true });
    }

    redirectParticipants(id_project) {
        // Let's set the global project
        setInStorage('FB360_Project', { 
            id: id_project
        });
        // redirect to participants
        this.props.history.push('/participants');
    }

    updateModelProject(data){
        const { 
            modelProject 
        } = this.state;
        let aux = modelProject;
        aux[data.field] = data.value;
        this.setState({
            modelProject: aux
        });
        this.validateForm();
    }

    validateForm(){
        const { 
            modelProject 
        } = this.state;

        let message = '';

        if(!modelProject.name)
            message += 'Name cannot be blank.';
        
        if(message)
            this.setState({ submitDisabled: true  });
        else
            this.setState({ submitDisabled: false  });
        
        this.setState({ messageValidation: message  });
        
    }

    handleSubmit(){
        const {
            modelProject,
            id_organization,
            submitDisabled
        } = this.state;

        this.setState({
            isLoading: true
        });

        modelProject['id_organization'] = id_organization;
        modelProject['status'] = 1; // Collecting Feedback

        if(!submitDisabled)
            ProjectAction.save(modelProject);
    }

    render() {
        const {
            isLoading,
            listProjects,
            showModal,
            modelProject,
            messageValidation,
            submitDisabled
        } = this.state;
        
        if(isLoading)
            return(<Loading />);

        return (
            <section className="projects">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <ProjectList 
                                list={listProjects}
                                openModal={this.openModal}
                                redirectParticipants={this.redirectParticipants}
                            />
                        </div> 
                    </div>
                </div>
                <Modal isOpen={showModal} toggle={this.closeModal} className={this.props.className}>
                    <ModalHeader toggle={this.closeModal}>New Project</ModalHeader>
                    <ModalBody>
                        <ProjectForm 
                            modelProject={modelProject}
                            updateModelProject={this.updateModelProject}
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

export default Project;