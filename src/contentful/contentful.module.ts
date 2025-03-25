import { Module } from '@nestjs/common';
import { ContentfulService } from './contentful.service';
import { ConfigModule } from '@nestjs/config';
import { ProductModule } from 'src/product/product.module';
import { ContentfulController } from './contentful.controller';

@Module({
  imports: [ConfigModule, ProductModule],
  providers: [ContentfulService],
  exports: [ContentfulService],
  controllers: [ContentfulController],
})
export class ContentfulModule {}
