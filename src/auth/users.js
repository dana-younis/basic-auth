'user strict';
const mongoose = require('mongoose');
const bcrypt=require('bcrypt')

const usersSchema = mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true }

});
usersSchema.pre('save', async function() {
    console.log('bedore ',this.password)
    this.password = await bcrypt.hash(this.password, 10);
    console.log('after ',this.password)
});
const Users = mongoose.model('user', usersSchema);

module.exports = Users