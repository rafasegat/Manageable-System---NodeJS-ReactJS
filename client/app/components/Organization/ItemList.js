import React from 'react';
import { Link } from "react-router-dom";

const ItemList = props => {
    let { value } = props;

    return(
        <li key={value.id} >
            <Link to={'/projects/'+value.id}>{value.name}</Link>
        </li>
    );
}

export default ItemList;