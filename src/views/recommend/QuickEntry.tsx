import React, {Fragment} from 'react'

interface QuickProps {
    data: { [key: string]: string | any }
}

const QuickEntry: React.FC<QuickProps> = props => {
    const {icon, label} = props.data
    return (
        <Fragment>
            <div className='icon'><i className={icon}/></div>
            <div className='label'>{label}</div>
        </Fragment>
    )
}
export default React.memo(QuickEntry)
