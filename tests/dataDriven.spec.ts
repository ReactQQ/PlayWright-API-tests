import { test, expect } from '@playwright/test'
import apiClient from '../utils/apiClient'
import posts from '../test-data/posts.json'
import { expectPostSchema } from '../utils/schemaValidator'

test.describe('Data-driven POST /posts tests with schema and headers', () => {
  for (const post of posts) {
    test(`Create post: "${post.title}"`, async () => {
      const response = await apiClient.post('/posts', post)

      expect(response.status).toBe(201)
      expect(response.headers['content-type']).toContain('application/json')

      expectPostSchema(response.data)
    })
  }
})
