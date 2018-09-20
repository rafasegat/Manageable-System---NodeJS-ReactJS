import React from 'react';
import { Link } from "react-router-dom";

const Sidebar = () => (
    <div className="sidebar">
        <div className="sidebar-core">
            <ul className="sidebar-menu">
                <li>
                    <Link to={'participants'} >Participants</Link>
                </li>
                <li>
                    Providers <i className="fas fa-angle-down"></i>
                    <ul className="sidebar-sub-menu">
                        <li>
                            <Link to={'provider-customers'} >External Customers</Link>
                        </li>
                        <li>
                            <Link to={'provider-customers-organization'} >External Customers Organization</Link>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
);

export default Sidebar;
