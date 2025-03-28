import { Controller, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Crud } from '@dataui/crud';
import { Product } from './product.entity';
import { JwtAuthGuard } from 'src/auth/jwt-guard';

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
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
export class ProductController {
  constructor(public service: ProductService) {}
}
