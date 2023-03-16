import mongoose from 'mongoose';

const { Schema } = mongoose;

const playingSchema = new Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true, unique: true },
    article1: { type: String, required: true },
    article2: { type: String, required: true },
    views1: { type: Number, default: 0, required: true },
    views2: { type: Number, default: 0, required: true },
    url1: { type: String, required: true },
    url2: { type: String, required: true },
});

const Playing = mongoose.model('playing', playingSchema);

export default Playing;