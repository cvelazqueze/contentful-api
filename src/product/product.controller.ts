import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { ApiTags } from '@nestjs/swagger';
import { FilterProductsDto } from './dto/filter-products.dto';

@ApiTags('Products')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  getAll(@Query() query: FilterProductsDto) {
    return this.productService.findAll(query);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.softDelete(id);
  }
}
