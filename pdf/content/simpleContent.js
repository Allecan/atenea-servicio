export const simpleContent = (information)=>{
  
   const content = [
        {
            columns: [
                {
                    table:{
                        heights:[80,80,80,80],
                        widths: [30,290],
                        body:[
                            [
                                {text:""},{text:"FIRMA DEL PADRE O ENCARGADO",style: "header"}
                            ],
                            [
                                {text: '1.',style:"columnLeft"},{text: '',border: [false, false, false,true],}
                            ],
                            [
                                {text: '2.',style:"columnLeft"},{text: '',border: [false, false, false,true],}
                            ],
                            [
                                {text: '3.',style:"columnLeft"},{text: '',border: [false, false, false,true],}
                            ],
                            [
                                {text: '4.',style:"columnLeft"},{text: '',border: [false, false, false,true],}
                            ],
                            [
                                {text: ''},{text: 'NOTA: Debe devolverlo tres \n\t días despues de haberlo recibido',style: "subheader2"}
                            ],

                        ]
                    },
                    layout: {
                        defaultBorder: false,
                    }
            },
                {
                    table:{
                        heights:['*'],
                        widths: [350],
                        body:[
                            [
                                {text:`EORM CANTÓN EL LLANO`,style:"header"}
                            ],
                            [
                                {
                                    border: [false, false, false,true],
                                    text:`OCUBILA HUEHUETENANGO`,
                                    style:"header2"
                                }
                            ],
                            [
                                {
                                    fillColor: '#dddddd',
                                    text:`INFORME DE EVALUACIÓN`,
                                    style:"header"
                                }
                            ],
                            [
                                {
                                    image: "data:image/png;base64,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",
                                    alignment:"center",
                                    width: 200
                                },
                            ],
                            [
                                {
           
                                    table:{
                                        headerRows: 1,
                                        heights:[40,40,40,40],
                                        widths: ['*', 150, '*', 70],
                                        body:[
                                            [
                                                {text:`Estudiante: `,style:"subheader"},{text:information.name_student,style:"text"},
                                                {text:`Profesor: `,style:"subheader"}, {text:information.teacher,style:"text"}
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
                        ]
                    },
                    layout: {
                        defaultBorder: false,
                    }
                }
            
            ]
        },
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
        {text:"NOTA: Sobresaliente = 90 - 100; Muy Bueno = 80 - 89; Bueno = 70 - 79; Regular = 60 - 69; Malo = 0 - 59",style:"textSimple" },
        {
            table:{
                heights:[40,40,'*'],
                widths: [10,200, 60, 135, '*','*',200],
                body:[
                    [{},{},{text:"Resultado",style:"footer"},{text:information.condition,border: [false, false, false,true],style:"footer"},{text:"",border: [false, false, false,true]},{},{}],
                    [{text:"f)",style:"footer"},{text:"",border: [false, false, false,true]},{},{text:"SELLO", margin: [0,30 ,0, 0]},{},{text:"Vo.Bo.",style:"footer"},{text:"",border: [false, false, false,true]}],
                    [{},{text:"Prof. del grado",alignment:"center"},{},{},{},{},{text:"Director", alignment:"center"}]
                    
                ]
            },
            layout: {
                defaultBorder: false,
            }
        }

    ]
return content
}