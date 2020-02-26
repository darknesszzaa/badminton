import * as mongoose from 'mongoose';

export const MemberSchema = new mongoose.Schema({
  name: String,
  strategy: Number,
  isJoin: Boolean,
  createAt: Date,
  imgPath: String,
});
