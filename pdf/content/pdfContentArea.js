export const contentFunction = (information)=>{
    const content = {
        content:[
            {text:"CUADRO DE REGISTRO DE CALIFICACIONES",style:"header"},
            {text:"EORM. CANTÓN EL LLANO ALDEA  OCUBILÁ",style:"header"},
            {
                style: 'tableExample',
                table: {
                   
                    widths: [80,200,80,150,80,130,80,60],
                    body: [
                        [{text:"Docente:",style:"",bold:true,border: [false, false, false,false]},{text:information.docente,style:"",border: [false, false, false,true]},
                        {text:"Area:",style:"",bold:true,border: [false, false, false,false]},{text:information.area,style:"",border: [false, false, false,true]},
                        {text:"Grado:",style:"",bold:true,border: [false, false, false,false]},{text:information.grado,style:"",border: [false, false, false,true]},
                        {text:"Sección:",style:"",bold:true,border: [false, false, false,false]},{text:"",style:"",border: [false, false, false,true]}
                        ]
                    
                        
                    ]
                },
                layout: {
                    defaultBorder: false,
                }
            },
            {
                style: 'tableExample',
                table: {
                    widths: [20,110,12,12,12,12,12,12,12,12,12,12,12,12
                                  ,12,12,12,12,12,12,12,12,12,12,12,12
                                  ,12,12,12,12,12,12,12,12,12,12,12,12
                                  ,12,12,12,12,12,12,12,12,12,12,12,12],
                    body: [
                        [{text:"No.",bold:true},
                        {text:"Nombre del estudiante",bold:true,style:"tableHeader"},
                        {text:"Unidad I",bold:true,colSpan: 12,style:"tableHeader"},{},{},{},{},{},{},{},{},{},{},{},
                        {text:"Unidad II",bold:true,colSpan: 12,style:"tableHeader"},{},{},{},{},{},{},{},{},{},{},{},
                        {text:"Unidad III",bold:true,colSpan: 12,style:"tableHeader"},{},{},{},{},{},{},{},{},{},{},{},
                        {text:"Unidad IV",bold:true,colSpan: 12,style:"tableHeader"},{},{},{},{},{},{},{},{},{},{},{},
                        ],
                        [{},{}
                            ,...information.activities.unit1,{text:"TOTAL Z.",style:"tableHeaderTotal"},{text:"PRUEBA OBJETVA",style:"tableHeaderPrueba"},{text:"TOTAL GENERAL",style:"tableHeaderTotalGeneral"}
                            ,...information.activities.unit2,{text:"TOTAL Z.",style:"tableHeaderTotal"},{text:"PRUEBA OBJETVA",style:"tableHeaderPrueba"},{text:"TOTAL GENERAL",style:"tableHeaderTotalGeneral"}
                            ,...information.activities.unit3,{text:"TOTAL Z.",style:"tableHeaderTotal"},{text:"PRUEBA OBJETVA",style:"tableHeaderPrueba"},{text:"TOTAL GENERAL",style:"tableHeaderTotalGeneral"}
                            ,...information.activities.unit4,{text:"TOTAL Z.",style:"tableHeaderTotal"},{text:"PRUEBA OBJETVA",style:"tableHeaderPrueba"},{text:"TOTAL GENERAL",style:"tableHeaderTotalGeneral"}
                            ],
                        [{},{}
                            ,{text:1},{text:2},{text:3},{text:4},{text:5},{text:6},{text:7},{text:8},{text:9},{},{},{}
                            ,{text:1},{text:2},{text:3},{text:4},{text:5},{text:6},{text:7},{text:8},{text:9},{},{},{}
                            ,{text:1},{text:2},{text:3},{text:4},{text:5},{text:6},{text:7},{text:8},{text:9},{},{},{}
                            ,{text:1},{text:2},{text:3},{text:4},{text:5},{text:6},{text:7},{text:8},{text:9},{},{},{}
                        ],
                         [{text:"1"},{text:"erqwrqwer rewrqwe eqwrqr ewrqr"}
                        ,{},{},{},{},{},{},{},{},{},{text:"", style:"tableHeaderTotal"},{text:"",style:"tableHeaderPrueba"},{text:"",style:"tableHeaderTotalGeneral"}
                        ,{},{},{},{},{},{},{},{},{},{text:"", style:"tableHeaderTotal"},{text:"",style:"tableHeaderPrueba"},{text:"",style:"tableHeaderTotalGeneral"}
                        ,{},{},{},{},{},{},{},{},{},{text:"", style:"tableHeaderTotal"},{text:"",style:"tableHeaderPrueba"},{text:"",style:"tableHeaderTotalGeneral"}
                        ,{},{},{},{},{},{},{},{},{},{text:"", style:"tableHeaderTotal"},{text:"",style:"tableHeaderPrueba"},{text:"",style:"tableHeaderTotalGeneral"}
                        ],
                        [{text:"2"},{text:"erqwrqwer rewrqwe eqwrqr ewrqr"}
                        ,{},{},{},{},{},{},{},{},{},{text:"", style:"tableHeaderTotal"},{text:"",style:"tableHeaderPrueba"},{text:"",style:"tableHeaderTotalGeneral"}
                        ,{},{},{},{},{},{},{},{},{},{text:"", style:"tableHeaderTotal"},{text:"",style:"tableHeaderPrueba"},{text:"",style:"tableHeaderTotalGeneral"}
                        ,{},{},{},{},{},{},{},{},{},{text:"", style:"tableHeaderTotal"},{text:"",style:"tableHeaderPrueba"},{text:"",style:"tableHeaderTotalGeneral"}
                        ,{},{},{},{},{},{},{},{},{},{text:"", style:"tableHeaderTotal"},{text:"",style:"tableHeaderPrueba"},{text:"",style:"tableHeaderTotalGeneral"}
                        ],
                        [{text:"3"},{text:"erqwrqwer rewrqwe eqwrqr ewrqr"}
                        ,{},{},{},{},{},{},{},{},{},{text:"", style:"tableHeaderTotal"},{text:"",style:"tableHeaderPrueba"},{text:"",style:"tableHeaderTotalGeneral"}
                        ,{},{},{},{},{},{},{},{},{},{text:"", style:"tableHeaderTotal"},{text:"",style:"tableHeaderPrueba"},{text:"",style:"tableHeaderTotalGeneral"}
                        ,{},{},{},{},{},{},{},{},{},{text:"", style:"tableHeaderTotal"},{text:"",style:"tableHeaderPrueba"},{text:"",style:"tableHeaderTotalGeneral"}
                        ,{},{},{},{},{},{},{},{},{},{text:"", style:"tableHeaderTotal"},{text:"",style:"tableHeaderPrueba"},{text:"",style:"tableHeaderTotalGeneral"}
                        ],
                        [{text:"4"},{text:"erqwrqwer rewrqwe eqwrqr ewrqr"}
                        ,{},{},{},{},{},{},{},{},{},{text:"", style:"tableHeaderTotal"},{text:"",style:"tableHeaderPrueba"},{text:"",style:"tableHeaderTotalGeneral"}
                        ,{},{},{},{},{},{},{},{},{},{text:"", style:"tableHeaderTotal"},{text:"",style:"tableHeaderPrueba"},{text:"",style:"tableHeaderTotalGeneral"}
                        ,{},{},{},{},{},{},{},{},{},{text:"", style:"tableHeaderTotal"},{text:"",style:"tableHeaderPrueba"},{text:"",style:"tableHeaderTotalGeneral"}
                        ,{},{},{},{},{},{},{},{},{},{text:"", style:"tableHeaderTotal"},{text:"",style:"tableHeaderPrueba"},{text:"",style:"tableHeaderTotalGeneral"}
                        ]
                                        
                        
                    ]
                }
            },
            "\n\n\n\n",
            {
                styles:"tableExample",
                table:{
                    widths:[10,295, 60, 35, 295,60,35,295],
                    body: [
                        
                        [{text:"F."},{text:"",border: [false, false, false,true]},{},{text:"Vo.Bo."},{text:"",border: [false, false, false,true]},{},{text:"Vo.Bo."},{text:"",border: [false, false, false,true]}],
                        [{},{text:"Docente de grado",style:"textSimple"},{},{},{text:"Comisión de evaluación",style:"textSimple"},{},{},{text:"Prof. Juan Carlos De León Matías \n Director.",style:"textSimple"}]
                    ]
                },
                layout: {
                    defaultBorder: false,
                }
            }            

        ],
        pageOrientation: 'landscape',
        pageSize: 'TABLOID'
    }

    return content
}