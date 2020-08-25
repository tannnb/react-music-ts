import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'

export const Loading: React.FC<any> = props => {
    const handleDestroy = () => {
        props.toast.destroy()
    }
    return (
        <div className="global-loading" onClick={handleDestroy}>
            数据加载中
        </div>
    )
}

function isHidden(el: HTMLElement): boolean {
    const style = window.getComputedStyle(el)
    return style.display === 'none'
}

let dom: HTMLElement | null
const Toast = {
    open(props: React.ComponentProps<any> = {}): void {
        if (!dom) {
            dom = document.createElement('div')
            dom.className = 'toast_wrapper'
            ReactDOM.render(<Loading {...props} toast={Toast} />, dom)
            document.body.appendChild(dom)
        }
        if (isHidden(dom)) {
            dom.style.display = ''
        }
    },
    close(): void {
        dom!.style.display = 'none'
    },
    destroy(): void {
        ReactDOM.unmountComponentAtNode(dom!)
        document.body.removeChild(dom!)
        dom = null
    }
}

export default Toast
