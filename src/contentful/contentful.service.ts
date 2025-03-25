import { Injectable, Logger } from '@nestjs/common';
import { CreateContentfulDto } from './dto/create-contentful.dto';
import { UpdateContentfulDto } from './dto/update-contentful.dto';
import { ConfigService } from '@nestjs/config';
import { ProductService } from 'src/product/product.service';
import axios from 'axios';

@Injectable()
export class ContentfulService {
  private readonly logger = new Logger(ContentfulService.name);

  constructor(
    private config: ConfigService,
    private productService: ProductService,
  ){}

  async syncProductsFromContentful(): Promise<void> {
    const space = this.config.get('CONTENTFUL_SPACE_ID');
    const token = this.config.get('CONTENTFUL_ACCESS_TOKEN');
    const env = this.config.get('CONTENTFUL_ENVIRONMENT');
    const type = this.config.get('CONTENTFUL_CONTENT_TYPE');

    const url = `https://cdn.contentful.com/spaces/${space}/environments/${env}/entries?access_token=${token}&content_type=${type}`;

    const res = await axios.get(url);

    const entries = res.data.items;
    const products = entries.map(item => ({
      id: item.sys.id,
      name: item.fields.name?.['en-US'] ?? 'Unnamed',
      category: item.fields.category?.['en-US'] ?? 'Uncategorized',
      price: item.fields.price?.['en-US'] ?? null,
      deleted: false,
    }))

    for (const product of products) {
      await this.productService.upsert(product);
    }

    this.logger.log(`Synced ${products.length} products from Contentful API`)

  }

  create(createContentfulDto: CreateContentfulDto) {
    return 'This action adds a new contentful';
  }

  findAll() {
    return `This action returns all contentful`;
  }

  findOne(id: number) {
    return `This action returns a #${id} contentful`;
  }

  update(id: number, updateContentfulDto: UpdateContentfulDto) {
    return `This action updates a #${id} contentful`;
  }

  remove(id: number) {
    return `This action removes a #${id} contentful`;
  }
}
