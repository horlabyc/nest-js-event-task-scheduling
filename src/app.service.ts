import { Injectable, Logger } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { Cron, CronExpression, Interval } from '@nestjs/schedule';
import { RegisterDto } from './dto/register';
import { UserRegisteredEvent } from './events/register-user';

@Injectable()
export class AppService {
  constructor(private readonly eventEmitter: EventEmitter2) {}
  private readonly logger = new Logger(AppService.name);
  getHello(): string {
    return 'Hello World!';
  }

  registerUser(payload: RegisterDto): void {
    this.logger.log('Creating user...', payload);
    this.eventEmitter.emit(
      'new_registered_user',
      new UserRegisteredEvent('uuid', payload.email),
    );
  }

  @OnEvent('new_registered_user')
  sendEmail(payload: UserRegisteredEvent) {
    this.logger.log('Sending mail to new user', payload.email);
  }

  @OnEvent('new_registered_user', { async: true })
  async welcomeUser(payload: UserRegisteredEvent) {
    this.logger.log('Sending mail to welcome new user', payload.email);
    await new Promise<void>((resolve) => setTimeout(() => resolve(), 3000));
    this.logger.log('Mail sent to new user', payload.email);
  }

  @Cron(CronExpression.EVERY_DAY_AT_10PM)
  async updateUserInfo() {
    this.logger.log('Updating user info');
  }

  @Interval(10000)
  handleInterval() {
    this.logger.debug('Called every 10 seconds');
  }
}
