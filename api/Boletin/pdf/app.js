import PdfPrinter from "pdfmake";

import fs from "fs";

import {fonts} from "./fonts.js"
import { style } from "./styles.js";

import {contentFunction} from "./pdfContent.js"

export const appPdf = (information)=>{
    try {
        const content = contentFunction(information)
        let docDefinition ={
            content:content.content,
            styles:style
        }
        console.log(docDefinition)
        let printer = new PdfPrinter(fonts)
        
        let pdfDoc = printer.createPdfKitDocument(docDefinition)
        pdfDoc.pipe(fs.createWriteStream(""))
        pdfDoc.end()
        return "pdf created successfully"
    } catch (error) {
        return error
    }
}
