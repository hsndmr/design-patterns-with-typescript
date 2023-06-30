interface PaymentStrategy {
  pay: (amount: number) => void
}

export class CreditCardStrategy implements PaymentStrategy {
  amount: number = 0
  constructor (
    private readonly cardNumber: string,
    private readonly cvv: string
  ) {
  }

  pay (amount: number): void {
    this.amount = amount
  }
}

export class BankTransferStrategy implements PaymentStrategy {
  amount: number = 0
  constructor (
    private readonly bankAccount: string
  ) {
  }

  pay (amount: number): void {
    this.amount = amount
  }
}

export class PaymentContext {
  private paymentStrategy?: PaymentStrategy

  setPaymentStrategy (paymentStrategy: PaymentStrategy): void {
    this.paymentStrategy = paymentStrategy
  }

  processPayment (amount: number): void {
    if (this.paymentStrategy === undefined) {
      throw new Error('Payment strategy is not set')
    }

    this.paymentStrategy.pay(amount)
  }
}
