export class SmsProvider {
  phoneNumber: string = ''
  message: string = ''
  sendSms (phoneNumber: string, message: string): void {
    this.phoneNumber = phoneNumber
    this.message = message
  }
}

export interface MessageSender {
  sendMessage: (recipient: string, message: string) => void
}

export class SmsAdapter implements MessageSender {
  constructor (private readonly smsProvider: SmsProvider) {
  }

  sendMessage (recipient: string, message: string): void {
    this.smsProvider.sendSms(recipient, message)
  }
}
