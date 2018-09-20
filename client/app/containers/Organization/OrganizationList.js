import React from 'react';
import ItemList from '../../components/Organization/ItemList';

const OrganizationList = (props) => {

    const { 
        list,
        openModal
    } = props;

    return(
        <div className="organizations">
            {list!=undefined && list.length > 0 ? 
                <ul className="organization-list">
                    {
                        list.map((value) => 
                            <ItemList 
                                value={value} 
                                key={value.id} 
                            />
                        )
                    }
                </ul>
            :
                <div>No organization. Create the first one!</div>
            } 
            
            <button className="btn-primary" onClick={openModal}>Create new organization</button>
            
        </div>
    );

}

export default OrganizationList;