import { Container } from "react-bootstrap";
import { IssueList } from  '../components/IssueList';
import Fetch from '../components/Fetch';
import { useState } from 'react';

export default function Dashboard () {

    const [url, setUrl] = useState('https://chadcodes.me/apps/issuetracker/api/readIssue.php');
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const newurl = createQueryUrl(form);
        console.log(newurl);
        setUrl(newurl);
    }

    const createQueryUrl = (form) => {

        const searchCategory = form.category.value;
        const searchTerm = form.term.value;

        const url = 'https://chadcodes.me/apps/issuetracker/api/search.php?' 
                    + 'category=' + searchCategory
                    + '&term=' + searchTerm;
        return url;        
    }

    const resetUrl = () => {
        setUrl('https://chadcodes.me/apps/issuetracker/api/readIssue.php');
    }

    return (
        <Container>
            <div className='dashboard'>
                <h1 className='mt-5 mb-5'>Dashboard</h1>
                <div>
                <div className='search'>
                    <h3>Search</h3>
                    <form onSubmit={handleSubmit}>
                        <select id='search-by' name='category' className='form-select'>
                            <option value='id'>ID</option>
                            <option value='subject'>Subject</option>
                        </select>
                        <input 
                            type='text'
                            name='term'
                            placeholder='search' 
                            className='form-control'
                        />
                        <button type='submit' className='btn btn-primary'>Search</button>
                    </form>
                    <button onClick={resetUrl} className='btn btn-secondary'>Reset</button>
                </div>
            </div>
                <Fetch 
                    uri={url}
                    renderSuccess={IssueList}
                />
            </div>
        </Container>
    )
}