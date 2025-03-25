import { PartialType } from '@nestjs/swagger';
import { CreateContentfulDto } from './create-contentful.dto';

export class UpdateContentfulDto extends PartialType(CreateContentfulDto) {}
