export interface Query<T> {
  toArray(): Array<T>
  sort(orderby, order?): Query<T>
}
export interface Service<T = any> {
  find(query, option?): Query<T>
  findOne(query, option?): T
  sort(orderby, order?): T
}
export interface Post {
  _id: string
  path: string
  title: string
  content: string
  frontmatter: any
  tags: any
  categories: any
}
export type PostService = Service<Post>
