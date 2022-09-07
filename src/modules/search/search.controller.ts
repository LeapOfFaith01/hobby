import { Controller, Query,Get } from '@nestjs/common';
import { Prisma, prisma } from '@prisma/client';

import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}
  
  @Get('costumer')
  async getCostumer(@Query('take') take:number,@Query('skip') skip:number,@Query('sort') sort:Prisma.SortOrder, @Query("search") search:string){
    return this.searchService.getCostumers({take,skip,search,sort});
  }
  @Get('equipaments')
  async getEquipaments(@Query('take') take:number,@Query('skip') skip:number,@Query('sort') sort:Prisma.SortOrder, @Query("search") search:string){
    return this.searchService.getEquipaments({take,skip,search,sort});
  }
  @Get('budgets')
  async getBugdets(@Query('take') take:number,@Query('skip') skip:number,@Query('sort') sort:Prisma.SortOrder, @Query("search") search:string){
    return this.searchService.getBudgets({take,skip,search,sort});
  }
  @Get('payments')
  async getPayments(@Query('take') take:number,@Query('skip') skip:number,@Query('sort') sort:Prisma.SortOrder, @Query("search") search:string){
    return this.searchService.listPayments({take,skip,search,sort});
  }
}
