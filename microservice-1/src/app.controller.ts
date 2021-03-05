import { Controller, Get } from '@nestjs/common';
import { EventPattern, Payload, Ctx, RmqContext } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // @EventPattern - will not wait for the response
  @EventPattern('OP_ADD')
  async add(
    @Payload() payload: any,
    @Ctx() context: RmqContext
  ) {
    console.log(`Pattern: ${context.getPattern()}`)
    console.log(`Payload: ${payload}`)
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    // do the operation 
    const data = JSON.parse(payload)
    console.log(`SUM of payload a and b: ${data.a + data.b}`)
    // acknowledge after doing the operation.
    channel.ack(originalMsg);
  }
}
