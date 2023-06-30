import { describe, expect, test } from 'vitest'
import { Chatroom, User } from './mediator'

describe('mediator', function () {
  test('when a user sends a message, other users in the chatroom should receive that message', function () {
    // Arrange
    const chatroom = new Chatroom()

    const userWhichSendsMessage = new User(chatroom)
    const userWhichReceivesMessage = new User(chatroom)
    const userWhichReceivesMessage2 = new User(chatroom)

    // Act
    userWhichSendsMessage.send('hello world')

    // Assert
    expect(userWhichSendsMessage.sentMessages).toEqual(['hello world'])
    expect(userWhichSendsMessage.receivedMessages).toEqual([])
    expect(userWhichReceivesMessage.sentMessages).toEqual([])
    expect(userWhichReceivesMessage.receivedMessages).toEqual(['hello world'])
    expect(userWhichReceivesMessage2.sentMessages).toEqual([])
    expect(userWhichReceivesMessage2.receivedMessages).toEqual(['hello world'])
  })
})
