'user strict';
const mongoose = require('mongoose');
const bcrypt=require('bcrypt')

const usersSchema = mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true }

});
usersSchema.pre('save', async function() {
    
    this.password = await bcrypt.hash(this.password, 10);
    
});
const Users = mongoose.model('user', usersSchema);

module.exports = Users