let mongoose=require("mongoose")
const {Schema} = require("mongoose");

//   "id": 1,
//     "category": "jedzenie",
//     "date": "2024-10-28",
//     "kwota": 123,
//     "title": "Pierwsza kwota",
//     "opis": "jakis opis"

const categorySchema=new Schema({

    title: String,

})

let category=mongoose.model('Category',categorySchema)

module.exports=category