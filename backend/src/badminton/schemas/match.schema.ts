import * as mongoose from 'mongoose';
import { MemberSchema } from './member.schema';

export const MatchSchema = new mongoose.Schema({
  teamA: {
    score: Number,
    totalStrategy: Number,
    teamMember: [MemberSchema],
  },
  teamB: {
    score: Number,
    totalStrategy: Number,
    teamMember: [MemberSchema],
  },
  createAt: Date,
});
