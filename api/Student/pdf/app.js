import PdfPrinter from "pdfmake";

import fs from "fs";

import {fonts} from "./font.js"
import { style } from "./styles.js";

import {contentFunction} from "./pdfContent.js"

export const appPdf =  (information,data)=>{
   // console.log(data)
    try {
        const content = contentFunction(information)
        let docDefinition ={
            content:content.content,
            styles:style,
            pageOrientation: 'landscape'
        }

       // console.log(docDefinition)
        let printer = new PdfPrinter(fonts)
        const name = `${data.name}${data.year}Boletin`
        const direction = `api/Student/pdf/docs/${name}.pdf`
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