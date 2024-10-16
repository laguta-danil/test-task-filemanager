import { HttpException, HttpStatus } from '@nestjs/common';
import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';
import { promises as fs } from 'fs';
import { FileRepository } from 'src/infrastructure/file.repository';

export class StoreFileCommand implements ICommand {
  constructor(
    public readonly data: {
      file: Express.Multer.File;
      userId: number;
      folderId: number;
    },
  ) {}
}
@CommandHandler(StoreFileCommand)
export class StoreFileCommandHandler
  implements ICommandHandler<StoreFileCommand, void>
{
  constructor(private readonly fileRepository: FileRepository) {}

  async execute({ data }: StoreFileCommand): Promise<void> {
    const { file, userId, folderId } = data;
    const uploadDir = './uploads';

    //check rights to access folder
    await this.fileRepository.isUserFolder({
      userId,
      folderId,
    });

    //check duplicates name in files or folders
    await this.fileRepository.checkDuplicateNames({
      name: file.originalname,
      folderId,
    });

    try {
      await fs.mkdir(uploadDir + '/' + userId, { recursive: true });
    } catch (error) {
      console.error(`Failed to create directory ${uploadDir}:`, error);
    }

    await Promise.all([
      await fs.writeFile(
        uploadDir + '/' + userId + '/' + file.originalname,
        file.buffer,
        'base64',
      ),
      await this.fileRepository.addFile({
        fileExtensions: file.mimetype,
        fileName: file.originalname,
        folderId,
      }),
    ]);
  }
}
