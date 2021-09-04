import { Container, Row, Col } from "react-bootstrap";
import { IssueTable } from  '../components/IssueTable';
import Fetch from '../components/Fetch';
export default function Dashboard () {
    
    return (
        <Container>
            <Row className='dashboard'>
                <Col>
                    <h1 className='mt-5 mb-5'>Dashboard</h1>
                    <Fetch 
                        uri={'http://localhost/bugtracker/?issues'}
                        renderSuccess={IssueTable}
                    />
                </Col>
            </Row>
        </Container>
    )
}