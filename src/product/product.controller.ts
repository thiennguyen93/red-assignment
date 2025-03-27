import { Controller } from '@nestjs/common';
import { ProductService } from './product.service';
import { ApiTags } from '@nestjs/swagger';
import { Crud } from '@dataui/crud';
import { Product } from './product.entity';

@Controller('product')
@ApiTags('Product')
@Crud({
  model: {
    type: Product,
  },
  routes: {
    only: [
      'getManyBase',
      'getOneBase',
      'createOneBase',
      'updateOneBase',
      'deleteOneBase',
    ],
  },
  query: {
    softDelete: true,
    alwaysPaginate: true,
    join: {
      category: {
        eager: true,
      },
    },
  },
})
export class ProductController {
  constructor(public service: ProductService) {}
}
