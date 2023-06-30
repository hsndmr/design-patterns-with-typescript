export class Memento {
  constructor (private readonly state: string) {}

  getState (): string {
    return this.state
  }
}

export class TextEditor {
  constructor (private text: string) {}

  writeText (text: string): void {
    this.text = text
  }

  save (): Memento {
    return new Memento(this.text)
  }

  getText (): string {
    return this.text
  }

  restore (memento: Memento): void {
    this.text = memento.getState()
  }
}
