import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
    name: String,
    email: {
        type: String,
        required: true,
        match: /.+\@.+\..+/,
        unique: true
    },
    password: String,
});

const User = mongoose.model('users', userSchema);

export default User;