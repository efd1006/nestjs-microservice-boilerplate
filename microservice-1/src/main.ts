import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [`amqp://user:pass@localhost:5673`],
      queue: 'microservice_1_queue',
      queueOptions: {
        durable: false
      },
      noAck: false
    },
  });
  app.listen(() => console.log('Microservice 1 is running.'))
}
bootstrap();
