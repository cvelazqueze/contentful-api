import { Injectable, Logger } from '@nestjs/common';
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
    const products = entries.map(item => {
      const fields = item.fields;

      return {
        sku: fields.sku,
        name: fields.name,
        brand: fields.brand,
        model: fields.model,
        category: fields.category,
        color: fields.color,
        price: fields.price,
        currency: fields.currency,
        stock: fields.stock,
        deleted: false,
      }
    })

    for (const product of products) {
      await this.productService.upsert(product);
    }

    this.logger.log(`Synced ${products.length} products from Contentful API`)

  }
}
