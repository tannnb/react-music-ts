export function joint(arr: string[], key: string | any, type: string = '/'): string {
    if (arr) {
        return arr.map(item => item[key]).join(type)
    }
    return ''
}

export const formatPlayCount = (item:number) => {
    return (item / 10000) > 9 ? ((item / 10000) > 10000 ? `${(item / 100000000).toFixed(1)}亿` : `${Math.ceil(item / 10000)}万`) : Math.floor(item)
};
