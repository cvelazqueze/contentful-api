import { Module } from '@nestjs/common';
import { CronService } from './cron.service';
import { ScheduleModule } from '@nestjs/schedule';
import { ContentfulModule } from 'src/contentful/contentful.module';

@Module({
  imports: [ScheduleModule.forRoot(), ContentfulModule],
  providers: [CronService],
})
export class CronModule {}
