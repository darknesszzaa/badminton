import { Document } from 'mongoose';
import { Mmeber } from './member.interface';

export interface Match extends Document {
  teamA: {
    score: number;
    totalStrategy: number;
    teamMember: [Mmeber];
  };
  teamB: {
    score: number;
    totalStrategy: number;
    teamMember: [Mmeber];
  };
  createAt: Date;
}
