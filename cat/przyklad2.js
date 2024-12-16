const express=require("express")
const mongoose=require("mongoose")
const Expense=require("./data/expenses_schema")
require('dotenv').config()

const app=express();
app.use(express.json());

const dbURI="mongodb://localhost:27017/expensedb"
const PORT = process.env.PORT || 8080;
// Nawiązywanie połączenia z MongoDB
mongoose.connect(dbURI, {

    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Połączono z bazą danych MongoDB");

    })
.catch(err => {
    console.error("Błąd połączenia z MongoDB:", err);
});
// Tworzymy endpoint POST do odbierania danych od użytkownika.
app.post("/expense", async (req, res) => {
// Destrukturyzacja danych z ciała żądania.
const { kwota,opis,title,category,date} = req.body;
try {
// Tworzymy nowego pracownika.
    const expense = new Expense({
   kwota:kwota,
        opis:opis,
        title:title,
        category:category,
        date:date
    });

// Wstawiamy pracownika do bazy danych.
    await expense.save();
    res.send("Pracownik zapisany pomyślnie.");
} catch (err) {
    console.log(err);
    res.status(500).json({ error: "Wystąpił błąd podczas zapisywania pracownika." });
}
});


app.get("/expense", async (req, res) => {
// Destrukturyzacja danych z ciała żądania.

    try {
// Tworzymy nowego pracownika.

// Wstawiamy pracownika do bazy danych.
        const expense=await Expense.find();
        res.status(200).json(expense);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Wystąpił błąd podczas pobieranie pracownika." });
    }
});






// Uruchamiamy serwer na zadanym porcie.
app.listen(PORT, function (err) {
if (err) {
    console.log(err);
} else {
console.log(`Serwer nasłuchuje na porcie ${PORT}`);
}

});



