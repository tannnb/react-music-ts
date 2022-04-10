import React from 'react'
import classnames from 'classnames'
import styles from "./style.module.scss"

interface LoadingProps {
    showContext: boolean
    text?: string
}

export const Loading: React.FC<Partial<LoadingProps>> = (props) => {
    return (
        <div className={classnames(styles.LoadingWrapper)}>
            <span className={classnames(styles.loading)}></span>
            {
                props.showContext ? (<span className={classnames(styles.LoadingText)}>{props.text}</span>) : null
            }
        </div>
    )
}

Loading.defaultProps = {
    showContext: true,
    text: '加载中...'
};


