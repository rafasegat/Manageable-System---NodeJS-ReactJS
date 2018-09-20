import React from 'react';

const Select = props => {
    const {
     id,
     options,
     onChange,
     value
    } = props;
    
    return(
        <select id={id} value={value} onChange={onChange}>
        {
          options.map((value) =>
            <option key={value.key} value={value.key}>{value.value}</option>
          )
        }
        </select>
    );
};

export default Select;
