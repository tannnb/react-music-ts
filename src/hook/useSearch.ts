import {useState, useEffect} from 'react'
import {getDefaultSearch} from "../api/Request";

const useSearch = () => {
    const [searchData, setSearchData] = useState<string>('')

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
