import { Injectable } from '@nestjs/common';
import { ContentfulService } from 'src/contentful/contentful.service';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class CronService {
  constructor(private readonly contentfulService: ContentfulService){}

  @Cron(CronExpression.EVERY_HOUR)
  handleCron(){
    this.contentfulService.syncProductsFromContentful();
  }
}
