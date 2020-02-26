import { IsBoolean, IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';

export class MemberJoinDto {

  @IsString()
  @IsNotEmpty()
  public readonly id: string;

  @IsBoolean()
  @IsNotEmpty()
  public readonly isJoined: boolean;
}
