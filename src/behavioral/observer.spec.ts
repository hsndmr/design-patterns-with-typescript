import { describe, expect, test } from 'vitest'
import { NewsAgency, NewsSubscriber } from './observer'

describe('observer', () => {
  test('observers Receive Latest News Updates Correctly', () => {
    // Arrange
    const newsAgency = new NewsAgency()

    const subscriber1 = new NewsSubscriber()
    const subscriber2 = new NewsSubscriber()
    const subscriber3 = new NewsSubscriber()

    newsAgency.addObserver(subscriber1)
    newsAgency.addObserver(subscriber2)
    newsAgency.addObserver(subscriber3)

    // Act
    newsAgency.setLatestNews('news 1')
    newsAgency.removeObserver(subscriber2)
    newsAgency.setLatestNews('news 2')

    // Assert
    expect(subscriber1.news).toEqual(['news 1', 'news 2'])
    expect(subscriber2.news).toEqual(['news 1'])
    expect(subscriber3.news).toEqual(['news 1', 'news 2'])
  })
})
