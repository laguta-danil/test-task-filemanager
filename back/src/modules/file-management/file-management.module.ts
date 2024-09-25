import { Module, OnModuleInit } from '@nestjs/common';
import { FileManagementController } from './file-management.controller';
import { PrismaService } from 'src/providers/database/prisma.service';
import { CqrsModule } from '@nestjs/cqrs';
import { BotMyTicketsCommandHandler } from './use-cases/commands/store-file.handler';
import { promises as fs } from 'fs';

const fileManagementCommandHandlers = [BotMyTicketsCommandHandler];

@Module({
  imports: [CqrsModule],
  controllers: [FileManagementController],
  providers: [PrismaService, ...fileManagementCommandHandlers],
})
export class FileManagementModule implements OnModuleInit {
  async onModuleInit(): Promise<void> {
    const uploadDir = './uploads';

    try {
      await fs.mkdir(uploadDir, { recursive: true });
    } catch (error) {
      console.error(`Failed to create directory ${uploadDir}:`, error);
    }
  }
}
