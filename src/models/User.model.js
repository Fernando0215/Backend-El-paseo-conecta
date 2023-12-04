const mongoose = require ("mongoose");
const Schema = mongoose.Schema;

const crypto = require("crypto");
const debug = require("debug")("app:user-model");

const userSchema = new Schema({
    userName: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    userEmail: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true 
    }, 
    userHashedPassword: {
        type: String,
        required: true
    }, salt: {
        type: String
    }, 
    token: {
        type: [String],
        default: []
    }
}, {timestamps: true});

userSchema.methods = {
    encryptPassword: function (password){
        if (!password) return "";

        try {
            const _passqoerd = crypto.pbkdf2Sync(
                password,
                this.salt,
                1000, 64,
                `sha512`
            ).toString("hex");

            return _passqoerd;
        } catch (error) {
            debug({error});
            return "";
        }
    },
    makeSalt: function() {
        return crypto.randomBytes(16).toString("hex");
    },
    comparePassword: function(){
        return this.userHashedPassword === this.encryptPassword(password);
    }
}

userSchema
    .virtual("password")
    .set(function(password = crypto.randomBytes(18).toString()) {
        this.salt = this.makeSalt();
        this.userHashedPassword = this.encryptPassword(password);   
    });

module.exports = mongoose.model("User", userSchema);