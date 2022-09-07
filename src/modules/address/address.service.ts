import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/PrismaService';

@Injectable()
export class AddressService {
    constructor(private prisma:PrismaService){}

    async create(data: Prisma.AddressCreateInput){
        return this.prisma.address.create({
            data:data
        }).then((e)=>e).catch((e)=>e);
    }

    async update(id:string,data:Prisma.AddressUpdateInput){
        return this.prisma.address.update({
            data:data,
            where:{
                id:id
            }
        }).then((a)=>{a}).catch((e)=>{return e;});
    }
}
