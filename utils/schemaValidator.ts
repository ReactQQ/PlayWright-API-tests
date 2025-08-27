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
