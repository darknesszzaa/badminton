import { BaseDto } from './base.dto';

export class MemberDto extends BaseDto {
  public id: string;
  public name: string;
  public strategy: number;
  public isJoin: boolean;
  public imgPath: string;

  constructor() {
    super();
    this._mapper = {
      id: '_id',
      name: 'name',
      strategy: 'strategy',
      isJoin: 'isJoin',
      imgPath: 'imgPath',
    };
  }
}
