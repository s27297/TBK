
const express = require('express');
const bodyParser = require('body-parser');
const validator = require('./validation');
const {validationResult } = require('express-validator');
const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.post('/register', validator.registrationValidation, (req, res, next) => { // Kod rejestracji
    const errors = validationResult(req);
    if (errors.isEmpty()) {
// Jeśli parametry żądania spełniają kryteria walidacji console.log('Rejestracja użytkownika zakończona');
        res.json({"message": "Rejestracja użytkownika powiodła się"});
    } else {
        res.status(400).json({
            errors: errors.array()
        });
    };
})
app.listen(3000, () => console.log('Serwer działa na porcie 3000'));