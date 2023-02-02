import { Injectable, Logger } from '@nestjs/common';
import {
  Cron,
  CronExpression,
  Interval,
  SchedulerRegistry,
} from '@nestjs/schedule';

@Injectable()
export class TaskService {
  constructor(private readonly schedulerRegistry: SchedulerRegistry) {}
  private readonly logger = new Logger(TaskService.name);
  getHello(): string {
    return 'Hello World!';
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
