import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/PrismaService';

@Injectable()
export class ContactService {
    constructor(private prisma:PrismaService){}

    async create(data:Prisma.ContactCreateInput){
        return this.prisma.contact.create({
            data:data
        }).then((e)=>e).catch((e)=>e);
    }
    async update(id:string, data:Prisma.ContactUpdateInput){
        return this.prisma.contact.update({
            data:data,
            where:{
                id:id
            }
        }).then((e)=>e).catch((e)=>e);
    }
}
