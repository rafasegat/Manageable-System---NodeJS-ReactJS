import React from 'react';
import {AutoComplete} from 'primereact/components/autocomplete/AutoComplete';
import {SelectButton} from 'primereact/components/selectbutton/SelectButton';
import {InputText} from 'primereact/components/inputtext/InputText';
import {Button} from 'primereact/components/button/Button';
import Select from '../../components/Form/Select';
import {relationship_provider, relationship_provider_info} from '../../flux/provider/ProviderAction';

const AddProviderForm = props => {

  const { 
    handleSubmitAddProvider,
    modelProvider,
    updateDataProvider,
    messageValidation,
    submitDisabled,
  } = props;
  
  return (
    <div className="form-add-provider">

      <div className="form-section">
        <div className="form-subsection row">

          <h3>Add new provider</h3>

          <div className="form-group  col-lg-12">
            <label>Relationship</label>
            <Select  id="relationship" options={relationship_provider} value={modelProvider.relationship} onChange={ (e) => { updateDataProvider({field: 'relationship', value: e.target.value}) } } />
          </div>
          
          {  (
              modelProvider.relationship != 1 && // Self Assessement
              modelProvider.relationship != 5 && // Customer
              modelProvider.relationship != 6    // Supplier
             )  &&
          
              <div className="form-group col-lg-12">
                <label>Participant</label>
                <select id="id_provider" 
                        value={modelProvider.id_provider || ''} 
                        onChange={ (e) => { updateDataProvider({field: 'id_provider', value: e.target.value}) } }>
                  <option value='' disabled>Select the Participant Provider</option>
                {
                  props.participantProviderOptions.map((value) =>
                    <option key={value.id} value={value.id}>
                      {value.name + ' - ' + value.position}
                    </option>
                  )
                }
                </select>
              </div>
          }
          
          {  
              (
               modelProvider.relationship == relationship_provider_info.customer.key || // Customer
               modelProvider.relationship == relationship_provider_info.supplier.key    // Supplier 
              ) && 
              
              <div className="col-lg-12">

                <div className="form-group">
                  <label>Name</label>
                  <InputText value={modelProvider.external_name} 
                  onChange={(e) => updateDataProvider({field: 'external_name', value: e.target.value}) } />
                </div>

                <div className="form-group">
                  <label>Email</label>
                  <InputText value={modelProvider.external_email} 
                  onChange={(e) => updateDataProvider({field: 'external_email', value: e.target.value}) } />
                </div>

              </div>
          }
          

          <div className="col-lg-12">
            <Button className="btn-primary" onClick={handleSubmitAddProvider} label="Add" disabled={submitDisabled}/>
            <div className='messageErrors'>{messageValidation}</div>
          </div>
        
        </div>

      </div>
    
    </div>
  );
};

export default AddProviderForm;
