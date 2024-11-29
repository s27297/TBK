const {check} = require("express-validator");
exports.postAndPutValidation=[
    check('category',"category jest wymagane").not().isEmpty(),
    check('category',"category musi być typu string").isString(),
    check("kwota","kwota jest wymagana").not().isEmpty(),
    check("kwota","kwota musi być liczbą").isNumeric(),
    check("kwota","kwota musi być większa od zera").custom(value=>value>0),
    check("date","date jest wymagana").not().isEmpty(),
    check("date","date misi być datą").isDate(),
    check("title","title jest wymagany").not().isEmpty(),
    check("title","title musi być stringem").isString(),
    check("title","title musi miec co najmniej 3 znaki").isLength({min:3}),
    check("opis","opis musi być stringiem").optional().isString(),
    check("opis","opis musi miec co najmniej 5 znaków").optional().isLength({min:5}),
];

exports.patchValidation=[
    check('category',"category nie może być puste").optional().not().isEmpty(),
    check('category',"category musi być typu string").optional().isString(),
    check("kwota","kwota musi być liczbą").optional().isNumeric(),
    check("kwota","kwota musi być większa od zera").optional().custom(value=>value>0),
    check("date","date misi być datą").optional().isDate(),
    check("title","title nie może być puste").optional().not().isEmpty(),
    check("title","title musi być stringem").optional().isString(),
    check("title","title musi miec co najmniej 3 znaki").optional().isLength({min:3}),
    check("opis","opis musi być stringiem").optional().isString(),
    check("opis","opis musi miec co najmniej 5 znaków").optional().isLength({min:5}),
];