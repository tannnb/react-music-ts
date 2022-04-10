import React, {useEffect, useState} from 'react'
import {getNewSongs} from "../../api/Request";

export const Home = () => {
    const [newSongs,setNewSongs] = useState([])

    const getAsyncNewSongs = async () => {
        const {list, lan, type} = await getNewSongs()
        setNewSongs(list)
    }

    useEffect(() => {
        getAsyncNewSongs()
    }, [])

    useEffect(() => {
        if(Array.isArray(newSongs) && newSongs.length) {
            console.log('newSongs', newSongs)
        }
    },[newSongs])

    return <div>honme</div>
}

