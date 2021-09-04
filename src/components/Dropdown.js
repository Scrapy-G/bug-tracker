import { useFetch } from "./useFetch";
import Loader from 'react-loader-spinner';

/**
 * Renders a dropdown of list items retrieved from uri. Value is item id
 * @param {*} uri, handleError 
 * @returns select component
 */

export function Dropdown ({ uri, handleError = f => f }) {

    const {loading, data, error} = useFetch( uri );

    if(error) {
        handleError(error);
        console.log(error);
        return <pre>Error occurred</pre>;
    }

    if(loading)
        return (
            <Loader 
                type="ThreeDots"
                color="white"
                height={20}
                width={50}
            />
        );


    return (
        <select name='issue-type' className='form-select' data-style='btn-success'>
            {data.map((item, i) => {
                return <option key={i} value={item.id}>
                        {item.description}
                    </option>
                
            })}
        </select>
    );
}