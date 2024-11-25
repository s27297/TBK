const swaggerAutogen=require("swagger-autogen")();
const doc= {
    info: {
        title: "Expenses API",
        description: "API do zarzadzenia wydatkami"
    },
    host: 'localhost:5000',
    schemes: ['http'],
};
const outputFile="./swagger.json";
const endpointsFile=["./Server1.js","./routers/expensesRouter.js"];
swaggerAutogen(outputFile,endpointsFile,doc).then(()=>{
    require("./Server1.js");
})