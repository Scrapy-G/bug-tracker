import { useContext, useState } from "react"
import { MdSettingsApplications } from "react-icons/md";
import { Redirect } from "react-router";
import { authContext } from '../App';

export function Login ({ setAuth }) {

    const [username, setUsername] = useState('');
    const [pass, setPass] = useState('');
    const [failed, setFail] = useState();
    const {isAuth, authenticate} = useContext(authContext);

    const [session, setSession] = useState();

    if(isAuth) return <Redirect to='/' />

    async function handleSubmit () {
        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', pass);
        
        const authPromise = await authenticate(formData);
        // setFail(!isAuth);
    }    

    const getSession = () => {
        fetch('http://localhost/bugtracker/session.php')
        .then(res => res.text())
        .then(setSession)
        .then(console.log(session))
    }

    const checkSession = () => {
        fetch('http://localhost/bugtracker/testsession.php')
        .then(res => res.text())
        .then(console.log);
    }

    return (
        <div className='login'>
            <h1>Login</h1>
            <label htmlFor='username'>Username</label>
            <input 
                id='username' 
                type='text' 
                value={username}
                onChange={e => setUsername(e.target.value)}
            />
            <label htmlFor='password'>Password</label>
            <input 
                id='password' 
                type='password' 
                value={pass}
                onChange={e => setPass(e.target.value)}
            />
            <button className='btn primary-button' onClick={handleSubmit}>Login</button>
            {failed && <div className='alert alert-danger mt-4'>Username/password invalid</div>}
        </div>
    )
}