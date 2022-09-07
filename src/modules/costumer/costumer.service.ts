import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Response } from 'express';
import { resolve } from 'path';
import { PrismaService } from 'src/database/PrismaService';

@Injectable()
export class CostumerService {
  constructor (private prisma:PrismaService){}

  /*
  * Create a new costumer with address and contact information
  */

  /**
   * @body {
	"name":"From Insomnia",
	"address":{
		"create":{
			"city":"Manaus",
		"state":"Amazonas",
		"district":"Japiim",
		"number":24,
		"streetName":"Rua Alberto Carreira"
		}
	},
	"contacts":{
		"create": {
			"phone":"(92) 98166-5051"
		}
	}
}
   * @param  data 
   * @returns {
	"id": "e0cb605f-44e6-4d16-bf4c-bf25119c6187",
	"name": "From Insomnia"
}
   */
  async create(data: Prisma.CustomerCreateInput) {
    const response = await this.prisma.customer.create({
      data:data
    });

    return response;
  }

  async update(id:string,data: Prisma.CustomerUpdateInput,res:Response){
    return this.prisma.customer.update({
      data:data,
      where:{
        id:id
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

  async getAll(){
    const response = await this.prisma.customer.findMany({
      include:{
        address:{},
        contacts:{},
        equipament:{
          include:{
            budget:{
              include:{
                payments:{}
              }
            }
          }
        }
      }
    });
    return response;
  }
}
