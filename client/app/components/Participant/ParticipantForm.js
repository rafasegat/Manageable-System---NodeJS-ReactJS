import React from 'react';
import {validateEmail} from '../../utils/Tools'
import {InputText} from 'primereact/components/inputtext/InputText';
import {Checkbox} from 'primereact/components/checkbox/Checkbox';
import {AutoComplete} from 'primereact/components/autocomplete/AutoComplete';
import {Button} from 'primereact/components/button/Button';
import Select from 'react-select';

const ParticipantForm = props => {
  const { 
    handleNewParticipant,
    modelParticipant,
    updateModelParticipant,
    listParticipants,
    messageValidation,
    submitDisabled
  } = props;
  
  let options = listParticipants;

  return (
    <div className="participant-form">

      <div className="form-section">

        <h3>Personal Details</h3>

        <div className="form-group">
          <label>Name</label>
          <InputText validateOnly={true} value={modelParticipant.name} onChange={(e) => updateModelParticipant({field: 'name', value: e.target.value}) } />
        </div>

        <div className="form-group">
          <label>Email</label>
          <InputText value={modelParticipant.email} onChange={(e) => updateModelParticipant({field: 'email', value: e.target.value}) } />
        </div>

        <div className="form-group">
          <label>Position</label>
          <InputText value={modelParticipant.position} onChange={(e) => updateModelParticipant({field: 'position', value: e.target.value}) } />
        </div>
      
      </div>
      
      <div className="form-section">
        <h3>360 Feedback</h3>

        <div className="form-subsection">
          <h4>Self Assessment</h4>
          
          <div className="form-group">
            <Checkbox 
              checked={modelParticipant.self_assessment} 
              onChange={(e) => updateModelParticipant({field: 'self_assessment', value: e.checked}) } >
              </Checkbox>
              <label>Invite yourself to submit a self-assessment</label>
          </div>
        
        </div>
      
        <div className="form-subsection">
          <h4>Feedback providers</h4>
          <h5>You can choose the feedback providers after adding this person, or invite them to choose.</h5>
          
          <div className="form-group">
              <Checkbox 
                checked={modelParticipant.choose_own_feedback_provider} 
                onChange={(e) => updateModelParticipant({field: 'choose_own_feedback_provider', value: e.checked}) } >
              </Checkbox>
              <label>Invite to choose own feedback providers</label>
          </div>
        
          <div className="form-group">
              <Checkbox 
                checked={modelParticipant.feedback_provider_needs_approval} 
                onChange={(e) => updateModelParticipant({field: 'feedback_provider_needs_approval', value: e.checked}) } >
              </Checkbox>
              <label>Their list of feedback providers needs approval</label>
          </div>

        </div>

        <div className="form-subsection">
          <h4>Report reviewer</h4>
          <h5>Adding a report reviewer makes it easy to share the feedback report with (e.g.) their coach or line manager.</h5>
          
          <div className="form-group">
              <label>Report Reviewer</label>
              <Select 
                options={options} 
                getOptionValue={(option) => option.id} 
                getOptionLabel={(option) => option.name + ' - ' + option.position} 
                onChange={(e) => updateModelParticipant({field: 'id_participant_feedback_reviewer', value: e.id}) }
                value={
                  modelParticipant.id_provider_customer_organization && { 
                    value: modelParticipant.id_provider_customer_organization,
                    name: options.find(o => o.id === modelParticipant.id_participant_feedback_reviewer).name,
                  }
                }            
                />

          </div>
        
        </div>

       </div>
      
      <div>
        <Button onClick={handleNewParticipant} className="btn-primary" label="Save"  disabled={submitDisabled} />
        <div className='messageErrors'>{messageValidation}</div>
      </div>

    </div>
  );
};

export default ParticipantForm;