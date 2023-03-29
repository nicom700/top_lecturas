import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
    name: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: String,
    avatar: Object,
});

const User = mongoose.model('users', userSchema);

export default User;