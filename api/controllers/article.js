'use strict'
const _ = require('lodash') 
const status = require('./../response/status')
const schemaArticle = require('./../schema/articleDefinition').articleSchema
const { articleValidateParams } = require('./../validation/article')
const {convertAny} = require('./../helper/lower')


async function list_article(req, res) {
    const start = parseInt(req.query.start)
    const limit = parseInt(req.query.limit)
    const articleDetails ={}
    articleDetails.start = start
    articleDetails.limit = limit
    const { listArticleValidate } = require('./../validation/article')
    const { error } = listArticleValidate(articleDetails)
    if(error) return status.bad_app(error,res)
    const keyword = req.query.keyword || ''
    if(keyword){
        var query = {title:{ $regex: '.*' + keyword + '.*' }}
    }else{
        var query = {}
    }
    try {
        // const listArticle =  schemaArticle.find(query).select('title _id subtitle').sort({ created_at: -1 }).skip(start).limit(limit);
        // const countArticle = schemaArticle.find(query).select('_id')
        // var [list, count] = await Promise.all([listArticle,countArticle]);
        // const total = count.length

        const listArticle =  schemaArticle.find(query).select('title _id subtitle author').sort({ created_at: -1 }).skip(start).limit(limit);
        var findArticle = await listArticle;
        const total = findArticle.length
        status.list_app(findArticle,total,res)
    } catch (error) {
        status.bad_app('Article Not Found',res)
    }
}

async function add_article(req,res){
    const articleIncrement = require('./../schema/articleDefinition').CounterSchema
    const articleDetails = _.pick(req.body, ['title','subtitle','summary','detail','author'])
    const { articleValidate } = require('./../validation/article')
    const { error } = articleValidate(articleDetails)
    if(error) return status.bad_app(error,res)
    articleDetails.title = convertAny(articleDetails.title)
    articleDetails.subtitle = convertAny(articleDetails.subtitle)
    const articleInc = await articleIncrement.findByIdAndUpdate({_id: 'article'}, {$inc: { seq: 1}});
    if(!articleInc) status.bad_app('Cant created Article ID',res)
    articleDetails['_id'] = articleInc.seq
    try {
        const saveArticle =  new schemaArticle(articleDetails)
        await saveArticle.save()
        status.success_app('Article Saved',res)
    } catch (error) {
        console.log(error)
        status.bad_app('Cant saving DB',res)
    }
}

async function delete_author(req,res){
    const { authorValidate } = require('./../validation/author')
    const authorDetails = {}
    authorDetails['_id'] = parseInt(req.query._id)
    authorDetails['author_id'] = req.query.author_id
    const { error } = authorValidate(authorDetails)
    if(error) return status.bad_app(error,res)
        const findArticle =  await schemaArticle.findById(_.pick(authorDetails, ['_id']))
        if(!findArticle) status.bad_app('Article Not Found',res)
        try {
            const author = findArticle.author.id(authorDetails.author_id)
            author.remove()
            findArticle.save()
            status.success_app('Author Deleted',res)
        } catch (error) {
            console.log(error)
            status.bad_app('Cant Deleted Author',res)
        }
}

async function add_author(req,res){
    const { authorValidateAdd } = require('./../validation/author')
    const authorDetails = _.pick(req.body, ['_id','name'])
    const { error } = authorValidateAdd(authorDetails)
    if(error) return status.bad_app(error,res)
    const findArticle =  await schemaArticle.findById(_.pick(authorDetails, ['_id']))
    if(!findArticle) status.bad_app('Author Not Found',res)
    try {
        findArticle.author.push(_.pick(authorDetails, ['name']))
        findArticle.save()
        status.success_app('Author Saved',res)
    } catch (error) {
        status.bad_app('Cant Added Author',res)
    }

}

async function update_article(req,res){
    const validateID ={}
    validateID['_id'] = parseInt(req.query._id)
    var { error } = articleValidateParams(validateID)
    if(error) return status.bad_app(error,res)  
    const articleDetails = _.pick(req.body, ['summary','title','subtitle','detail'])
    const { articleValidateUpdate } = require('./../validation/article')
    var { error } = articleValidateUpdate(articleDetails)
    articleDetails.title = convertAny(articleDetails.title)
    articleDetails.subtitle = convertAny(articleDetails.subtitle)
    if(error) return status.bad_app(error,res)
    const filter = { _id: validateID['_id'] };
    try {
        await schemaArticle.findOneAndUpdate(filter, articleDetails);
        status.success_app('Article Saved',res)
    } catch (error) {
        status.bad_app(error.codeName,res)
    }
 

}
async function delete_article(req,res){
    const articleDetails= {}
    articleDetails['_id'] = parseInt(req.query._id)
    const { error } = articleValidateParams(articleDetails)
    if(error) return status.bad_app(error,res)
    try {
       const delArticle = await schemaArticle.findOneAndRemove(articleDetails);
        if(!delArticle)  return status.bad_app('Cant Find Article',res)
        status.success_app('Article Deleted',res)
    } catch (error) {
        status.bad_app('Cant Update Article',res)
    }
}

async function detail_article(req,res){
    const articleDetails= {}
    articleDetails['_id'] = parseInt(req.query._id)
    const { error } = articleValidateParams(articleDetails)
    if(error) return status.bad_app(error,res)
    const findArticle = await schemaArticle.findOne(articleDetails);
    if(!findArticle)  status.bad_app('Article Not Found',res)
    status.success_app(findArticle,res)

    
}

module.exports={
    detail_article:detail_article,
    list_article:list_article,
    add_article:add_article,
    update_article:update_article,
    delete_article:delete_article,
    delete_author:delete_author,
    add_author:add_author
}