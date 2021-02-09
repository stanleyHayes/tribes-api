const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        validate: function (value) {
            if(!validator.isEmail(value)){
                throw new Error('Invalid email');
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    tribe: {
        type: Schema.Types.ObjectId,
        ref: 'Tribe',
        required: true
    },
    interests: {
        type: [Schema.Types.ObjectId],
        ref: 'Tribe'
    },
    logins: {
        type: [{
            token: {
                type: String,
                required: true
            },
            created_at: {
                type: Date,
                default: Date.now()
            }
        }]
    },
    status: {
        type: String,
        enum: ['ACTIVE', 'INACTIVE', 'DELETED', 'UNVERIFIED'],
        default: 'UNVERIFIED'
    }
}, {
    timestamps: true,
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
});

userSchema.methods.comparePassword = async function (password)  {
    return await bcrypt.compare(password, this.password);
}

userSchema.pre('save',  async function(next){
    this.password = await bcrypt.hash(this.password, 10);
    await this.save();
    next();
});

userSchema.methods.generateToken = async () => {
    const token = jwt.sign({_id: this._id.toString()}, process.env.JWT_SECRET, {expiresIn: '30d'});
    this.logins = this.logins.concat({token});
    await this.save();
    return token;
}

const User = mongoose.model('User', userSchema);

module.exports = User;