const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  isAdmin: {type: Boolean, default: false}
})

const UserModel = mongoose.model("user", userSchema)

module.exports = {
    UserModel
}