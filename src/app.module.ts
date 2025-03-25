import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './product/product.module';
import { ContentfulModule } from './contentful/contentful.module';
import { CronModule } from './cron/cron.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) =>{
        const dbUrl = config.get<string>('DATABASE_URL');
        if (!dbUrl) {
          throw new Error('DATABASE_URL not found in environment');
        }

        return {
          type: 'postgres',
          url: dbUrl,
          autoLoadEntities: true,
          synchronize: true,
        };
      },
    }),
    ProductModule,
    ContentfulModule,
    CronModule,
  ],
})
export class AppModule {}
