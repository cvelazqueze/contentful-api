import { Controller, Post } from "@nestjs/common";
import { ContentfulService } from "./contentful.service";

@Controller('dev-sync')
export class ContentfulController {
    constructor(private readonly contentfulService: ContentfulService){}

    @Post()
    async triggerManualSync(){
        await this.contentfulService.syncProductsFromContentful();
        return { message: 'Contentful sync completed'};
    }
}