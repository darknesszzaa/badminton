import { BaseDto } from './base.dto';

export class TotalJoinDto extends BaseDto {
  public total: number;

  constructor() {
    super();
    this._mapper = {
      total: 'total',
    };
  }
}
