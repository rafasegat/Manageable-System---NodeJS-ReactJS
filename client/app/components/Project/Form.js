import React from 'react';
import {InputText} from 'primereact/components/inputtext/InputText';
import {Button} from 'primereact/components/button/Button';

const ProjectForm = props => {
  const { 
    modelProject,
    updateModelProject,
    handleSubmit,
    messageValidation,
    submitDisabled
  } = props;
  
  return (
    <div className="project-form">
      
      <div className="form-group">
        <label>Name</label>
        <InputText id="name" value={modelProject.name} onChange={(e) => updateModelProject({field: 'name', value: e.target.value}) } />
      </div>

      <div>
        <Button onClick={handleSubmit} className="btn-primary" type="submit" label="Save" disabled={submitDisabled} />
        <div className='messageErrors'>{messageValidation}</div>
      </div>

    </div>
  );
};

export default ProjectForm;
