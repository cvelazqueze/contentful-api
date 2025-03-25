import { Module } from '@nestjs/common';
import { ContentfulService } from './contentful.service';
import { ConfigModule } from '@nestjs/config';
import { ProductModule } from 'src/product/product.module';

@Module({
  imports: [ConfigModule, ProductModule],
  providers: [ContentfulService],
  exports: [ContentfulService],
})
export class ContentfulModule {}
