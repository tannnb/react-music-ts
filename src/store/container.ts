import {useCallback, useState} from "react"
import {createContainer} from "unstated-next"

function useCounter() {
    let [banner, setBanner] = useState<Array<object> | any>([])
    let dispatchBanner = useCallback(data => setBanner(data), [])
    return {banner, dispatchBanner}
}

let CounterContainer = createContainer(useCounter)
export default CounterContainer
