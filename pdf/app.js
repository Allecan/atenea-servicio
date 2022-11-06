import PdfPrinter from "pdfmake";

import fs from "fs";

import {fonts} from "./font.js"
import { style } from "./styles.js";


export const appPdf =  (content,direction,data)=>{
   // console.log(data)
    try {
        
        let docDefinition ={
            content:content.content,
            styles:style,
            pageOrientation: content.pageOrientation,
            pageSize: content.pageSize
        }

        //console.log(docDefinition)
        let printer = new PdfPrinter(fonts)
        //devemos de crear el nombre del pdf para devolverlo y descargarlo
        const name = `${data.name}${data.year}Boletin.pdf`
        //console.log(name)
        
        console.log(direction)
        let pdfDoc = printer.createPdfKitDocument(docDefinition)
        let pdfPipe = pdfDoc.pipe(fs.createWriteStream(direction))
        pdfDoc.end()
        const result = {
            name_file: name,
            pdfDocPipe : pdfPipe
        }
        return result
    } catch (error) {
        return error
    }
}