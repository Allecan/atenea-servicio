export const contentFunction = (information)=>{
    const content = {
        content:[
            {text:"Boletin de notas",style:"header"},
            {
                style: 'tableExample',
                table: {
                    heights: 40,
                    body: information
                }
            },
        ]
    }

    return content
}