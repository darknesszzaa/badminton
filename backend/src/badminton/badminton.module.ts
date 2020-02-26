import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { BadmintonController } from './badminton.controller';
import { badmintonProviders } from './badminton.providers';
import { BadmintonService } from './badminton.service';

@Module({
  imports: [DatabaseModule],
  providers: [BadmintonService, ...badmintonProviders],
  controllers: [BadmintonController],
})
export class Badmintonodule { }
