import { describe, expect, test } from 'vitest'
import { Article, BlogPost, PdfExporter } from './visitor'

describe('visitor', () => {
  test('PdfExporter should visit BlogPost and Article correctly', () => {
    const blogPost = new BlogPost()
    const article = new Article()
    const pdfExporter = new PdfExporter()

    blogPost.accept(pdfExporter)
    article.accept(pdfExporter)

    expect(pdfExporter.isVisitedBlogPost).toBe(true)
    expect(pdfExporter.isVisitedArticle).toBe(true)
  })
})
