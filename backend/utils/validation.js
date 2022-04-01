const {validationResult} = require('express-validator');

const handleValidationErrors = (req,_res,next)=>{
    const validationErrors = validationResult(req);

    if(!validationErrors.isEmpty()){
        const errors = validationErrors.array().map((error)=>`${error.msg}`);

        const err = Error('Bad requiest.');
        err.errors = errors;
        err.status = 400;
        err.title = 'Bad request.';
        next(err);
    }
    next();
}

module.exports = {handleValidationErrors};