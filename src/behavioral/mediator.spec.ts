import { describe, expect, test } from 'vitest'
import { Chatroom, User } from './mediator'

describe('mediator', function () {
  test('when a user sends a message, other users in the chatroom should receive that message', function () {
    const chatroom = new Chatroom()
    const users: User[] = []

    users.push(new User(chatroom, 'userWhichSendsMessage'))
    users.push(new User(chatroom, 'userWhichReceivesMessage'))
    users.push(new User(chatroom, 'userWhichReceivesMessage2'))

    users.forEach(user => {
      chatroom.register(user)
    })

    users[0].send('hello world')

    expect(users[0].sentMessages).toEqual(['hello world'])
    expect(users[0].receivedMessages).toEqual([])
    expect(users[1].sentMessages).toEqual([])
    expect(users[1].receivedMessages).toEqual(['hello world'])
    expect(users[2].sentMessages).toEqual([])
    expect(users[2].receivedMessages).toEqual(['hello world'])
  })
})
