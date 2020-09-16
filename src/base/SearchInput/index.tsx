import React, {useEffect, useRef, useState} from 'react'
import {debounce} from 'lodash'
import {CloseOne, Search} from "@icon-park/react";
import useSearch from "../../hook/useSearch";

interface SearchInputProps {
    onChange?: (e: string) => void;
    delay?: number
}

const SearchInput: React.FC<SearchInputProps> = props => {
    const {onChange, delay = 300} = props
    const searchData = useSearch()

    const [searchTxt, setSearchTxt] = useState<string | any>('')
    const throttled = useRef(debounce(data => onChange!(data), delay))
    useEffect(() => {
        searchTxt && throttled.current(searchTxt)
    }, [searchTxt])

    const renderClose = () => (<CloseOne onClick={handleClose} theme="outline" size="18" fill="#929292"/>)

    const handleClose = () => setSearchTxt('')

    const handleChangeInput = (e: React.FormEvent<HTMLInputElement>) => setSearchTxt(e.currentTarget.value)

    return (
        <div className='search-wrapper-input'>
            <Search theme="outline" size="18" fill="#929292"/>
            <input className='oInput'
                   value={searchTxt}
                   placeholder={searchData}
                   onChange={e => handleChangeInput(e)}/>
            {searchTxt && searchTxt.length !== 0 ? renderClose() : null}
        </div>
    )
}
export default React.memo(SearchInput)
