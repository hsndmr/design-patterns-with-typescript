abstract class EmailTemplate {
  subject: string = ''
  body: string = ''
  recipients: string[] = []

  sendEmail (): void {
    this.send(
      this.getSubject(),
      this.getBody(),
      this.getRecipients()
    )
  }

  protected abstract getSubject (): string
  protected abstract getBody (): string
  protected abstract getRecipients (): string[]

  protected send (subject: string, body: string, recipients: string[]): void {
    this.subject = subject
    this.body = body
    this.recipients = recipients
  }
}

export class WelcomeEmailTemplate extends EmailTemplate {
  constructor (private readonly name: string) {
    super()
  }

  protected getSubject (): string {
    return `Welcome ${this.name}`
  }

  protected getBody (): string {
    return 'Welcome to our website'
  }

  protected getRecipients (): string[] {
    return [this.name]
  }
}

export class ForgotPasswordEmailTemplate extends EmailTemplate {
  constructor (private readonly name: string) {
    super()
  }

  protected getSubject (): string {
    return `Forgot password ${this.name}`
  }

  protected getBody (): string {
    return 'Please reset your password'
  }

  protected getRecipients (): string[] {
    return [this.name]
  }
}
