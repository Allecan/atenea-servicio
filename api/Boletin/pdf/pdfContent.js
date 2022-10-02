export const contentFunction = (information)=>{
    const content = {
        content:[
           
            {text:"Boletin de notas \n\n",style:"header"},
            {
               
                table:{
                    headerRows: 1,
                    widths: ['*', 150, '*', 150],
                    body:[
                        [
                            {text:`Estudiante: `,style:"subheader"},{text:information.name_student,style:"text"},
                            {text:`Profesor: `,style:"subheader"}, {text:information.teacher,style:"text"},
                        ],
                        [
                            {text:`Grado: `,style:"subheader"},{text:information.grade,style:"text"} ,
                            {text:`Codigo: `,style:"subheader"}, {text:information.keyCode,style:"text"}
                        ],
                        [
                            {text:`Año: `,style:"subheader"},{text:information.year,style:"text"} ,"",""
                        ]
                    ]
                    
                },
                layout: 'noBorders'
            },
            "\n\n",
            {
                style: 'tableExample',
                table: {
                    heights: 40,
                    widths: ['*',100, '*', '*', '*','*',100],
                    body:[
                    [{text: 'No.', style: 'tableHeader'},{text: 'Asignatura', style: 'tableHeader'}, {text: 'Unidad I', style: 'tableHeader'}, {text: 'Unidad II', style: 'tableHeader'},
                    {text: 'Unidad III', style: 'tableHeader'},{text: 'Unidad IV', style: 'tableHeader'},{text: 'Promedio', style: 'tableHeader'}],
                    ...information.courses
                    ]
                },
                pageOrientation: 'landscape', pageBreak: 'before'
            },
        ]
    }

    return content
}