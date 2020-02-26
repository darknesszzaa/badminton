import { Connection } from 'mongoose';
import { MatchSchema } from './schemas/match.schema';
import { MemberSchema } from './schemas/member.schema';

export const badmintonProviders = [
  {
    provide: 'MATCH_MODEL',
    useFactory: (connection: Connection) => connection.model('match', MatchSchema),
    inject: ['DATABASE_CONNECTION'],
  },
  {
    provide: 'MEMBER_MODEL',
    useFactory: (connection: Connection) => connection.model('members', MemberSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
