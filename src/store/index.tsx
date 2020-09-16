import React from 'react'
import CounterContainer from './container'

function compose(...containers: any) {
    return function Component(props: any) {
        return containers.reduceRight((children: any, Container: any) => {
            return <Container.Provider>{children}</Container.Provider>
        }, props.children)
    }
}

const Provider = compose(
    CounterContainer
)
export default Provider
