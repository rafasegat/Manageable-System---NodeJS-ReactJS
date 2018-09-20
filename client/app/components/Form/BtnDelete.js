import React from 'react';

const BtnDelete = props => {

    const id = props.row.original.id;

    return (
        <div className="btn-delete">
            { props.showTooltip==id &&
                <div id={'tooltip-yes-no-'+id} className="tooltip-yes-no">
                    Are you sure?
                    <span className="tooltip-yes" onClick={event => props.handleDelete(id)}>Yes</span>
                    <span className="tooltip-no" onClick={event => props.handleTooltip(-1)} >Cancel</span>
                </div>
            }
            <i className="far fa-trash-alt btn-icon" 
               onClick={event => props.handleTooltip(id)}></i>
        </div>
    );
};

export default BtnDelete;