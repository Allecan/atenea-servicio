export const contentFunction = (information)=>{
    const content = {
        content:[
            {text:"Boletin de notas",style:"header"},
            {text:information.name_student,style:"subheader"},
            {text:information.teacher,style:"subheader"},
            {text:information.grade,style:"subheader"},
            {text:information.keyCode,style:"subheader"},
            {text:information.year,style:"subheader"},
            {
                style: 'tableExample',
                table: {
                    heights: 40,
                    body:[
                        [{text: 'Cursos', style: 'tableHeader'}, {text: 'Unidad I', style: 'tableHeader'}, {text: 'Unidad II', style: 'tableHeader'},
                    {text: 'Unidad III', style: 'tableHeader'},{text: 'Unidad IV', style: 'tableHeader'},{text: 'Promedio', style: 'tableHeader'}],
                    ...information.courses
                    ]
                }
            },
        ]
    }

    return content
}