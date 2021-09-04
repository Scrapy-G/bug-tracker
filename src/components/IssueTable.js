import { Issue } from './Issue';
import { Row, Col } from 'react-bootstrap';
import Fetch from './Fetch';
import './style/issueTable.css'

export function IssueTable ({ data }) {

    return (
        <div className='issue-table'>
            <Row className='table-head'>
                <Col className='type head'>
                    Type
                </Col>
                <div className='subject head'>
                    Subject
                </div>
                <div className='status head'>
                    Status
                </div>
                <div className='date-created head'>
                    Created
                </div>
                <div className='due-date head'>
                    Due date
                </div>
            </Row>
            <ul className='p-0' style={{listStyle:'none'}}>
                {data.map((item, i) => {
                    return <li key={i}>
                        <Issue 
                            id={item.id}
                            type={item.type}
                            subject={item.subject}
                            status={item.status}
                            created={item.created}
                            description={item.issue}
                        />
                    </li>
                })}
            </ul>
        </div>
    )
}