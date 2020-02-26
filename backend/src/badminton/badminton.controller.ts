import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { BadmintonService } from './badminton.service';
import { AddMemberDto } from './dto/add-member.dto';
import { MemberJoinDto } from './dto/member-join.dto';
import { MemberDto } from './dto/member.dto';
import { TotalJoinDto } from './dto/total-join.dto';

@Controller('badminton')
export class BadmintonController {
  constructor(private readonly badmintonService: BadmintonService) { }

  /**
   * Get all member list
   */
  @Get('members')
  public async getMemberList() {
    try {
      const responseMessage = await this.badmintonService.getMemberList();
      const dataResponse = new MemberDto();
      return dataResponse.toResponse(responseMessage);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get total join list
   */
  @Get('total-join')
  public async getTotalJoin() {
    try {
      const responseMessage = await this.badmintonService.getTotalJoin();
      const dataResponse = new TotalJoinDto();
      return dataResponse.toResponse(responseMessage);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get team details
   */
  @Get('teams')
  public async getTeam() {
    try {
      const responseMessage = await this.badmintonService.getTeam();
      const dataResponse = new TotalJoinDto();
      return dataResponse.toResponse(responseMessage);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get team details
   */
  @Post('generate-team')
  public async generateTeam() {
    try {
      const responseMessage = await this.badmintonService.generateTeam();
      const dataResponse = new TotalJoinDto();
      return dataResponse.toResponse(responseMessage);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Add new member
   */
  @Post('add-member')
  public async addMember(@Body() data: AddMemberDto) {
    try {
      const responseMessage = await this.badmintonService.addMember(data);
      const dataResponse = new MemberDto();
      return dataResponse.toResponse(responseMessage);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Member join
   */
  @Put('member-join')
  public async memberJoin(@Body() data: MemberJoinDto) {
    try {
      const responseMessage = await this.badmintonService.memberJoin(data);
      const dataResponse = new MemberDto();
      return dataResponse.toResponse(responseMessage);
    } catch (error) {
      throw error;
    }
  }

}
