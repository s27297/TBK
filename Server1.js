const express=require("express" )
const app=express()
const expenses=require("./data/expenses.json")

app.use(express.json());

app.use((req,res,next)=>{
    console.log("URL "+req.originalUrl)
    console.log("Method HTTP: "+req.method)
    console.log("Log daty: "+ new Date().toISOString());
    next()
})


// app.use("/admin",(req,res,next)=>{
//    if(!req.query.Autorization||req.query.Autorization!=="cat")
//         res.status("403").send("Dostep zabroniony")
//     next()
// })

app.use("/admin",(req,res,next)=> {
    const q = (req.originalUrl.split("/").filter(q => (q.startsWith("Autorization")) === true))
    if(q[0]!=="Autorization=cat")
        res.status("403").send("Dostep zabroniony")
    next()
})
app.get("/",(req,res)=>{
    res.send("API Sledzenia wydatkow w Exspress.js")
})

app.get("/expenses",(req,res)=>{
    res.send(expenses)
})

app.get("/admin/*",(req,res)=>{
    res.send(expenses)
})
app.get("/expenses/search",(req,res)=>{
  //  console.log(req.query)
    const category=req.query.category||"All"
    const maxAmount=req.query.maxAmount||"All"
    const pofiltrowane=expenses.filter(wydatek=>(wydatek.category.toLowerCase()===category.toLowerCase()||category==="All")&&
        (wydatek.kwota<=maxAmount||maxAmount==="All"))
    res.send(pofiltrowane)
})
app.get("/expenses/:id",(req,res)=>{
   const id=req.params.id
    console.log(id)
    const wydatek=expenses.filter(wydatek=>wydatek.id==id)
    if(wydatek.length>0)
        res.send(wydatek)
    res.status(404).send("Nie znalazone wydatku")
})
app.get("/*",(req,res)=> {
    res.status(404).send("Nie znalezono zasobu")
})


    app.use(express.static('public/'))

app.use((err, req, res, next) =>{
   console.log(err)
    res.status(500).send({error:"Server Error"})

} )
const PORT=process.env.PORT || 5000
const server=app.listen(PORT,()=>{
    const host=server.address().address
    const port=server.address().port
    console.log("Server listening on port at http://"+host+port)
})