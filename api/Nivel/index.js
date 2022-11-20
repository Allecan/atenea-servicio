import { FireBase } from '../../store/FireBase.js'
import { ControllerLevel } from './controller.js'
import { LevelRouter } from './routes.js'
import { Level } from '../../models/Level.js'
import { response } from '../../response/response.js'
import { HttpCode } from '../../response/httpcode.js'
import { config } from '../../config/default.js'

export const levelModel = (expressRouter)=>{
    const levelServices = new FireBase(config.fireBase)
    const levelController = new ControllerLevel(levelServices, Level)
    const levelRouter = new LevelRouter(expressRouter, levelController, response, HttpCode)
    return levelRouter._router
} 
/**
 * @swagger
 * components:
 *   schemas:
 *     Level:
 *       type: object
 *       properties:
 *         level_name:
 *           type: string
 *           description: El nombre del nivel.
 *           example: Primaria
 *         position:
 *           type: string
 *           description: la posicion del nivel.
 *           example: 1
 *         id: 
 *          type: string
 *          description: el id del nivel 
 *          example: EkNCLha4XHgew4Wm2S2H
 *       required:
 *         -level_name
 *       example: 
 *         level_name: primaria
 */

/**
 * @swagger
 * /api/v1/level/getone-level/{id}:
 *   get:
 *     summary: Retorna un nivel.
 *     tags: [Level]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: El id del nivel
 *     responses:  
 *       200: 
 *         description: A level object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 level_name:
 *                   type: string
 *                   description: el nombre del nivel
 *                   example: Primaria
 *                 position:
 *                   type: Integer
 *                   description: la posicion del nivel
 *                   example: 1
 *                 id:
 *                   type: string
 *                   description: el id del nivel
 *                   example: EkNCLha4XHgew4Wm2S2H
 *       400:
 *         description: level not found
*/
/**
 * @swagger
 * /api/v1/level/getall-levels:
 *   get:
 *     summary: Retorna todos los niveles.
 *     tags: [Level]
 *     responses:  
 *       200: 
 *         description: Retornar todo los niveles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Level'
 * 
 */