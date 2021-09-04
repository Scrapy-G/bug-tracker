import { useRef, useState } from "react";
import { useFetch } from "./useFetch";

/**
 * Async dropdown menu. Updates database on each change.
 * @param {issueId, currentStatus} id of entry, currentStatus dropdown currently selected option
 * @returns 
 */
export function ChangeStatus({ issueId, currentStatus }) {

    //for list of statuses
    const { loading, data, error} = useFetch('http://localhost/bugtracker/?statuslist=1');
    const [ status, setStatus ] = useState(issueId);
    const [ statusChangeError, setStatusError ] = useState(false);

    if(loading)
        return <p>Loading...</p>

    if(error) 
        return  <p>Error occurred! Try again later. </p>

    const handleChange = (e) => {
        const newStatus = e.target.value;

        fetch(`http://localhost/bugtracker/?update=${issueId}&status=${newStatus}`)
        .then(response => response.json())
        .then(setStatus(e.target.value))
        .catch((e)=> {
            console.log(e);
            setStatusError(true)
            //display error message in dropdown
            e.target.value = 'none';
        });
    }

    return (
        <select 
            className={'form-select ' + (statusChangeError === true ? 'alert-danger' : 'alert-success')} 
            name='status'
            defaultValue={currentStatus}
            onChange={handleChange}
        >
            {data.map((status, i) => {
                return <option key={i} value={status.id}>
                    {status.description}
                </option>
            })}     
            <option 
                value='none'
                className='alert-danger'
                hidden
            >Error occurred!</option>       
        </select>
    );
}