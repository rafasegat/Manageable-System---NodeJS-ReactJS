import React from 'react';
import ReactTable from "react-table";
import BtnDelete from '../../components/Form/BtnDelete';
import BtnEdit from '../../components/Form/BtnEdit';

const ProviderCustomerOrganizationList = (props) => {
    const { 
        list,
        handleNew,
        handleEdit,
        handleDelete,
        handleTooltip,
        showTooltip
    } = props;
    
    return(
        <div className="provider-customer-organization">
            {list!=undefined && list.length > 0  ? 
               <div>
                    <ReactTable
                        data={list}
                        columns={[
                        {
                            Header: "Name",
                            accessor: "name"
                        },
                        {
                            Header: "Action",
                            accessor: "",
                            width: 75,
                            Cell: row => (
                                <div className="btn-action">
                                    <BtnEdit handleEdit={handleEdit} param={row.original.id}/>
                                    <BtnDelete 
                                        handleDelete={handleDelete} 
                                        handleTooltip={handleTooltip} 
                                        showTooltip={showTooltip}
                                        row={row}/>
                                </div>
                            )
                        }
                            
                        ]}
                        defaultPageSize={10}
                        className="-striped -highlight"
                        getTdProps={(state, rowInfo, column, instance) => {
                            return {
                              onClick: (e, handleOriginal) => {
                                if(column.Header=='Action')
                                    return;
                                if(typeof rowInfo !== 'undefined')
                                    props.handleEdit(rowInfo.original.id);
                              }
                            }
                        }}
                    />
                </div>
            :
                <div>No data. Create the first one!</div>
            }
            <button className="btn-primary" onClick={handleNew}>NEW</button>
        </div>
    );

}

export default ProviderCustomerOrganizationList;