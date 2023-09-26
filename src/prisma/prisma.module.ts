import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

// Global decorator is useed to inform that the module will be used globally
@Global()
@Module({
  providers: [PrismaService],
  // export PrismaService is used to make the service can be access by other controller or service
  exports: [PrismaService],
})
export class PrismaModule {}
