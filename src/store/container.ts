import { useState} from "react"
import {createContainer} from "unstated-next"

function useCounter(initialState = 0) {
    let [count, setCount] = useState<number>(initialState)

    let decrement = () => setCount(count => count - 1)
    let increment = () => setCount(count => count + 1)
    return {count, decrement, increment}
}

let CounterContainer = createContainer(useCounter)
export default CounterContainer
