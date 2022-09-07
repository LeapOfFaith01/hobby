import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/PrismaService';

@Injectable()
export class SearchService {
    constructor(private prisma:PrismaService){}

    async getCostumers(
        params: {
            skip?: number;
            take?: number;
            search?: string;
            sort?:Prisma.SortOrder;
          }){
            const { take, skip, search, sort} = params;
            console.log(params);
            console.log(take,skip,sort,search);
        return this.prisma.customer.findMany({
            where:{
                name:{
                    contains:search,
                    mode:'insensitive',
                }
            },
            orderBy:{
                name: sort
            },
            skip:Number(skip) ||undefined,
            take:Number(take)||undefined,
            include:{
                address:{},
                contacts:{},
                equipament:{
                    select:{
                        budget:{
                            select:{
                                payments:{}
                            }
                        }
                    }
                }
            }
        }).then((e)=>e).catch((e)=>e);
    }

    async getEquipaments(params: {
        skip?: number;
        take?: number;
        search?: string;
        sort?:Prisma.SortOrder;
      }){
        const{take,skip,search,sort}=params;
        return this.prisma.equipament.findMany({
            where:{
                // OR:[
                //     {model:{contains:search,mode:'insensitive'}},
                //     {serialNumber:{contains:search,mode:'insensitive'}}
                // ],
                serialNumber:{contains:search, mode:'insensitive'}
            },
            take: Number(take)||undefined,
            skip: Number(skip)||undefined,
            orderBy:{
                model:sort
            },
            include:{
                budget:{
                    include:{
                        payments:{}
                    }
                },
                Customer:{}
            }
        });
    }

    async getBudgets(params: {
        skip?: number;
        take?: number;
        search?: string;
        sort?:Prisma.SortOrder;
      }){
        const {take,skip,search,sort}=params;
        return this.prisma.budget.findMany({
            take:Number(take)||undefined,
            skip:Number(skip)||undefined,
            orderBy:{
                createdAt:sort
            },
            include:{
                Equipament:{},
                payments:{}
            }
        })
    }

    async listPayments(params: {
        skip?: number;
        take?: number;
        search?: string;
        sort?:Prisma.SortOrder;
      }){
        const {take,skip,search,sort} = params;
        return this.prisma.payment.findMany({
            include:{
                Budget:{
                    include:{
                        Equipament:{
                            include:{
                                Customer:{}
                            }
                        }
                    }
                }
            },
            skip:Number(skip)||undefined,
            take:Number(take)||undefined,
            orderBy:{
                paid:sort
            }
        })
      }
}
