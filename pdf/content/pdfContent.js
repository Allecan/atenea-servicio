export const contentFunction = (bodyContent)=>{
    const content = {
        content:[...bodyContent],
        pageOrientation: 'landscape',
        pageSize: ''
    }

    return content
}