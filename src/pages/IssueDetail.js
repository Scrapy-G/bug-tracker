import { Button } from "react-bootstrap";
import { Container, Row, Col } from "react-bootstrap";
import { useParams, Redirect } from "react-router-dom";
import { Logs } from '../components/Logs';
import { useFetch } from "../components/useFetch";
import { ChangeStatus } from '../components/ChangeStatus';
import Loader from "react-loader-spinner";
import { useContext } from "react";
import { authContext } from "../App";

export default function IssueDetail () {
    
    const { id } = useParams();
    const { loading, error, data } = useFetch(`http://localhost/bugtracker/?issues=1&id=${id}`);

    if(loading) return (
        <Loader 
        type="ThreeDots"
        color="white"
        height={20}
        width={50}
    />);

    //HANDLE ERROR HERE

    return (
        <Container className='issue-detail pb-4'>
            <Row>
                <Col className='page-title'>
                    <h1 className='mt-4'>Issue Detail</h1>
                    <p>ID: {id}</p>
                </Col>
            </Row>
            <div className='detail-table'>
                <Row>
                    <Col sm={3}>
                        Type
                    </Col>
                    <Col sm={9}>
                        <div className='pill round'>{data.type}</div>
                    </Col>
                </Row>
                <Row>
                    <Col sm={3}>
                        Status
                    </Col>
                    <Col sm={9}>
                        <ChangeStatus issueId={id} currentStatus={data.status_id}/>
                    </Col>
                </Row>
                <Row>
                    <Col sm={3}>
                        Subject
                    </Col>
                    <Col sm={9}>
                        {data.subject}
                    </Col>
                </Row>
                <Row>
                    <Col sm={3}>
                        Description
                    </Col>
                    <Col sm={9}>
                        {data.issue}
                    </Col>
                </Row>
            </div>
            <Logs id={id} />
        </Container>
    )
}