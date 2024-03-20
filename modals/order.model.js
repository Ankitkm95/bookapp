const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    books: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"book"
        }
    ],
    totalAmount: Number
})

const OrderModel = mongoose.model("order",orderSchema);

module.exports = OrderModel;