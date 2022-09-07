import { Prisma, PrismaClient } from "@prisma/client";
import { Chance } from "chance";
const prisma = new PrismaClient();
var chance = new Chance();
    let data=[];

async function generateData(){
    const costumer = await prisma.customer.create({
        data:{
            name:chance.name(),
            address:{
                create:{
                    city:chance.city(),
                    district:chance.address(),
                    number:chance.integer(),
                    state:chance.state(),
                    streetName:chance.street()
                }
            },
            contacts:{
                create:{
                    phone: chance.phone()
                }
            },
            equipament:{
                create:{
                    serialNumber:chance.bb_pin(),
                    model:chance.word(),
                    budget:{
                        create:{
                            description:chance.sentence(),
                            payments:{
                                create:{
                                    ammout:chance.integer()
                                }
                            }
                        }
                    }
                }
            }
        }
    });

    const response = await prisma.customer.findFirst({
        where:{
            id:costumer.id
        },
        select:{
            address:{},
            contacts:{},
            equipament:{
                select:{
                    budget:{
                        
                    }
                }
            }
        }
    });
    data.push(response);
}
async function main(){
    let promises = [];
    for (let i = 0; i < 10; i++){
        promises.push(generateData());
    }

    return Promise.all(promises);
}

main().then(async () =>{
    console.log(data);
    await prisma.$disconnect();
}).catch(async (e) =>{
    console.error(e)
    await prisma.$disconnect()
    process.exit(1);
})