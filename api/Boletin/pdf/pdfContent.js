export const contentFunction = (information)=>{
    const content = {
        content:[
            {
                alignment: 'justify',
                columns: [
                    {
                        text: "FIRMA DEL PADRE O ENCARGADO",
                        style: "header"
                    },
                        {
                        text: "EORM CANTÓN EL LLANO \n",
                        style: "header"
                    },
                
                ]
            },
            {
                alignment: 'justify',
                columns: [
                    {
                        text: ""
                    },
                        {
                        text: "OCUBILA HUEHUETENANGO \n\n\n",
                        style: "header"
                    },
                
                ]
            },
            {
                alignment: 'justify',
                columns: [
                    {
                        text: "",
                   
                    },
                    {   
                        table:{
                            headerRows: 1,
                            heights:[40,40,40,40],
                            widths: ['*', 80, '*', 70],
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
                    }
                
                ]
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
            {text:"NOTA: Sobresaliente = 90 - 100; Muy Bueno = 80 - 89; Bueno = 70 - 79; Regular = 60 - 69; Malo = 0 - 59",style:"textSimple" }
        ],
    }

    return content
}