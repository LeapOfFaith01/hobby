import { Body, Controller, Param, Post, Put, Res } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Response } from 'express';
import { EquipamentService } from './equipament.service';

@Controller('equipament')
export class EquipamentController {
  constructor(private readonly equipamentService: EquipamentService) {}

  @Post()
  async create(@Body() data:Prisma.EquipamentCreateInput){
    return this.equipamentService.create(data);
  }
  @Put(':id')
  async update(@Param('id') id:string, @Body() data:Prisma.EquipamentUpdateInput, @Res() res:Response){
    return this.equipamentService.update(id,data,res);
  }
}
