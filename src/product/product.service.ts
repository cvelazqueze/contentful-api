import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { FilterProductsDto } from './dto/filter-products.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private repo: Repository<Product>
  ){}

  async findAll({page = 1, name, category, minPrice, maxPrice}: FilterProductsDto) {
    const take = 5;
    const skip = (page - 1) * take;

    const query = this.repo
      .createQueryBuilder('product')
      .where('product.deleted = false');

    if (name) query.andWhere('product.name ILIKE :name', { name: `%${name}%` });
    if (category) query.andWhere('product.category ILIKE :category', { category: `%${category}%` });
    if (minPrice) query.andWhere('product.price >= :minPrice', { minPrice });
    if (maxPrice) query.andWhere('product.price <= :maxPrice', { maxPrice });

    const [items, total] = await query.skip(skip).take(take).getManyAndCount();

    return { items, total, page, pageSize: take };
  }

  async softDelete(id: string){
    await this.repo.update(id, {deleted: true});
  }

  async upsert(product: Partial<Product>) {
    return this.repo.save(product);
  }

  async findAllRaw(){
    return this.repo.find()
  }

}
