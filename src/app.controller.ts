import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern('get_hello')
  async getHello(data: Record<string, unknown>): Promise<any> {
    console.log('event received')
    return this.appService.getHello(data);
  }
  @MessagePattern({ cmd: 'get_hello_msg' })
  async getHelloMsg(data: Record<string, unknown>): Promise<any> {
    return this.appService.getHello(data);
  }
}
