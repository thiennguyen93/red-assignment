import { Crud } from '@dataui/crud';
import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Category } from './category.entity';
import { CategoryService } from './category.service';

@Controller('category')
@ApiTags('Category')
@Crud({
  model: {
    type: Category,
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
      products: {
        eager: true,
      },
    },
  },
})
export class CategoryController {
  constructor(public service: CategoryService) {}
}
