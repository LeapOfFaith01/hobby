import { Body, Controller, Get, Param, Post, Put, Res } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Response } from 'express';
import { CostumerService } from './costumer.service';

@Controller('costumer')
export class CostumerController {
  constructor(private readonly costumerService: CostumerService) {}

  @Post()
  async createCostumer(@Body() data: Prisma.CustomerCreateInput){
    return this.costumerService.create(data);
  }

  @Put('/:id')
  async updateCostumer(@Param('id') id: string,@Body() data: Prisma.CustomerUpdateInput, @Res() res:Response){
    return this.costumerService.update(id,data,res);
  }

  @Get()
  async getAll(){
    return this.costumerService.getAll();
  }
}
