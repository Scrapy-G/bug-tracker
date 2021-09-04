import { Link } from 'react-router-dom';
import { MdOpenInNew } from 'react-icons/md';

export function Issue ({ id, type='generic', subject, status, created, dueDate='N/A', description }) {

    const dateCreated = created.split(" ")[0];    

    return (
        <div className='issue p-2'>
            <div className='d-flex'>
                <div className='icon'>
                    <Link to={`issue/${id}`}><MdOpenInNew /></Link>
                </div>
                <div className='type'>
                    <div className='round pill'>{type}</div>
                </div>
                <div className='subject' sm={4}>
                    {subject}
                </div>
                <div className='status'>
                    <div className='round pill'>{status}</div>
                </div>
                <div className='date-created'>
                    {dateCreated}
                </div>
                <div className='due-date'>
                    {dueDate}
                </div>
            </div>
        </div>
    )
}