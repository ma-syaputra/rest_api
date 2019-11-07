'use strict'
const Joi = require('@hapi/joi')


function authorValidate(authorDetails){
    const schemaAuthor = {
        _id : Joi.number().integer().required().error(() => 'Params _id is required'),
        author_id :  Joi.string().required()
        }
    return Joi.validate(authorDetails,schemaAuthor)
}

function authorValidateAdd(authorDetails){
    const schemaAuthorAdd = {
        _id : Joi.number().integer().required().error(() => 'Params _id is required'),
        name :  Joi.string().required()
        }
    return Joi.validate(authorDetails,schemaAuthorAdd)
}


module.exports = {
    authorValidate: authorValidate,
    authorValidateAdd:authorValidateAdd
}