import mongoose from 'mongoose';

const { Schema } = mongoose;

const rankingSchema = new Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
    total_points: { type: Number, default: 0 },
    total_win_streaks: { type: Number, default: 0 },
    last_win_streak: { type: Number, default: 0 },
});

const Ranking = mongoose.model('ranking', rankingSchema);

export default Ranking;