import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  private static isConnected = false;

  async onModuleInit() {
    if (!PrismaService.isConnected) {
      await this.$connect().then(() => {
        console.log('Database connected');
        PrismaService.isConnected = true; 
      });
    }
  }
}
