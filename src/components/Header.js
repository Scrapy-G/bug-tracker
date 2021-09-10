import { useContext } from "react";
import { Container, Navbar } from "react-bootstrap";
import { Link, useHistory } from 'react-router-dom';
import { authContext } from "../App";

export function Header () {

    const { user, setUser } = useContext(authContext);
    const history = useHistory();

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        history.push(`${process.env.PUBLIC_URL}/login`);
    }

    return (
        <Navbar>
            <Container>
                <Navbar.Brand className='brand'>
                    <Link to={`${process.env.PUBLIC_URL}/dashbard`}>BugTracker</Link>
                </Navbar.Brand>
                <Navbar.Collapse className="justify-content-end">
                    {/* different options in header if user is already logged in */}
                    {user ? <>
                        <Navbar.Text>
                            <Link to={`${process.env.PUBLIC_URL}/dashboard`}>Dashboard</Link>
                        </Navbar.Text>
                        <Navbar.Text>
                            <button className='btn btn-secondary'onClick={logout}>Logout</button>
                        </Navbar.Text>                       
                        </>
                    :
                        <Navbar.Text>
                            <Link to={`${process.env.PUBLIC_URL}/login`}>Log In</Link>
                        </Navbar.Text>
                    }
                    <Link to='/report'>
                        <button className='btn primary-button' >Report</button>
                    </Link>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}