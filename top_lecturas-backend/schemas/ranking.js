import mongoose from 'mongoose';

const { Schema } = mongoose;

const rankingSchema = new Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
    total_points: { type: Number, default: 0 },
    total_win_streaks: { type: Number, default: 0 },
    last_win_streak: { type: Number, default: 0 },
});

rankingSchema.virtual('user', {
    ref: 'users',
    localField: 'user_id',
    foreignField: '_id',
    justOne: true,
    options: { select: 'name avatar' }
});

rankingSchema.set('toObject', { virtuals: true });
rankingSchema.set('toJSON', { virtuals: true });

const Ranking = mongoose.model('ranking', rankingSchema);

export default Ranking;