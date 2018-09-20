import React from 'react';
import { validateEmail } from '../../utils/Tools'
import { InputText } from 'primereact/components/inputtext/InputText';
import { Checkbox } from 'primereact/components/checkbox/Checkbox';
import { AutoComplete } from 'primereact/components/autocomplete/AutoComplete';
import { Button } from 'primereact/components/button/Button';
import Select from 'react-select'

const ProviderCustomerForm = props => {
  const { 
    handleSubmit,
    modelCurrent,
    updateModel,
    messageValidation,
    submitDisabled,
    listProviderCustomerOrganization
  } = props;

  const options = listProviderCustomerOrganization;
  
  return (
    <div className="provider-customer-form">
      
      <div className="form-section">
        <h3>Customer</h3>
        
        <input type="hidden" value={modelCurrent.id} onChange={(e) => updateModel({field: 'id', value: e.target.value}) } />
        
        <div className="form-group">
          <label>Name</label>
          <InputText value={modelCurrent.name} onChange={(e) => updateModel({field: 'name', value: e.target.value}) } />
        </div>
        <div className="form-group">
          <label>Email</label>
          <InputText value={modelCurrent.email} onChange={(e) => updateModel({field: 'email', value: e.target.value}) } />
        </div>
        <div className="form-group">
          <label>Organization</label>
          <Select 
            options={options} 
            getOptionValue={(option) => option.id} 
            getOptionLabel={(option) => option.name} 
            onChange={(e) => updateModel({field: 'id_provider_customer_organization', value: e.id}) }
            value={
              modelCurrent.id_provider_customer_organization && { 
                value: modelCurrent.id_provider_customer_organization,
                name: options.find(o => o.id === modelCurrent.id_provider_customer_organization).name,
              }
            }            
            />
        </div>
      </div>
      
      <div>
        <Button onClick={handleSubmit} className="btn-primary" label="Save"  disabled={submitDisabled} />
        <div className='messageErrors'>{messageValidation}</div>
      </div>

    </div>
  );
};

export default ProviderCustomerForm;