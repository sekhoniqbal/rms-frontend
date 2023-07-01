import { useEffect, useState } from "react";

export default function useFetch(fetch, watchfor=[]){
    const[inProgress, setInProgress]= useState(false);
    const [data, setData] = useState();
    const [error, setError] = useState();

    useEffect(() => {
        setInProgress(true);
        fetch()
            .then(response =>  setData(response.data))
            .catch(error => setError(error.response?.data?.error || error.response?.data?.message || error?.message))
            .finally(()=>setInProgress(false))
    }, watchfor)
    return [inProgress, error, data, setData];
}