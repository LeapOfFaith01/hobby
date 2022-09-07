import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { AddressService } from './address.service';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  async addAddress(@Body() data:Prisma.AddressCreateInput){
    return this.addressService.create(data);
  }
  @Put(':id')
  async updatedAddress(@Param('id') id:string, @Body() body:Prisma.AddressUpdateInput){
    return this.addressService.update(id,body);
  }
}
