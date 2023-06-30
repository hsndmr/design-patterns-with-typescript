interface Mediator {
  register: (colleague: Colleague) => void
  notify: (sender: Colleague, event: string) => void
}

abstract class Colleague {
  sentMessages: string[] = []
  receivedMessages: string[] = []

  constructor (protected mediator: Mediator) {
    mediator.register(this)
  }

  abstract send (message: string): void

  abstract receive (message: string): void
}

export class Chatroom implements Mediator {
  private readonly colleagues: Colleague[] = []

  register (colleague: Colleague): void {
    this.colleagues.push(colleague)
  }

  notify (sender: Colleague, event: string): void {
    this.colleagues.forEach(colleague => {
      if (colleague !== sender) {
        colleague.receive(event)
      }
    })
  }
}

export class User extends Colleague {
  send (message: string): void {
    this.sentMessages.push(message)
    this.mediator.notify(this, message)
  }

  receive (message: string): void {
    this.receivedMessages.push(message)
  }
}
