import PdfPrinter from "pdfmake";
import fs from "fs";
import {fonts} from "./font.js"
import { style } from "./styles.js";
import {contentFunction} from "./pdfContent.js"
import path from "path"
import {fileURLToPath} from 'url'

export const appPdf =  (information,data)=>{
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
        console.log(name)
        const __filename = fileURLToPath(import.meta.url);

        // 👇️ "/home/john/Desktop/javascript"
        const __dirname = path.dirname(__filename);
        
        // 👇️ "/home/borislav/Desktop/javascript/dist/index.html"
        const finalDirection = path.join(__dirname, '/docs', `${name}.pdf`)
       // const direction = `api/Boletin/pdf/docs/${name}.pdf`
        console.log(finalDirection)
        let pdfDoc = printer.createPdfKitDocument(docDefinition)
        pdfDoc.pipe(fs.createWriteStream(finalDirection))
        pdfDoc.end()
        const result = {
            name_file: name,
            path: finalDirection
        }
        return result
    } catch (error) {
        return error
    }
}
