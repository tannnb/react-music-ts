export const useHorizontalWidth = () => {
    const setHorizontalWidth = (ref: any) => {
        let scrollRef = ref.current.getScrollRef().current
        let childNode = scrollRef.childNodes[0]
        let tagElements = childNode.childNodes
        let totalWidth = 10
        tagElements.forEach((ele: any) => {
            totalWidth += ele.offsetWidth
        })
        childNode.style.width = `${totalWidth}px`
    }
    return {setHorizontalWidth}
}
