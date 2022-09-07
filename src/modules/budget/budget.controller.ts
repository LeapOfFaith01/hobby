import { Body, Controller, Param, Put } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Response } from 'express';
import { BudgetService } from './budget.service';

@Controller('budget')
export class BudgetController {
  constructor(private readonly budgetService: BudgetService) {}

  @Put(':id')
  async update(@Param('id') id:string, @Body() data:Prisma.BudgetUpdateInput,res:Response){
    return this.budgetService.update(id,data,res);
  }
}
