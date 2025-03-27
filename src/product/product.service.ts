import { Injectable } from '@nestjs/common';
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

  async findAll(filters: FilterProductsDto) {
    const take = 5;
    const skip = ((filters.page ?? 1) - 1) * take;

    const query = this.repo
      .createQueryBuilder('product')
      .where('product.deleted = false');

      if (filters.name)
      query.andWhere('product.name ILIKE :name', { name: `%${filters.name}%` });
  
      if (filters.category)
        query.andWhere('product.category ILIKE :category', { category: `%${filters.category}%` });
    
      if (filters.brand)
        query.andWhere('product.brand ILIKE :brand', { brand: `%${filters.brand}%` });
    
      if (filters.color)
        query.andWhere('product.color ILIKE :color', { color: `%${filters.color}%` });
    
      if (filters.minPrice !== undefined)
        query.andWhere('product.price >= :minPrice', { minPrice: filters.minPrice });
    
      if (filters.maxPrice !== undefined)
        query.andWhere('product.price <= :maxPrice', { maxPrice: filters.maxPrice });
    
      const [items, total] = await query.skip(skip).take(take).getManyAndCount();

    return {
      items,
      total,
      page: filters.page ?? 1,
      pageSize: take,
      totalPages: Math.ceil(total/take),
    };
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
