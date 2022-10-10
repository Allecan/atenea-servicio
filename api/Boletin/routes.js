import { helpers } from "../../lib/helpers.js"
import path from "path"
import {fileURLToPath} from 'url'
export class BoletinRouter{
    constructor(router, controller, response, httpCode){
        this._router = router()
        this._controller = controller
        this._response = response
        this._httpcode = httpCode
        this.registerRouter()    
    }

    registerRouter(){
        this._router.post('/add-boletin', this.handleCreateBoletin.bind(this));
        this._router.put('/update-boletin/:id', this.handleUpdateBoletin.bind(this));
        this._router.put('/addCourses-boletin/:id', this.handleAddCourses.bind(this));
        this._router.put('/deleteCourses-boletin/:id', this.handleDeleteCourses.bind(this));
        this._router.put('/addNote-boletin/:id', this.handleAddNote.bind(this));
        this._router.put('/createPdf-boletin/:id', this.handleCreatePdf.bind(this));
        this._router.get('/getAll-boletin', this.handleGetAllBoletin.bind(this));
        this._router.delete('/delete-boletin/:id', this.handleDeleteBoletin.bind(this));
        this._router.get('/getOne-boletin/:id', this.handleGetOneBoletin.bind(this));
        this._router.get('/download-boletin/:name', this.handleDownloadPdf.bind(this));
    }
    
    async handleCreateBoletin(req,res){
        const boletin = req.body
        const result = await this._controller.createNewBoletin(boletin)
        if (result instanceof Error) {
            this._response.error(req, res, result, 201)
        } else {
            this._response.succes(req, res, result, this._httpcode.OK)
        }
    }
    async handleUpdateBoletin(req, res) {
        try {
          const boletin = req.body;
          const idBoletin = req.params["id"];
          const result = await this._controller.updateBoletin(idBoletin, boletin);
          this._response.succes(req, res, result, this._httpcode.OK);
        } catch (error) {
          this._response.error(req, res, error, this._httpcode.BAD_REQUEST);
        }
      }
      
    async handleGetAllBoletin(req, res){
        console.log("entro")
        try {
          
            const result = await this._controller.getAllBoletin()
            console.log(result)
            this._response.succes(req, res, result, this._httpcode.OK)
        } catch (error) {
            this._response.error(req, res, error, this._httpcode.BAD_REQUEST)
        }
    }
    
    
    async handleDeleteBoletin(req, res){
        try {
            const idBoletin = req.params['id']
            const result = await this._controller.deleteBoletin(idBoletin)
            this._response.succes(req, res, result, this._httpcode.OK)
        } catch (error) {
            this._response.error(req, res, error, this._httpcode.BAD_REQUEST)
        }
    }
        
    async handleGetOneBoletin(req, res){
        try {
            const idBoletin = req.params['id']
            const result = await this._controller.getOneBoletin(idBoletin)
            this._response.succes(req, res, result, this._httpcode.OK)
        } catch (error) {
            this._response.error(req, res, error, this._httpcode.BAD_REQUEST)
        }
    }
    async handleAddCourses(req, res){
        try {
            const idBoletin = req.params['id']
            const result = await this._controller.addCourses(idBoletin,req.body)
            this._response.succes(req, res, result, this._httpcode.OK)
        } catch (error) {
            this._response.error(req, res, error, this._httpcode.BAD_REQUEST)
        }
    }
    async handleDeleteCourses(req, res){
        try {
            const idBoletin = req.params['id']
            const result = await this._controller.deleteCourse(idBoletin,req.body)
            this._response.succes(req, res, result, this._httpcode.OK)
        } catch (error) {
            this._response.error(req, res, error, this._httpcode.BAD_REQUEST)
        }
    }
    async handleAddNote(req, res){
        try {
            const idBoletin = req.params['id']
            const result = await this._controller.addNoteCourse(idBoletin,req.body)
            this._response.succes(req, res, result, this._httpcode.OK)
        } catch (error) {
            this._response.error(req, res, error, this._httpcode.BAD_REQUEST)
        }
    }
    async handleCreatePdf(req, res){
        try {
            const idBoletin = req.params['id']
            const result = await this._controller.createPdf(idBoletin)
            this._response.succes(req, res, result, this._httpcode.OK)
        } catch (error) {
            this._response.error(req, res, error, this._httpcode.BAD_REQUEST)
        }
    }
    async handleDownloadPdf(req, res){
        try {
            const direction = `api/Boletin/pdf/docs/${req.params["name"]}.pdf`
            console.log(direction)
            res.download(direction,`${req.params["name"]}.pdf`,function(err){
        try {
            const direction = `api/Boletin/pdf/docs/${req.params["name"]}.pdf`
            const __filename = fileURLToPath(import.meta.url);

            // 👇️ "/home/john/Desktop/javascript"
            const __dirname = path.dirname(__filename);
        
            // 👇️ "/home/borislav/Desktop/javascript/dist/index.html"
            const finalDirection = path.join(__dirname, 'pdf/docs/', `${req.params["name"]}.pdf`)
           
            console.log(finalDirection)
            res.download(finalDirection,`${req.params["name"]}.pdf`,function(err){
                if(err){
                    console.log(err)
                }else{
                    const direction_file = "api/Boletin/pdf/docs" 
                    const name_file = `${req.params["name"]}.pdf`

                    helpers.deleteFile(direction_file,name_file)
                    console.log("downloaded file")
                    
                }
            })
         
        } catch (error) {
            this._response.error(req, res, error, this._httpcode.BAD_REQUEST)
        }
    }
}