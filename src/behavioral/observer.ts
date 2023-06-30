export interface Observer {
  update: (news: string) => void
}
export class NewsAgency {
  private readonly _observers: Observer[] = []
  private _latestNews: string = ''

  addObserver (observer: Observer): void {
    this._observers.push(observer)
  }

  removeObserver (observer: Observer): void {
    const index = this._observers.indexOf(observer)
    if (index > -1) {
      this._observers.splice(index, 1)
    }
  }

  private _notifyObservers (): void {
    this._observers.forEach(observer => {
      observer.update(this._latestNews)
    })
  }

  setLatestNews (news: string): void {
    this._latestNews = news
    this._notifyObservers()
  }
}

export class NewsSubscriber implements Observer {
  public news: string[] = []
  update (news: string): void {
    this.news.push(news)
  }
}
