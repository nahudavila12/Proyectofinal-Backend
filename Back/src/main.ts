import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common'; 

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  
  app.useGlobalPipes(new ValidationPipe({
    transform: true, 
    whitelist: true,  
    forbidNonWhitelisted: true, 
  }));

  const config = new DocumentBuilder()
    .setTitle('PF documentation')
    .setDescription('proyecto final SoyHenry')
    .setVersion('1.0')
    .build();

    app.enableCors({
      origin: 'http://localhost:3000/', 
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true, 
    });
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3001);
}
bootstrap();