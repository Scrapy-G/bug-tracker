import { Issue } from './Issue';
import { Link } from 'react-router-dom';

export function IssueList ({ data }) {

    if(data.length === 0)
        return <div>No issues...</div>

    if(data.error)
        return <div>{data.error}</div>
        
    return (
        <div className='issue-list'>
            <ul className='p-0' style={{listStyle:'none'}}>
                {data.map((item, i) => 
                     <li key={i}>
                        <Link to={'/issue/' + item.id}>
                            <Issue 
                                id={item.id}
                                type={item.type}
                                subject={item.subject}
                                status={item.status}
                                created={item.created}
                                description={item.description}
                            />
                        </Link>
                    </li>
                )}
            </ul>
        </div>
    )
}