import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';
import { FileRepository } from 'src/infrastructure/file.repository';

export class CreateFolderCommand implements ICommand {
  constructor(
    public readonly data: {
      folderName: string;
      userId: number;
      folderId: number;
    },
  ) {}
}
@CommandHandler(CreateFolderCommand)
export class CreateFolderCommandHandler
  implements ICommandHandler<CreateFolderCommand, void>
{
  constructor(private readonly fileRepository: FileRepository) {}

  async execute({ data }: CreateFolderCommand): Promise<void> {
    const { folderName, userId, folderId } = data;
    const uploadDir = './uploads';

    //check rights to access folder
    await this.fileRepository.isUserFolder({
      userId,
      folderId,
    });

    //check duplicates name in files or folders
    await this.fileRepository.checkDuplicateNames({
      name: folderName,
      folderId: folderId,
    });

    await this.fileRepository.createFolder({ userId, folderId, folderName });
    // await Promise.all([
    //   await fs.writeFile(
    //     uploadDir + '/' + userId + '/' + file.originalname,
    //     file.buffer,
    //     'base64',
    //   ),
    //   await this.fileRepository.addFile({
    //     fileExtensions: file.mimetype,
    //     fileName: file.originalname,
    //     folderId,
    //   }),
    // ]);
  }
}
