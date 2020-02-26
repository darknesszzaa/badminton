import { IsBoolean, IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';

export class AddMemberDto {

  @IsString()
  @IsNotEmpty()
  public readonly name: string;

  @Min(1)
  @Max(10)
  @IsNumber()
  @IsNotEmpty()
  public readonly strategy: number;

  @IsBoolean()
  @IsNotEmpty()
  public readonly isJoined: boolean;

  @IsString()
  public readonly imgPath: string;
}
