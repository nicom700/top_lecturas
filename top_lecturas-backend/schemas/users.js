import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        min: 3,
        max: 24
    },
    email: {
        type: String,
        required: true,
        min: 6,
        max: 1024,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    avatar: Object,
});

const User = mongoose.model('users', userSchema);

export default User;