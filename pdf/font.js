import regular from "pdfmake/build/vfs_fonts.js";
export const  fonts = {
    Roboto: {
        normal: Buffer.from(regular.pdfMake.vfs["Roboto-Regular.ttf"],"base64"),
        bold: Buffer.from(regular.pdfMake.vfs["Roboto-Medium.ttf"],"base64"),
    }
}