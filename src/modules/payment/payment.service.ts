import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Response } from 'express';
import { PrismaService } from 'src/database/PrismaService';

@Injectable()
export class PaymentService {
    constructor(private prisma:PrismaService){}

    async create(data:Prisma.PaymentCreateInput){
        return this.prisma.payment.create({
            data
        }).then((e)=>e).catch((e)=>e);
    }

    async update(id:string,data:Prisma.PaymentUpdateInput,res:Response){
        return this.prisma.payment.update({
            data,
            where:{
                id
            }
        }).then(()=>res.status(204).send()).catch((e)=>{
            if(e.code =='P2025') {return res.status(404).json({
                code:e.code,
                message:'O ID enviado na requisição está incorreto ou não existe.'
              });}
              return res.status(500).json({
                code:500,
                message:'Um erro desconhecido ocorreu e não conseguimos processar sua solicitação'
              })
        });
    }
}
