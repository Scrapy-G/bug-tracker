import { Row, Col, Button } from "react-bootstrap";
import { useState, useEffect, useReducer } from 'react';
import { useFetch } from "./useFetch";

export function Logs ({ id }) {

    const [logs, setLogs] = useState([]);
    const [input, setInput] = useState("");

    useEffect(() => {
        fetch(`http://localhost/bugtracker/?logs=${id}`)
        .then(response => response.json())
        .then(setLogs)
        .catch((e) => console.log(e));
    }, [id]);

    const renderLog = () => {
        if(logs.length > 0)
            return (
                <div className='mb-4 mt-4 log-container'>
                    {logs.map((log, i) => {
                        return (
                            <Row key={i} className='mb-2'>
                                <Col sm={2}>
                                    {log.date}
                                </Col>
                                <Col sm={10}>
                                    {log.note}
                                </Col>
                            </Row>
                        );
                    })}
                </div>
            );

        return <div className='mb-4 mt-4 log-container'>
            <i>...Log is empty...</i>
        </div>
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        formData.append('bug', id);
        fetch('http://localhost/bugtracker/',
            {
                method: 'post',
                body: formData
            })
        .then(response => response.json())
        .then(response => setLogs([...logs, response]))
        .then(setInput(''))
        .catch(e => console.log(e));
    }

    return (
        <div className='logs mb-4 mt-4'>
            <h3>Logs</h3>
            {renderLog()}
            <form onSubmit={handleSubmit}>
                <textarea rows={5} style={{width: '400px'}}
                    name='log' 
                    value={input} 
                    onChange={e => setInput(e.target.value)}
                ></textarea>
                <br /><Button type='submit'>Submit</Button>
            </form>
        </div>
    );
}