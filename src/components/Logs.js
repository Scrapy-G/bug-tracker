import { Button } from "react-bootstrap";
import { useState, useReducer } from 'react';

export function Logs ({ id, data }) {
    
    const [log, setLogs] = useReducer((oldLog, newLog) => [...oldLog, newLog], data.error ? [] : data);
    const [input, setInput] = useState("");
    const [error, setError] = useState();


    const postLog = (log) => {

        return fetch('https://chadcodes.me/apps/issuetracker/api/postLog.php',
        {
            method: 'post',
            headers: new Headers({
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }),
            body: log
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

    async function handleSubmit (e) {
        e.preventDefault();

        const log = JSON.stringify({
            'id': id, 
            'note': input
        })

        const result = await postLog(log);
   
        if(result.success){
            setLogs(result.data);
            setInput('');
            setError(null);
        }else {
            setError(result.error);
        }
       
    }

    const renderLog = () => {
        if(log.length > 0)
            return (
                <div className='mb-4 log-container'>
                    {log.map((log, i) => {
                        const { day, year, month, hour, minute} = log.date;
                        return (
                            <div key={i} className='mb-2 log-item'>
                                <p className='datetime'>
                                    {month}/{day}/{year} | {hour}:{minute}
                                </p>
                                <p className='note'>{log.note}</p>                            
                            </div>
                        );
                    })}
                </div>
            );

        return <div className='mb-4 mt-4 log-container'>
            <i>...Log is empty...</i>
        </div>
    }

    return (
        <div className='logs mb-4 mt-4'>
            <h5>Logs</h5>
            {renderLog()}
            <form onSubmit={handleSubmit}>
                <textarea 
                    rows={5}
                    name='log' 
                    value={input} 
                    onChange={e => setInput(e.target.value)}
                ></textarea>
                <br /><Button type='submit'>Add log</Button>
            </form>
            {error && <div className='alert alert-danger'>{error}</div>}
        </div>
    );
}