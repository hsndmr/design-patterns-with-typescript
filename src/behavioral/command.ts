interface Command {
  execute: () => void
}

export class FileManager {
  createdFiles: string[] = []
  deletedFiles: string[] = []
  createFile (name: string): void {
    this.createdFiles.push(name)
  }

  deleteFile (name: string): void {
    this.deletedFiles.push(name)
  }
}

export class CreateFileCommand implements Command {
  constructor (private readonly fileManager: FileManager, private readonly name: string) {}

  execute (): void {
    this.fileManager.createFile(this.name)
  }
}

export class DeleteFileCommand implements Command {
  constructor (private readonly fileManager: FileManager, private readonly name: string) {}

  execute (): void {
    this.fileManager.deleteFile(this.name)
  }
}

export class FileCommandInvoker {
  commands: Command[] = []

  addCommand (command: Command): void {
    this.commands.push(command)
  }

  executeCommands (): void {
    this.commands.forEach(command => { command.execute() })
    this.commands = []
  }
}
