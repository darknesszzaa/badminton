import { Module } from '@nestjs/common';
import { Badmintonodule } from './badminton/badminton.module';

@Module({
  imports: [Badmintonodule],
})
export class AppModule { }
