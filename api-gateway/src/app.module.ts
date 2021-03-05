import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'MICROSERVICE_1_SERVICE', // service name eg. PAYMENT_SERVICE, AUTH_SERVICE, this will be injected on services later on
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://user:pass@localhost:5673'],
          queue: 'microservice_1_queue', // queue name from microservice
          queueOptions: {
            durable: false
          },
          noAck: false
        }
      },
      {
        name: 'MICROSERVICE_2_SERVICE', // service name eg. PAYMENT_SERVICE, AUTH_SERVICE, this will be injected on services later on
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://user:pass@localhost:5673'],
          queue: 'microservice_2_queue', // queue name from microservice
          queueOptions: {
            durable: false
          },
          noAck: false
        }
      }
    ])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
