import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Reports')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('deleted-percentage')
  getDeletedPercentage() {
    return this.reportsService.deletedPercentage();
  }

  @Get('with-or-without-price')
  getWithOrWithoutPrice(@Query('hasPrice') hasPrice: string) {
    return this.reportsService.withOrWithoutPrice(hasPrice === 'true');
  }

  @Get('date-range')
  getInDateRange(@Query('from') from: string, @Query('to') to: string) {
    return this.reportsService.inDateRange(from, to);
  }

  @Get('common-category')
  getMostCommonCategory() {
    return this.reportsService.mostCommonCategory();
  }
}
