import { useState } from "react";

/**
 * Async dropdown menu. Updates database on each change.
 */
export function ChangeStatus({ issueId, statusHTML, statusData }) {

    //http://localhost/bugtracker/api/updateStatus.php
    const [error, setError] = useState(false);

    async function handleSubmit (e) {
        
        e.preventDefault();
        const [newStatusId, newStatusDescription] = e.target.status.value.split('-');        
        const isStatusUpdated = await updateStatus(issueId, newStatusId);
        
        if(isStatusUpdated){
            statusHTML.current.innerHTML = newStatusDescription;
            statusHTML.current.className = 'status type-color ' + newStatusDescription;
            setError(false);
        }else
            setError(true);
        // changeStatus(status);
    
    }  

    const updateStatus = (issueId, newStatus) => {
        
        const statusObj = {
            id: issueId,
            status_id: newStatus
        }

        return fetch('https://chadcodes.me/apps/issuetracker/api/updateStatus.php',
        {
            method: 'post',
            headers: new Headers({
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }),
            body: JSON.stringify(statusObj)
        })
        .then(response => response.json())
        .then(response => {
            if(response.success)
                return true;
            return false;
        })
        .catch(() => false);
    }

    return (
        <div className='status-buttons'>
            <form className='button-wrap' onSubmit={handleSubmit}>
                {statusData.map((item, i) => {
                    return <li key={i}>
                        <input 
                            id={'button-' + item.id} 
                            className='hidden radio-label'                         
                            type="radio"  
                            name="status" 
                            value={item.id + '-' + item.description}
                        />
                        <label className='button-label' htmlFor={'button-' + item.id}>{item.description}</label>
                    </li>
                })}
                {error ? <span className='text-danger alert'>Error updating!</span>
                    : <span className='text-success alert'>Updated</span>}
                <div className='d-flex justify-content-end pt-2'>
                    <input type='submit' value='Change Status' />
                </div>
            </form>
        </div>
    );
}