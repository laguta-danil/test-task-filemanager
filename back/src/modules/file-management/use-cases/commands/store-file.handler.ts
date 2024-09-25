import {
  CommandBus,
  CommandHandler,
  ICommand,
  ICommandHandler,
} from '@nestjs/cqrs';
import { promises as fs } from 'fs';

export class StoreFileCommand implements ICommand {
  constructor(public readonly data: any) {}
}
@CommandHandler(StoreFileCommand)
export class BotMyTicketsCommandHandler
  implements ICommandHandler<StoreFileCommand, void>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute({ data }: StoreFileCommand): Promise<void> {
    const uploadDir = './uploads';
    console.log(data, 123123);

    await Promise.all([
      await fs.writeFile(
        uploadDir + '/' + data.originalname,
        data.buffer,
        'base64',
      ),
    ]);
  }
}
