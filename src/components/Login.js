import { useContext, useState } from "react"
import { Redirect } from "react-router-dom";
import { authContext } from '../App';

export function Login () {

    //controlled inputs
    const [username, setUsername] = useState('');
    const [password, setPass] = useState('');

    const [errorMessage, setErrorMessage] = useState();
    const { user, setUser } = useContext(authContext);

    //already signed in
    if(user) return <Redirect to='/dashboard' />

    async function authenticate(user, pass) {

        const login = {
            username: user,
            password: pass
        }

        const result = await verifyLogin(login);

        if(result.error){
            setErrorMessage(result.error);
        }else {
            storeSession(result.token);
            setUser(user);
        }
    }

    const storeSession = (token) => {
        localStorage.setItem('token', token);
        return true;
    }    

    const verifyLogin = (login) => {

        return fetch("https://chadcodes.me/apps/issuetracker/authenticate.php", {
            method: 'post',
            body: JSON.stringify(login)
        })
        .then(response => response.json())
        .then(response => {
            return response;
        })
        .catch(e => {
            return {
                error: e.message
            }
        });
    }

    return (
        <div className='login'>
            <h1>Login</h1>
            <div className='credentials'>
                <h5>Test login</h5>
                <p>username: user</p>
                <p>password: password</p>
            </div>            
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
                value={password}
                onChange={e => setPass(e.target.value)}
            />
            <button className='btn primary-button' onClick={() => authenticate(username, password)}>Login</button>
            {errorMessage && <div className='alert alert-danger mt-4'>{errorMessage}</div>}
        </div>
    )
}