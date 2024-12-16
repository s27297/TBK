let mongoose=require("mongoose")
const {Schema} = require("mongoose");

//   "id": 1,
//     "category": "jedzenie",
//     "date": "2024-10-28",
//     "kwota": 123,
//     "title": "Pierwsza kwota",
//     "opis": "jakis opis"

const expensesSchema=new Schema({
  date:{type:Date, default: Date.now()},
    kwota:{type:Number},
    title: String,
    opis:String
})

let expense=mongoose.model('Expense',expensesSchema)

module.exports=expense