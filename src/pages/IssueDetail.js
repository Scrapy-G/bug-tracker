import { Container, Col } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import { Logs } from '../components/Logs';
import { ChangeStatus } from '../components/ChangeStatus';
import { useRef } from "react";
import Fetch from "../components/Fetch";

export default function IssueDetail () {

    const { id } = useParams();
    const status = useRef(); //to update status

    const renderIssueDetail = (data) => {

        const issueInfo = data.data;
        
        return (
            <Container fluid className='issue-detail p-0'>        
                <div className={'page-title pt-4 pb-4 ' + issueInfo.type}>
                    <Container>
                        <Link to={`${process.env.PUBLIC_URL}/dashbard`}>Back to Dashboard</Link>
                        <h1>{issueInfo.subject}</h1>
                        <p>ID: {id}</p>
                    </Container>
                </div>  
                <Container>
                    <div className='detail-items'>                    
                        <Col xs={12}>
                            <h5>Type</h5>
                            <p className={'issue-type type-color ' + issueInfo.type}>{issueInfo.type}</p>
                        </Col>
                        <Col xs={12}>
                            <h5>Status</h5>
                            <p ref={status} className={'status type-color ' + issueInfo.status}>{issueInfo.status}</p>
                            <Fetch 
                                uri='https://chadcodes.me/apps/issuetracker/api/readStatus.php'
                                renderSuccess={(data) => <ChangeStatus issueId={id} statusData={data.data} statusHTML={status}/>}
                            />
                        </Col>
                        <Col xs={12}>
                            <h5>Description</h5>
                            <p className='lead'>{issueInfo.description}</p>
                        </Col>
                        <Fetch 
                            uri={`https://chadcodes.me/apps/issuetracker/api/readLog.php?id=${id}`} 
                            renderSuccess={(data) => <Logs data={data.data} id={id}/>}
                        />
        
                    </div>
                </Container>
            </Container>
        )
    }

    return (
        <Fetch 
            uri={`https://chadcodes.me/apps/issuetracker/api/readIssue.php?id=${id}`} 
            renderSuccess={renderIssueDetail}
        />
    );
}