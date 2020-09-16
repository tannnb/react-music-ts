import React from 'react'
import classes from 'classnames'
import './index.scss'

interface HotListProps {
    hotData: any[];
    onSelect?: (e: { [key: string]: any }) => any
}

enum SateType {
    "HOT" = 1,
    "NEW" = 2,
    "UP" = 5
}

const HotList: React.FC<HotListProps> = props => {
    const {hotData, onSelect} = props

    const renderType = (item: any) => {
        let color = item.iconType === 2 ? 'SUCCESS' : 'DANGER'
        return SateType[item.iconType] ? <i className={color}>{SateType[item.iconType]}</i> : null
    }

    const handleItemClick = (data: React.MouseEvent<HTMLElement, MouseEvent>) => {
        onSelect && onSelect(data)
    }

    return (
        <div className='hotList-wrapper'>
            {
                hotData && hotData.map((item, index) => (
                    <div className='item' key={item.score} onClick={() => handleItemClick(item)}>
                        <div className='label'>{item.searchWord} {renderType(item)}</div>
                        <div className='value'>{item.content}</div>
                        <div className={classes('currentRanking', {'active': index + 1 <= 3})}>{index + 1}</div>
                    </div>
                ))
            }
        </div>
    )
}
export default React.memo(HotList)
