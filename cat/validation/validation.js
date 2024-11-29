const {validationResult}=require('express-validator')


const handleValidationError=(req,res,next)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty){
        const extractedErrors={}
        errors.array().forEach(err=>{
            if(!extractedErrors[err.param])
                extractedErrors[err.param]=[];
            extractedErrors[err.param].push(err.msg);
        })
        return res.status(400).json({
            errors:extractedErrors,
        })
    }
    next();
};


module.exports= {handleValidationError};