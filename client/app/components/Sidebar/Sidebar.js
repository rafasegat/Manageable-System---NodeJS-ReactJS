import React from 'react';

const Sidebar = (props) => {
    <sidebar className="sidebar">
        <ul className="sidebar-menu">
            <li className="item">
                <Link to={'/participants/'+value.id}>{value.name}</Link>
            </li>
        </ul>
    </sidebar>
}

export default Sidebar;