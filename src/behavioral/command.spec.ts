import { describe, expect, it } from 'vitest'
import { CreateFileCommand, DeleteFileCommand, FileCommandInvoker, FileManager } from './command'

describe('command', () => {
  it('should execute file commands and update file manager accordingly', () => {
    // Arrange
    const fileManager = new FileManager()
    const fileCommandInvoker = new FileCommandInvoker()

    const commands = [
      new CreateFileCommand(fileManager, 'create.txt'),
      new DeleteFileCommand(fileManager, 'delete.txt')
    ]

    commands.forEach(command => { fileCommandInvoker.addCommand(command) })

    // Act
    fileCommandInvoker.executeCommands()

    // Assert
    expect(fileManager.createdFiles).toEqual(['create.txt'])
    expect(fileManager.deletedFiles).toEqual(['delete.txt'])
    expect(fileCommandInvoker.commands).toEqual([])
  })
})
