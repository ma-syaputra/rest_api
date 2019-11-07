'use strict'

const mongoose= require('mongoose')
const db = process.env.MONGO_URL || 'mongodb+srv://putra:detik2019@cluster0-ujm0z.gcp.mongodb.net/detik'

mongoose.connect(db,{useNewUrlParser: true,useFindAndModify: false,useCreateIndex: true})
var dbm = mongoose.connection;
dbm.on('error', console.error.bind(console, 'MongoDB connection error:'));



const {convertLocal} = require('./../helper/localtime')
const definitionSchema = {
    _id: {
        type: Number,
        required : true
    },
    title : {
        type:String,
        required : true,
        minlength: 2,
        maxlength: 100,
        index: {
            unique: true,
            dropDups: true
        }
    },
    subtitle : {
        type:String,
        required : true,
        minlength: 2,
        maxlength: 100
    },
    summary: {
        type:String,
        required : true,
        minlength: 2,
        maxlength: 200
    },
    detail: {
        type:String,
        required : true,
        minlength: 2
    },
    author: [{
        name: { 
            type: String
         }
    }],
    created_at : {
        type:Date,
        default: convertLocal
    },
    last_updated:{
        type:Date
    }
};


var CounterArticleSchema= {
    _id: {type: String, required: true},
    seq: { type: Number, default: 0 }
}
const articleSchema = mongoose.model('article', definitionSchema)
const CounterSchema = mongoose.model('counters',CounterArticleSchema)

module.exports = {
    articleSchema: articleSchema,
    CounterSchema:CounterSchema
}