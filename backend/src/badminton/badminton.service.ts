import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { AddMemberDto } from './dto/add-member.dto';
import { MemberJoinDto } from './dto/member-join.dto';
import { Match } from './interfaces/match.interface';
import { Mmeber } from './interfaces/member.interface';
import { MemberModel } from './model/member.model';

@Injectable()
export class BadmintonService {
  constructor(
    @Inject('MEMBER_MODEL')
    private readonly memberModel: Model<Mmeber>,
    @Inject('MATCH_MODEL')
    private readonly matchModel: Model<Match>,
  ) { }

  /**
   * Get all member list
   */
  public async getMemberList(): Promise<Mmeber> {
    const data = await this.memberModel.find();
    return data;
  }

  /**
   * Get total join list
   */
  public async getTotalJoin(): Promise<any> {
    return await this.memberModel.find().toArray((err, result) => {
      const responseTotal = result.filter((el) => {
        return el.isJoin === true;
      });
      return { total: responseTotal.length };
    },
    );
  }

  /**
   * Get team details
   */
  public async getTeam(): Promise<Match> {
    try {
      const date = new Date();
      date.setDate(date.getDate() - 1);
      const data = await this.matchModel.find().find({
        createAt: {
          $gte: date,
          $lt: new Date(),
        },
      }).toArray();
      if (data.length > 0) {
        return data[0];
      } else {
        throw new HttpException('Team not found', HttpStatus.NOT_FOUND);
      }
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get team details
   */
  public async generateTeam(): Promise<Match> {
    try {
      return await new Promise(async (resolve, reject) => {
        const date = new Date();
        date.setDate(date.getDate() - 1);
        const data = await this.matchModel.find({
          createAt: {
            $gte: date,
            $lt: new Date(),
          },
        }).toArray();
        if (data.length > 0) {
          resolve(data[0]);
        } else {
          await this.memberModel.find().toArray(async (err, result) => {
            const resData = result.filter((el) => {
              return el.isJoin === true;
            });
            const matchDetail = await this.getGenerateTeam(resData);
            this.matchModel.save(matchDetail, (err, res) => {
              resolve(matchDetail);
            });
          });
        }
      });
    } catch (error) {
      throw error;
    }
  }

  /**
   * Add new member
   */
  public async addMember(addMemberDto: AddMemberDto): Promise<Match> {
    try {
      const memberModel: MemberModel = Object.assign(new MemberModel(), {
        name: addMemberDto.name,
        strategy: addMemberDto.strategy,
        isJoined: addMemberDto.isJoined,
        imgPath: addMemberDto.imgPath,
      });
      return await this.memberModel.save(memberModel);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Member join
   */
  public async memberJoin(memberJoinDto: MemberJoinDto): Promise<Match> {
    try {
      const memberDB = await this.memberModel.findOne({ _id: memberJoinDto.id });
      memberDB.isJoin = memberJoinDto.isJoined;
      return await memberDB.save();
    } catch (error) {
      throw error;
    }
  }

  public async getGenerateTeam(memberList) {
    const responseData = await this.generateTeamLogic(memberList);
    const matchDetail = { teamA: { score: 0, teamMember: responseData.teamA, totalStrategy: responseData.totalStrategyA },
    teamB: { score: 0, teamMember: responseData.teamB, totalStrategy: responseData.totalStrategyB }, createAt: new Date() };
    return matchDetail;
  }

  public async generateTeamLogic(memberList) {

    memberList = this.shuffle(memberList);
    let totalStrategyA = 0;
    let totalStrategyB = 0;

    const teamA = [];
    const teamB = [];

    for (const member of memberList) {
      if (totalStrategyA <= totalStrategyB && teamA.length <= teamB.length) {
        teamA.push(member);
        totalStrategyA += member.strategy;
      } else {
        teamB.push(member);
        totalStrategyB += member.strategy;
      }
    }

    if (Math.abs(teamA.length - teamB.length) > 1 || Math.abs(totalStrategyA - totalStrategyB) > Number(process.env.STRATEGY_DIFF)) {
      return this.generateTeamLogic(memberList);
    } else {
      return { teamA, teamB, totalStrategyA, totalStrategyB };
    }
  }

  public async shuffle(sourceArray) {
    for (let i = 0; i < sourceArray.length - 1; i++) {
      const j = i + Math.floor(Math.random() * (sourceArray.length - i));

      sourceArray[j] = sourceArray[i];
      sourceArray[i] = sourceArray[j];
    }
    return sourceArray;
  }
}
