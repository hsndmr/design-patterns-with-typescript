export interface OrderState {
  cancel: () => void
  verifyPayment: () => void
  ship: () => void
}

export class NewOrderState implements OrderState {
  constructor (private readonly _order: Order) {
  }

  cancel (): void {
    this._order.setState(new CancelledOrderState(this._order))
  }

  verifyPayment (): void {
    this._order.setState(new PaymentVerifiedState(this._order))
  }

  ship (): void {
    throw new Error('Cannot ship the new order without payment verification')
  }
}

export class CancelledOrderState implements OrderState {
  constructor (private readonly _order: Order) {
  }

  cancel (): void {
    throw new Error('Order is already cancelled')
  }

  verifyPayment (): void {
    throw new Error('Cannot verify payment when order is cancelled')
  }

  ship (): void {
    throw new Error('Cannot ship the order when order is cancelled')
  }
}

export class PaymentVerifiedState implements OrderState {
  constructor (private readonly _order: Order) {
  }

  cancel (): void {
    this._order.setState(new CancelledOrderState(this._order))
  }

  verifyPayment (): void {
    throw new Error('Payment is already verified')
  }

  ship (): void {
    this._order.setState(new ShippedOrderState(this._order))
  }
}

export class ShippedOrderState implements OrderState {
  constructor (private readonly _order: Order) {
  }

  cancel (): void {
    throw new Error('Cannot cancel the order when order is shipped')
  }

  verifyPayment (): void {
    throw new Error('Cannot verify payment when order is shipped')
  }

  ship (): void {
    throw new Error('Order is already shipped')
  }
}

export class Order {
  private _state: OrderState
  constructor () {
    this._state = new NewOrderState(this)
  }

  getState (): OrderState {
    return this._state
  }

  setState (state: OrderState): void {
    this._state = state
  }

  cancel (): void {
    this._state.cancel()
  }

  verifyPayment (): void {
    this._state.verifyPayment()
  }

  ship (): void {
    this._state.ship()
  }
}
