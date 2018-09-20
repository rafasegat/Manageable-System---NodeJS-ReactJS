import React from 'react';
import ReactTable from "react-table";
import { relationship_provider } from '../../flux/provider/ProviderAction';

const ProviderList = (props) => {
    const { 
        listProviders
    } = props;

    return(
        <div className="providers">
            <ReactTable
                data={listProviders}
                columns={[
                {
                    Header: "Feedback Provider",
                    accessor: "name"
                    
                },
                {
                    Header: "Relationship",
                    accessor: "provider_relationship",
                    width: 150,
                    Cell: row => (
                        <span>
                            { relationship_provider.filter(e =>  row.value == e.key)[0].value }
                        </span>
                      )
                },
                {
                    Header: "Status",
                    accessor: "provider_status",
                    width: 100,
                    Cell: row => (
                        <span>
                          <span style={{
                            color: row.value === 1 ? '#ffbf00'
                                 : row.value === 2 ? '#ff2e00'
                                 : '#57d500',
                            transition: 'all .3s ease'
                            }}>
                            &#x25cf;&nbsp;
                            </span> 
                            {
                              row.value === 1 ? 'Invited'
                            : row.value === 2 ? 'Responded'
                            : '--'
                            }
                        </span>
                      )
                },
                {
                    Header: "Action",
                    accessor: "id",
                    width: 100,
                    Cell: row => (
                        <i className="far fa-trash-alt btn-icon" onClick={event => props.handleDeleteProvider(row.original.pk_id_provider)}></i>
                    )
                },
                ]}
                defaultPageSize={5}
                className="-striped -highlight"
            />

        </div>
           
    );

}

export default ProviderList;