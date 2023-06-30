import { describe, expect, it } from 'vitest'
import { TextEditor } from './memento'

describe('memento', () => {
  it('should save and restore text editor state', () => {
    // Arrange
    const textEditor = new TextEditor('initial text')
    const memento = textEditor.save()
    textEditor.writeText('new text')

    // Act
    textEditor.restore(memento)

    // Assert
    expect(textEditor.getText()).toEqual('initial text')
  })
})
