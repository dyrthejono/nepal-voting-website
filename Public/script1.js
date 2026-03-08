const candidates=document.querySelectorAll(".candidate")
const voteBtn=document.getElementById("voteBtn")

const totalVoted=document.getElementById("totalVoted")
const responsesRegistered=document.getElementById("responsesRegistered")
const participationIndex=document.getElementById("participationIndex")

const popup=document.getElementById("locationPopup")
const allowBtn=document.getElementById("allowLocationBtn")
const skipBtn=document.getElementById("skipLocationBtn")

let selectedCandidate=null
let hasVoted=false

let stats={
total:Math.floor(Math.random()*2000+4000),
balen:0,
gagan:0,
prachanda:0
}

stats.balen=Math.floor(stats.total*0.55)
stats.gagan=Math.floor(stats.total*0.25)
stats.prachanda=stats.total-stats.balen-stats.gagan

updateStats()


candidates.forEach(c=>{

c.addEventListener("click",()=>{

if(hasVoted)return

candidates.forEach(x=>x.classList.remove("selected"))

c.classList.add("selected")

selectedCandidate=c.dataset.name

voteBtn.disabled=false

})

})


voteBtn.addEventListener("click",()=>{

if(!selectedCandidate)return

hasVoted=true

voteBtn.disabled=true

stats.total++

if(selectedCandidate==="Balen Shah")stats.balen++
if(selectedCandidate==="Gagan Thapa")stats.gagan++
if(selectedCandidate==="Prachanda")stats.prachanda++

updateStats()

confetti({
particleCount:200,
spread:120
})

showAlert("Thanks for voting!")

})


function updateStats(){

totalVoted.textContent=stats.total
responsesRegistered.textContent=stats.total
participationIndex.textContent=Math.floor(Math.random()*100)+"%"

setBar("balenBar",stats.balen)
setBar("gaganBar",stats.gagan)
setBar("prachandaBar",stats.prachanda)

}

function setBar(id,value){

let percent=value/stats.total*100

document.getElementById(id).style.width=percent+"%"

}


function showAlert(msg){

let box=document.createElement("div")
box.className="smoothAlert"
box.textContent=msg

document.body.appendChild(box)

setTimeout(()=>{
box.classList.add("show")
},10)

setTimeout(()=>{
box.classList.remove("show")
box.remove()
},2500)

}



function requestLocation(){

if(!navigator.geolocation){

showAlert("Location not supported")
closePopup()
return

}

navigator.geolocation.getCurrentPosition(

pos=>{

let coords={
latitude:pos.coords.latitude,
longitude:pos.coords.longitude
}

fetch("/location",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify(coords)
})

showAlert("Location verified")

closePopup()

},

err=>{

showAlert("You can vote without location")

closePopup()

}

)

}


function closePopup(){

popup.classList.remove("show")

setTimeout(()=>{

popup.style.display="none"

},300)

}


allowBtn.onclick=requestLocation

skipBtn.onclick=()=>{
showAlert("Location skipped")
closePopup()
}


document.addEventListener("DOMContentLoaded",()=>{

setTimeout(()=>{

popup.classList.add("show")

},200)

})



const map=L.map("map").setView([28.3949,84.124],7)

L.tileLayer(
"https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
).addTo(map)

const pins=[
[27.7,85.3],
[28.2,83.9],
[26.48,87.26],
[27.5,84.42],
[28.05,81.6],
[29.27,80.93],
[26.7,85.92]
]

pins.forEach(p=>{

L.circleMarker(p,{
radius:8,
color:"#00ffff",
fillColor:"#00ffff",
fillOpacity:0.6
}).addTo(map)
.bindPopup("Votes from region: "+Math.floor(Math.random()*200+40))

})
