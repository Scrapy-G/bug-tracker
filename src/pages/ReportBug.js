import { Row, Col, Container, Button } from 'react-bootstrap';
import { Dropdown } from '../components/Dropdown';
import { useReducer, useState } from 'react';

export default function ReportBug () {

    const [message, setMessage] = useState("");
    const [showMessage, setShowMessage] = useState(false);

    const renderMessage = () => {
        if(message.error){
            console.log(message);
            return (
                <div className='alert alert-danger'>
                    <strong>Error!</strong> {message.error} - Try again later...
                </div>
            );
        }else {
            return (
                <div id='alert' className='alert alert-success'>
                    <strong>Submitted!</strong> ID: {message.id}
                </div>
            );
        }     
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        
        fetch('http://localhost/bugtracker/', {
            method: 'post',
            body: formData
        })
        .then(response => response.json())
        .then(setMessage)
        .then(setShowMessage(true))
        .then(e.target.reset())
        .catch(e => setMessage(e));
    }

    return (
        <Container>
            <h1 className='mt-4 mb-4'>Report Bug</h1>           
            <form className='report-form' onSubmit={handleSubmit}>
                <Row>
                    <Col sm={3}>
                        Subject
                    </Col>
                    <Col sm={9}>
                        <input 
                            type='text' 
                            name='issue-subject' 
                            className='form-control'
                            placeholder='subject'
                            required
                        />
                    </Col>
                </Row>
                <Row>
                    <Col md={3}>
                        Type
                    </Col>
                    <Col md={9}>
                        <Dropdown uri={'http://localhost/bugtracker/?typelist=1'}/>
                    </Col>
                </Row>
                <Row>
                    <Col md={3}>
                        Description
                    </Col>
                    <Col md={9}>
                        <textarea 
                            name='issue-description' 
                            className='form-control'
                            placeholder='subject'
                            required
                        ></textarea>
                    </Col>
                </Row>
                <div className='d-flex justify-content-end'>
                    <Button type='submit'>Submit</Button>   
                </div>
                {showMessage && renderMessage()}                
            </form>
        </Container>
    )
}