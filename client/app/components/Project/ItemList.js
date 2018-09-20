import React from 'react';
import {Link } from "react-router-dom";

const ItemList = props => {
    let { value } = props;
    return(
        <li key={value.id} >
            {/* <Link to={'/participants/'+value.id}>{value.name}</Link> */}
            <Link to="#" onClick={() => props.redirectParticipants(value.id)}>
                    {value.name}
            </Link>
        </li>
    );
}

export default ItemList;