import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../product/entities/product.entity';
import { Between, IsNull, Not, Repository } from 'typeorm';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Product)
    private readonly repo: Repository<Product>,
  ) {}

  async deletedPercentage() {
    const total = await this.repo.count();
    const deleted = await this.repo.count({ where: { deleted: true } });
    return {
      deleted,
      total,
      percentage: total ? (deleted / total) * 100 : 0,
    };
  }

  async withOrWithoutPrice(hasPrice: boolean) {
    const total = await this.repo.count({ where: { deleted: false } });
    const filtered = await this.repo.count({
      where: {
        deleted: false,
        price: hasPrice ? Not(IsNull()) : IsNull(),
      },
    });
    return {
      filtered,
      total,
      percentage: total ? (filtered / total) * 100 : 0,
    };
  }

  async inDateRange(from: string, to: string) {
    const result = await this.repo.count({
      where: {
        deleted: false,
        createdAt: Between(new Date(from), new Date(to)),
      },
    });
    return { count: result };
  }

  async mostCommonCategory() {
    const result = await this.repo
      .createQueryBuilder('product')
      .select('product.category', 'category')
      .addSelect('COUNT(*)', 'count')
      .where('product.deleted = false')
      .groupBy('product.category')
      .orderBy('count', 'DESC')
      .limit(1)
      .getRawOne();

    return {
      category: result?.category ?? null,
      count: parseInt(result?.count ?? '0', 10),
    };
  }
}
