export function joint(arr: string[], key: string | any, type: string = '/'): string {
    if (arr) {
        return arr.map(item => item[key]).join(type)
    }
    return ''
}

