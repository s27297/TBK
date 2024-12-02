const express=require("express" )

let expenses = require("../data/expenses.json");
const validation=require("../validation/validation")
const validator=require("../validation/validator")
const {postValidation} = require("../validation/validation");
const {validationResult}=require('express-validator')

const router=express.Router()

/**
 * @Swagger
 * /expenses:
 *  get:
 *      summary: Pobierz wszystkie wydatki
 *      responses:
 *          200:
 *              description: Lista wydatkow
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Wydatek
 *          404:
 *              description: lista pusta
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: String
 */
router.get("/",(req,res)=>{
    if(expenses.length)
        res.send(expenses)
    else
        res.status(404).json({message:"lista pusta"})
})


router.get("/search",(req,res)=>{
    //  console.log(req.query)
    const category=req.query.category||"All"
    const maxAmount=req.query.maxAmount||"All"
    const date=req.query.date||"All"
    const minAmount=req.query.minAmount||"All"
    const pofiltrowane=expenses.filter(wydatek=>(wydatek.category.toLowerCase()===category.toLowerCase()||category==="All")&&
        (wydatek.kwota<=maxAmount||maxAmount==="All")&& (wydatek.kwota>=minAmount||minAmount==="All")&& (wydatek.date>=date||date==="All"))
    if(pofiltrowane.length)
        res.send(pofiltrowane)
    else
        res.status(404).send("lista pusta")
})
/**
 * @Swagger
 * /expenses/{id}:
 *  get:
 *      summary: Pobierz wydatek pod ID
 *      parametrs:
 *          - in: path
 *            name: id
 *            schema:
 *              type: integer
 *            required: true
 *            description: ID wydatku
 *      responses:
 *          200:
 *              description: Dane wydatku
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Wydatek
 *          404:
 *              description: Wydatek nie znalazony
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: String
 */
router.get("/:id",(req,res)=>{
    const id=req.params.id
    // console.log(id)
    const wydatek=expenses.filter(wydatek=>wydatek.id==id)
    if(wydatek.length>0)
        res.send({message:wydatek,timestamp:new Date()})
    else
        res.status(404).send("Nie znalazone wydatku")
})


router.post("/",validator.postAndPutValidation,(req,res,next)=>{
    const wydatek=req.body
    const errors=validationResult(req)
    if (errors.isEmpty()) {
// Jeśli parametry żądania spełniają kryteria walidacji console.log('Rejestracja użytkownika zakończona');
        wydatek.id = expenses.length ? expenses.length + 1 : 1
        expenses.push(wydatek)
        res.status(201).json({message: "Wydatek added", wydatek: wydatek,timestamp:new Date()})

    } else {
        res.status(400).json({
            errors: errors.array()
        });
    }

})


router.put("/:id",validator.postAndPutValidation,(req,res)=>{
    const id=parseInt(req.params.id)
    const wydatek=req.body
    const index=expenses.findIndex(e=>e.id===id)
    if(index===-1)  res.status(404).json({message:"Wydatek nie znalazony",wydatek:wydatek})
    const errors=validationResult(req)

    if (errors.isEmpty()) {
        wydatek.id=id
        expenses[index]=wydatek
        res.status(201).json({message: "Wydatek updated", wydatek: wydatek,timestamp:new Date()})
    }else {
        res.status(400).json({
            errors: errors.array()
        });
    }
})

router.patch("/:id",validator.patchValidation,(req,res)=>{
    const id=parseInt(req.params.id)
    console.log(req.body)
    const wydatek=req.body
    const staryWydatek=expenses.find(e=>e.id===id)
    if(!staryWydatek)  res.status(404).json({message:"Wydatek nie znalazony",wydatek:wydatek,timestamp:new Date()})

    const errors=validationResult(req)

    if (errors.isEmpty()) {
        Object.assign(staryWydatek,wydatek)


        res.status(201).json({message: "Wydatek patched", wydatek: staryWydatek,timestamp:new Date()})
    }else {
        res.status(400).json({
            errors: errors.array()
        });
    }
})


router.delete("/:id",(req,res)=>{
    const id=parseInt(req.params.id)
    const index=expenses.findIndex(e=>e.id===id)
    console.log(index+"    "+id)
    if(index===-1)  res.status(404).json({message:"Wydatek nie znalazony"})

    else {

        expenses.splice(index,1)
        res.status(201).json({message: "Wydatek pod id "+id+" deleted"})
    }
})


module.exports=router