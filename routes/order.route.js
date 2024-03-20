const express = require("express");
const { authenticate } = require("../middlewares/authentication");
const { authorization } = require("../middlewares/authorization");
const OrderModel = require("../modals/order.model");

const orderRouter = express.Router();

orderRouter.post("/order",authenticate,async (req,res)=>{
   try {
    const payload = req.body;
    const {user, books, totalAmount } = payload;
    if(!user || !books.length || !totalAmount){
       return res.status.send({"msg":"please fill all the fields"})
    }
    const order = await OrderModel.create(payload);
    return res.status(201).send(order);
   } catch (err) {
     res.send({"msg":"something went wrong.."})
   }
})

orderRouter.get("/orders",authenticate,authorization(true), async (req,res)=>{
    try {
        const allOrders = await OrderModel.find().populate("user").populate("books");
        res.send(allOrders);
    } catch (err) {
        res.send({"msg":"something went wrong.."})
    }
})


module.exports =  orderRouter;