import PdfPrinter from "pdfmake";

import fs from "fs";

import {fonts} from "./font.js"
import { style } from "./styles.js";

import {contentFunction} from "./pdfContent.js"

export const appPdf = (information,data)=>{
    console.log(data)
    try {
        const content = contentFunction(information)
        let docDefinition ={
            content:content.content,
            styles:style,
            pageOrientation: 'landscape'
        }
        console.log(docDefinition)
        let printer = new PdfPrinter(fonts)
        const direction = `${data.direction}/${data.name_file}.pdf`
        console.log(direction)
        let pdfDoc = printer.createPdfKitDocument(docDefinition)
        
        pdfDoc.pipe(fs.createWriteStream(direction))
        pdfDoc.end()
        return "pdf created successfully"
    } catch (error) {
        return error
    }
}
