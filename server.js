const express=require("express")
const path=require("path")

const app=express()

const port=3000

let lastLocation=null

app.use(express.json())

app.use(express.static(path.join(__dirname,"public")))


app.post("/location",(req,res)=>{

lastLocation=req.body

console.log("Location received:",lastLocation)

res.json({status:"ok"})

})


app.get("/admin",(req,res)=>{

res.json({
location:lastLocation
})

})


app.listen(port,()=>{

console.log("Server running at http://localhost:3000")

})
