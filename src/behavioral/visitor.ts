interface DocumentVisitor {
  visitBlogPost: (blogPost: BlogPost) => void
  visitArticle: (article: Article) => void
}
interface Document {
  accept: (visitor: DocumentVisitor) => void
}

export class BlogPost implements Document {
  accept (visitor: DocumentVisitor): void {
    visitor.visitBlogPost(this)
  }
}

export class Article implements Document {
  accept (visitor: DocumentVisitor): void {
    visitor.visitArticle(this)
  }
}

export class PdfExporter implements DocumentVisitor {
  isVisitedBlogPost: boolean = false
  isVisitedArticle: boolean = false
  visitBlogPost (blogPost: BlogPost): void {
    this.isVisitedBlogPost = true
  }

  visitArticle (article: Article): void {
    this.isVisitedArticle = true
  }
}
