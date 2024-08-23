export const checkNumberArray = (value: string, sep: string) => {
    const result = value.split(sep).map(Number)
    if (result.length == 0 || result[0] == 0) return []
    for (let e of result) {
        if (isNaN(e)) return []
    }
    return result
}