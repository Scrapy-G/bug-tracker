export function Issue ({ id, type='generic', subject, status, created, dueDate='N/A', description }) {
  
    const { month, year, day } = created;
    return (
        <div className='issue'>
            <div className={'type-color ' + type}></div>
            <h3 className='clipped'>{subject}</h3>
            <div className='description clipped mb-2'>{description}</div>
            <div className={'status mb-2 ' + status}>{status}</div>
            <p className='date'>{month}/{day}/{year}</p>
            
        </div>
    )
}