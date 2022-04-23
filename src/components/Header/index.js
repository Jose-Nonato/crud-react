import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import '../Header/styles.css';

const Header = () => {
    const [activeTab, setActiveTab] = useState('Home');
    const location = useLocation();
    
    useEffect(() => {
        if(location.pathname === "/") {
            setActiveTab('Home');
        } else if(location.pathname === "/add") {
            setActiveTab('AddContact');
        }
    }, [location]);

    return(
        <div className='header'>
            <p className='logo'>José Junior</p>
            <div className='header-right'>
                <Link to='/'>
                    <p 
                        className={`${activeTab === "Home" ? "active" : ""}`}
                        onClick={() => setActiveTab("Home")}
                    >
                        Home
                    </p>
                </Link>
                <Link to="/add">
                    <p 
                        className={`${activeTab === "AddContact" ? "active" : ""}`}
                        onClick={() => setActiveTab("Adicionar Contato")}
                    >
                        Adicionar Contato
                    </p>
                </Link>
            </div>
        </div>
    );
}

export default Header;