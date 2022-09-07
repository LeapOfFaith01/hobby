import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ContactService } from './contact.service';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  async addContact(@Body() data:Prisma.ContactCreateInput){
    return this.contactService.create(data);
  }

  @Put(':id')
  async updateContact(@Param('id') id:string, @Body() data:Prisma.ContactUpdateInput){
    return this.contactService.update(id,data);
  }
}
