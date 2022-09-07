import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Response } from 'express';
import { PrismaService } from 'src/database/PrismaService';

@Injectable()
export class BudgetService {
    constructor(private prisma:PrismaService,){}
    async update(id:string, data:Prisma.BudgetUpdateInput,res:Response){
        return this.prisma.budget.update({
            data,
            where:{
                id
            }
        }).then(()=>{return res.status(204).send()}).catch((e)=>{
            if(e.code =='P2025') return res.status(404).json({code:e.code,message:'Não foi possível encontrar o registro com a chave informada'});
            return res.status(500).json({code:'UNKNOW',message:"Algo inesperado aconteceu e não conseguimos completar a sua solicitação"});
        })
    }
}
