export class MemberModel {
  public teamA: {
    score: number;
    totalStrategy: number;
    teamMember: [MemberModel];
  };
  public teamB: {
    score: number;
    totalStrategy: number;
    teamMember: [MemberModel];
  };
  public createAt: Date;
}
