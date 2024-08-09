import {  useEffect, useState } from "react";
import { fetcher } from "../axios.conf";

export function useFetch(url, deps) {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetcher.get(url).then(res => {
            setData(res.data);
            setIsLoading(false);
        })
            .catch(err => { setError(err.response.data); setIsLoading(false) })
    }, [isLoading])

    return { data, error, isLoading, setData }
}