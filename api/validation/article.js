'use strict'
const Joi = require('@hapi/joi')


function articleValidate(articleDetails){
    
    const authorSchema = Joi.object().keys({
        name: Joi.string().required(),
      })
    const schemaArticle = {
        title : Joi.string().min(2).max(100).required(),
        subtitle: Joi.string().min(2).max(100).required(),
        summary: Joi.string().min(2).max(200).required(),
        detail: Joi.string().min(2).required(),
        author: Joi.array().items(authorSchema)
        }
    return Joi.validate(articleDetails,schemaArticle)
}
function articleValidateUpdate(articleDetails){ 
    const schemaArticle = {
        title : Joi.string().min(2).max(100).required(),
        subtitle: Joi.string().min(2).max(100).required(),
        summary: Joi.string().min(2).max(200).required(),
        detail: Joi.string().min(2).required()
    }
    return Joi.validate(articleDetails,schemaArticle)
}

function articleValidateParams(articleDetails){ 
    const schemaArticle = {
        _id : Joi.number().integer().required().error(() => 'Params _id is required')
    }
    return Joi.validate(articleDetails,schemaArticle)
}
function listArticleValidate(articleDetails){
    const schemaArticle = {
        start : Joi.number().integer().required().error(() => 'Params start is required'),
        limit : Joi.number().integer().min(1).max(100).required().error(() => 'Params limit is required')
    }
    return Joi.validate(articleDetails,schemaArticle)

}


module.exports = {
    articleValidate: articleValidate,
    articleValidateUpdate:articleValidateUpdate,
    articleValidateParams:articleValidateParams,
    listArticleValidate:listArticleValidate
}