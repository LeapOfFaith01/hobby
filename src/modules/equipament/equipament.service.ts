import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Response } from 'express';
import { PrismaService } from 'src/database/PrismaService';

@Injectable()
export class EquipamentService {
    constructor(private prisma:PrismaService){}

    async create(data:Prisma.EquipamentCreateInput){
        return this.prisma.equipament.create({
            data
        }).then((e)=>{
            return {status:"created",object:e}
        }).catch((e)=>e);
    }

    async update(id:string,data:Prisma.EquipamentUpdateInput,res:Response){
        return this.prisma.equipament.update({
            data,
            where:{
                id
            }
        })
          .then(()=>{return res.status(204).send();})
          .catch((e) =>{
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
