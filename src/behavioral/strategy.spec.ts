import { PaymentContext, CreditCardStrategy, BankTransferStrategy } from './strategy'
import { beforeEach, describe, expect, it } from 'vitest'

describe('PaymentContext', () => {
  let paymentContext: PaymentContext

  beforeEach(() => {
    paymentContext = new PaymentContext()
  })

  it('should throw an error when payment strategy is not set', () => {
    expect(() => {
      paymentContext.processPayment(100)
    }).toThrowError('Payment strategy is not set')
  })

  it('should process payment using credit card strategy', () => {
    const creditCardStrategy = new CreditCardStrategy('1234567890', '123')
    paymentContext.setPaymentStrategy(creditCardStrategy)
    paymentContext.processPayment(100)

    expect(creditCardStrategy.amount).toBe(100)
  })

  it('should process payment using bank transfer strategy', () => {
    const bankTransferStrategy = new BankTransferStrategy('0123456789')
    paymentContext.setPaymentStrategy(bankTransferStrategy)
    paymentContext.processPayment(200)

    expect(bankTransferStrategy.amount).toBe(200)
  })
})
