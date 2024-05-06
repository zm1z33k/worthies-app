import React, { useContext } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import UserContext from '../contexts/userContext';
import { useNavigate } from 'react-router-dom';

function getUsrerNameById(id){
    if (id == "2f8a5a38876f3b2c8118c31159ccbf65"){
        return "Cal Kestis"
    }else if (id == "bfdf2d5c9b3ea67811459b8a590afb60") {
        return "Bode Akuna"
    } else if (id == "cf0b1cb27518896b2de04145fd8aa5e9") {
        return "Greez Dritus"
    }
}

function NavigationBar() {
    const { user, loginUser, logoutUser } = useContext(UserContext);
    const navigate = useNavigate()

    const handleLogin = (name) => {
        loginUser({ name: name });
    };

    const handleRedirect = (path) => {
        navigate(path)
    }

    return (
        <Navbar className="" style={{ height: "80px", display: "flex", justifyContent: "center", alignItems: "center", padding: "20px" }}>
            <div style={{ position: "absolute", left: "20px" }}>
                <img className='hoverButton' onClick={() => {handleRedirect("/reco")}} src={process.env.PUBLIC_URL + '/worthies_logo.png'} style={{ height: "60px" }} alt="logo"/>
            </div>
            <h1 onClick={() => {handleRedirect("/")}} style={{ fontFamily: "Bahnschrift", fontWeight: "bold", fontSize: "40px", margin: "0px", padding: "0 50px" }}>Worthies</h1>
            <div style={{ position: "absolute", right: "20px", display: "flex", alignItems: "center" }}>
                <Navbar.Collapse id="navbar-dark-example">
                    <Nav>
                        <NavDropdown style={{minWidth: "120px"}}
                            id="nav-dropdown-light-example"
                            title={
                                user ? getUsrerNameById(user.name) : "Select User"
                            }
                            menuVariant="light"
                        >
                            <NavDropdown.Item onClick={() => handleLogin("2f8a5a38876f3b2c8118c31159ccbf65")}>Cal Kestis</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => handleLogin("bfdf2d5c9b3ea67811459b8a590afb60")}>Bode Akuna</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => handleLogin("cf0b1cb27518896b2de04145fd8aa5e9")}>Greez Dritus</NavDropdown.Item>
                            <NavDropdown.Divider/>
                            <NavDropdown.Item onClick={() => handleRedirect("/profile")}>Profile</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => handleRedirect("/watchlist")}>Watchlist</NavDropdown.Item>
                            <NavDropdown.Divider/>
                            <NavDropdown.Item onClick={() => logoutUser()}>Logout</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
                {/*<img src="./burger.png" style={{ height: "50px", marginLeft: "10px" }} alt="menu"/>*/}
            </div>
        </Navbar>
    );
}

export default NavigationBar;