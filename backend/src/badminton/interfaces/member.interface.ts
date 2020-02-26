import { Document } from 'mongoose';

export interface Mmeber extends Document {
  name: string;
  strategy: number;
  isJoin: boolean;
  createAt: Date;
  imgPath: string;

}
