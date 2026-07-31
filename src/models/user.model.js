const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.pre("save", async function (next) {

  if (!this.isModified("password")) return next();

  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  
});

userSchema.methods.comparePassword = async function(password){
  const isMatch = await bcrypt.compare(password, this.password)
  return isMatch
}


const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
