import { Order, NewOrderState, CancelledOrderState, PaymentVerifiedState, ShippedOrderState } from './state'
import { beforeEach, describe, expect, it } from 'vitest'

describe('Order State', () => {
  let order: Order

  beforeEach(() => {
    order = new Order()
  })

  it('should initialize with NewOrderState', () => {
    expect(order.getState()).toBeInstanceOf(NewOrderState)
  })

  it('should transition to CancelledOrderState when cancelled', () => {
    order.cancel()
    expect(order.getState()).toBeInstanceOf(CancelledOrderState)
  })

  it('should throw an error when cancelling a cancelled order', () => {
    order.cancel()
    expect(() => { order.cancel() }).toThrow('Order is already cancelled')
  })

  it('should transition to PaymentVerifiedState when payment is verified', () => {
    order.verifyPayment()
    expect(order.getState()).toBeInstanceOf(PaymentVerifiedState)
  })

  it('should throw an error when verifying payment on a cancelled order', () => {
    order.cancel()
    expect(() => { order.verifyPayment() }).toThrow('Cannot verify payment when order is cancelled')
  })

  it('should throw an error when verifying payment on an already verified order', () => {
    order.verifyPayment()
    expect(() => { order.verifyPayment() }).toThrow('Payment is already verified')
  })

  it('should throw an error when shipping a new order without payment verification', () => {
    expect(() => { order.ship() }).toThrow('Cannot ship the new order without payment verification')
  })

  it('should transition to ShippedOrderState when shipping an order with payment verification', () => {
    order.verifyPayment()
    order.ship()
    expect(order.getState()).toBeInstanceOf(ShippedOrderState)
  })

  it('should throw an error when cancelling a shipped order', () => {
    order.verifyPayment()
    order.ship()
    expect(() => { order.cancel() }).toThrow('Cannot cancel the order when order is shipped')
  })

  it('should throw an error when verifying payment on a shipped order', () => {
    order.verifyPayment()
    order.ship()
    expect(() => { order.verifyPayment() }).toThrow('Cannot verify payment when order is shipped')
  })

  it('should throw an error when shipping an already shipped order', () => {
    order.verifyPayment()
    order.ship()
    expect(() => { order.ship() }).toThrow('Order is already shipped')
  })
})
