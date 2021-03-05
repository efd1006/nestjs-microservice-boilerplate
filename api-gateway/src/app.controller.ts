import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('add')
  add() {
    return this.appService.add();
  }

  @Get('subtract')
  async subtract() {
    return await this.appService.subtract();
  }
}
