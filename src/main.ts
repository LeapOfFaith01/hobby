import { NestFactory } from '@nestjs/core';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerDocumentOptions, SwaggerModule } from '@nestjs/swagger/dist';
import { AppModule } from './app.module';
import { PrismaService} from './database/PrismaService';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /**
   * Prisma Setup
   */
  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  /**
   * Swagger Setup
   */

  const config = new DocumentBuilder()
  .setTitle('API Documentation')
  .setDescription('Work in progress')
  .setVersion('0.0.1-snapshot')
  .build();
  const options: SwaggerDocumentOptions = {
    operationIdFactory:(
      controllerKey:string,
      methodKey: string
    ) => methodKey
  }
  const document = SwaggerModule.createDocument(app,config, options);
  SwaggerModule.setup('',app,document);


  await app.listen(3000);
}
bootstrap();
