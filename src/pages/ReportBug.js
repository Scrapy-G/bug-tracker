import { Row, Col, Container, Button } from 'react-bootstrap';
import { useState } from 'react';
import Fetch from '../components/Fetch';

export default function ReportBug () {

    const [message, setMessage] = useState();

    const renderMessage = () => {
        if(message.error){
            return (
                <div className='alert alert-danger'>
                    <strong>Error!</strong> {message.error}
                </div>
            );
        }else {
            return (
                <div id='alert' className='alert alert-success'>
                    <strong>Submitted!</strong> Issue ID: {message.id}
                </div>
            );
        }     
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target
        
        const issue = JSON.stringify({
            subject: form.subject.value,
            type: form.type.value,
            description: form.description.value
        });

        const result = await postIssue(issue);

        setMessage(result);
    }

    const postIssue = (issue) => {
        
        return fetch('https://chadcodes.me/apps/issuetracker/api/postIssue.php',
        {
            method: 'post',
            headers: new Headers({
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }),
            body: issue
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

    const renderDropdown = ( data ) => {
        const types = data.data;
        return (
            <select name='type' className='form-select'>
                {types.map((type, i) => {
                    return <option key={i} value={type.id}>
                            {type.description}
                        </option>
                    
                })}
            </select>
        )
    }

    return (
        <Container>
            <h1 className='mt-4 mb-4'>Report Bug</h1>           
            <form className='report-form' onSubmit={handleSubmit}>
                <Row className='pb-3'>
                    <Col sm={3}>
                        Subject
                    </Col>
                    <Col sm={9}>
                        <input 
                            type='text' 
                            name='subject' 
                            className='form-control'
                            placeholder='Subject'
                            required
                        />
                    </Col>
                </Row>
                <Row className='pb-3'>
                    <Col md={3}>
                        Type
                    </Col>
                    <Col md={9}>
                        <Fetch
                            uri='https://chadcodes.me/apps/issuetracker/api/readTypes.php'
                            renderSuccess={renderDropdown}
                        />
                    </Col>
                </Row>
                <Row className='pb-3'>
                    <Col md={3}>
                        Description
                    </Col>
                    <Col md={9}>
                        <textarea 
                            name='description' 
                            className='form-control'
                            placeholder='Description'
                            required
                        ></textarea>
                    </Col>
                </Row>
                <div className='d-flex justify-content-end'>
                    <Button type='submit'>Submit</Button>   
                </div>
                {message && renderMessage()}                
            </form>
        </Container>
    )
}