const express = require("express");

const BookModel = require("../modals/book.model");
const { authenticate } = require("../middlewares/authentication");
const { authorization } = require("../middlewares/authorization");

const bookRouter = express.Router();

bookRouter.get("/",async (req,res)=>{
   try {
    let params = {};
    const {author, category} = req.body;
    if(author){
        params.author = author;
    }
    if(category){
        params.category = category;
    }
    let books = await BookModel.find(params);
    res.status(200).send(books);
   } catch (error) {
    res.status(500).send({"msg":"someting went wrong, please try again later!!"});
   }
});

bookRouter.post("/",authenticate,authorization(true), async (req,res)=>{
    try {
        let data = req.body;
        const {title,
            author,
            category,
            price,
            quantity} = data;
        
        if(!title || !author || !category || !price || !quantity){
            return res.status(400).send({"mgs":"please fill all the fields.."})
        }
        const new_book = new BookModel(data);
        await new_book.save();
        res.status(201).send({"msg" : "Note created successfully", new_book})
    } catch (err) {
        console.log(err)
        res.send({"err" : "Something went wrong"})
    }
});

bookRouter.get("/:id",async (req,res)=>{
    try {
        const param = req.params.id;
        console.log(param);
        if(!param){
            return res.send({"msg":"please provide the id first"})
        }
        const book = await BookModel.findById(param);
        res.status(200).send(book);
    } catch (err) {
        console.log(err)
        res.send({"err" : "Something went wrong"})
    }
})

bookRouter.patch("/:id",authenticate,authorization(true),async (req,res)=>{
    try {
        const param = req.params.id;
        console.log(param);
        if(!param){
            return res.send({"msg":"please provide the id first"})
        }
        const book = await BookModel.findByIdAndUpdate(param, req.body, {new: true});
        res.status(201).send(book);
    } catch (err) {
        console.log(err)
        res.send({"err" : "Something went wrong"})
    }
})

bookRouter.delete("/:id",authenticate,authorization(true),async (req,res)=>{
    try {
        const param = req.params.id;
        console.log(param);
        if(!param){
            return res.send({"msg":"please provide the id first"})
        }
        const book = await BookModel.findByIdAndDelete(param, req.body);
        if(book){
            res.status(201).send({"msg":"Deleted Successfully"});
        }else{
            res.status(400).send({"msg":"deletion failed"});
        }
    } catch (err) {
        console.log(err)
        res.send({"err" : "Something went wrong"})
    }
})

module.exports = {
    bookRouter
}
//
