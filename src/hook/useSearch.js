import React, {useState, useEffect} from 'react'
import {getDefaultSearch} from "../api/Request";

const useSearch = () => {
    const [searchData, setSearchData] = useState()

    useEffect(() => {
        const fetchSearch = async () => {
            let {data} = await getDefaultSearch()
            let result = data['showKeyword'] || data['realkeyword']
            setSearchData(result)
        }
        fetchSearch()
    }, [])

    return searchData
}


export default useSearch
