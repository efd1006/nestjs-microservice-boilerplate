import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {

  constructor(
    @Inject('MICROSERVICE_1_SERVICE') private readonly microservice1Client: ClientProxy,
    @Inject('MICROSERVICE_2_SERVICE') private readonly microservice2Client: ClientProxy

  ) {

  }

  // emit event on microservice 1 - by using .emit() microservice 1 will only process the event and will not return the response
  async add() {
    let data = JSON.stringify({a: 1, b: 2})
    await this.microservice1Client.emit('OP_ADD', data)
  }
  // send on microservice 2 - by using .send() microservice 2 will return an observable with its reponse
  async subtract() {
    let data = JSON.stringify({a: 1, b: 2})
    return await this.microservice2Client.send('OP_SUBTRACT', data)
  }
}
