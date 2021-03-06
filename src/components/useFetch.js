import { useState, useEffect } from "react";

export function useFetch(uri) {
    const [data, setData] = useState();
    const [error, setError] = useState();
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        if (!uri) return;
        fetch(uri, {
            //include locally stored header
            headers: new Headers({'Authorization': 'Bearer ' + localStorage.getItem('token')})
        })
        .then(data => data.json())
        .then(setData)
        .then(() => setLoading(false))
        .catch(e => {console.log(e); setError(e)});
    }, [uri]);

    return {
        loading,
        data,
        error
    };
}