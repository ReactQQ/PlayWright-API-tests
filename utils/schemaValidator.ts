import { expect } from '@playwright/test'

export function expectPostSchema(post: any) {
  expect(post).toHaveProperty('userId')
  expect(typeof post.userId).toBe('number')

  expect(post).toHaveProperty('id')
  expect(typeof post.id).toBe('number')

  expect(post).toHaveProperty('title')
  expect(typeof post.title).toBe('string')

  expect(post).toHaveProperty('body')
  expect(typeof post.body).toBe('string')
}

export function expectCommentSchema(comment: any) {
  expect(comment).toHaveProperty('postId')
  expect(comment).toHaveProperty('id')
  expect(comment).toHaveProperty('name')
  expect(comment).toHaveProperty('email')
  expect(comment).toHaveProperty('body')
}

export function expectProfileSchema(profile: any) {
  expect(profile).toHaveProperty('name')
}

export function expectDbSchema(db: any) {
  expect(db).toHaveProperty('posts')
  expect(db).toHaveProperty('comments')
  expect(db).toHaveProperty('albums')
  expect(db).toHaveProperty('photos')
  expect(db).toHaveProperty('todos')
  expect(db).toHaveProperty('users')
}
