const express=require("express" )

let expenses = require("../data/expenses.json");
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
        res.send(wydatek)
    res.status(404).send("Nie znalazone wydatku")
})


router.post("/",(req,res)=>{
    const wydatek=req.body
   if(!wydatek.category||!wydatek.date||!wydatek.kwota||!wydatek.opis||!wydatek.title)
       res.status(404).json({message:"Wydatek nie moze miec puste pola",wydatek:wydatek})
    else {
       wydatek.id = expenses.length ? expenses.length + 1 : 1
       expenses.push(wydatek)
       res.status(201).json({message: "Wydatek added", wydatek: wydatek})
   }
})


router.put("/:id",(req,res)=>{
    const id=parseInt(req.params.id)

    const wydatek=req.body
    const index=expenses.findIndex(e=>e.id===id)
    if(index===-1)  res.status(404).json({message:"Wydatek nie znalazony",wydatek:wydatek})
    else if(!wydatek.category||!wydatek.date||!wydatek.kwota||!wydatek.opis||!wydatek.title)
        res.status(404).json({message:"Wydatek nie moze miec puste pola",wydatek:wydatek})
    else {
        wydatek.id=index
       expenses[index]=wydatek
        res.status(201).json({message: "Wydatek updated", wydatek: wydatek})
    }
})

router.patch("/:id",(req,res)=>{
    const id=parseInt(req.params.id)

    const wydatek=req.body
    const staryWydatek=expenses.find(e=>e.id===id)
    if(!staryWydatek)  res.status(404).json({message:"Wydatek nie znalazony",wydatek:wydatek})
    else {
       Object.assign(staryWydatek,wydatek)

        res.status(201).json({message: "Wydatek patched", wydatek: staryWydatek})
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