import { useContext } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, Redirect } from 'react-router-dom';
import { authContext } from "../App";

export function Header () {

    const { isAuth, logout } = useContext(authContext);

    return (
        <Navbar>
            <Container>
                <Navbar.Brand>
                    <Link to='/'>BugTracker</Link>
                </Navbar.Brand>
                <Navbar.Collapse className="justify-content-end">
                    {isAuth && <>
                        <span>
                            <Link to='/'>Dashboard</Link>
                        </span>
                        <span>
                            <a onClick={logout} href="#">Logout</a>
                        </span>                        
                        </>
                    ||
                        <span>
                            <Link to='/login'><span>Log In</span></Link>
                        </span>
                    }
                    <Link to='/report'>
                        <button className='btn primary-button' >Report Issue</button>
                    </Link>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}