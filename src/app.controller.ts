import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { RegisterDto } from './dto/register';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  async register(@Body() registerBody: RegisterDto): Promise<void> {
    return this.appService.registerUser(registerBody);
  }
}
