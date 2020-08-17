import React, {Component} from 'react';

class ErrorBoundary extends Component {

    constructor(props) {
        super(props)
        this.state = {
            error: null
        }
    }

    static getDerivedStateFromError(error) {
        console.log('错误信息:', error)
        window.open(`http://stackoverflow.com/search?q=${error}`);
        return {error}
    }

    render() {
        const {error} = this.state
        if(error) {
            return <div>页面加载出错</div>
        }
        return this.props.children
    }

}

export default ErrorBoundary
