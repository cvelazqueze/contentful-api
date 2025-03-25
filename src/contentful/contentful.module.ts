import { Module } from '@nestjs/common';
import { ContentfulService } from './contentful.service';
import { ContentfulController } from './contentful.controller';
import { ConfigModule } from '@nestjs/config';
import { ProductModule } from 'src/product/product.module';

@Module({
  imports: [ConfigModule, ProductModule],
  controllers: [ContentfulController],
  providers: [ContentfulService],
  exports: [ContentfulService],
})
export class ContentfulModule {}
