const express=require("express" )
const app=express()
const expenses=require("./data/expenses.json")
const expensesRouter=require("./routers/expensesRouter")
const cors=require("cors")
const YAML=require("yamljs")
const swaggerUI=require("swagger-ui-express")

app.use(cors({
    origin: 'http://localhost:63342'
}))


app.use(express.json());

app.use((req,res,next)=>{
    console.log("URL "+req.originalUrl)
    console.log("Method HTTP: "+req.method)
    console.log("Log daty: "+ new Date().toISOString());
    next()
})
app.use('/expenses',expensesRouter)

 // const swaggerDocument=.load('./swagger.json')
 app.use('/api-docs',swaggerUI.serve,swaggerUI.setup('./swagger.json'))

// app.use("/admin",(req,res,next)=>{
//    if(!req.query.Autorization||req.query.Autorization!=="cat")
//         res.status("403").send("Dostep zabroniony")
//     next()
// })

// app.use("/admin",(req,res,next)=> {
//     const q = (req.originalUrl.split("/").filter(q => (q.startsWith("Autorization")) === true))
//     if(q[0]!=="Autorization=cat")
//         res.status("403").send("Dostep zabroniony")
//     next()
// })

app.use("/admin",(req, res, next)=>{
    const token=req.header("Authorization")||"rat"
    console.log(token)
    if(token!=="cat")
        res.status(401).send("Dostep zabroniony")
    else
        next()
})
app.get("/",(req,res)=>{
    res.send("API Sledzenia wydatkow w Exspress.js")
})
app.get("/admin",(req,res)=>{
    res.send(expenses)
})

app.use(express.static('public/'))

app.get("/*",(req,res)=> {
    res.status(404).send("Nie znalezono zasobu")
})



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