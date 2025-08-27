import { test, expect } from '@playwright/test'
import apiClient from '../utils/apiClient'
import { expectPostSchema } from '../utils/schemaValidator'
import { expectHeaders } from '../utils/headerValidator'

test.describe('Posts API - main tests', () => {

  test('GET /posts returns list of posts with headers and schema', async () => {
    const response = await apiClient.get('/posts')

    expect(response.status).toBe(200)
    expectHeaders(response, {
      'content-type': /application\/json/,
      'cache-control': /max-age/,
      'server': /cloudflare|nginx/i
    })

    response.data.forEach((post: any) => expectPostSchema(post))
  })

  test('GET /posts/1 returns single post with headers and schema', async () => {
    const response = await apiClient.get('/posts/1')

    expect(response.status).toBe(200)
    expectHeaders(response, {
      'content-type': /application\/json/,
      'cache-control': /max-age/,
      'server': /cloudflare|nginx/i
    })

    expectPostSchema(response.data)
  })

  test('POST /posts with valid payload creates a new post', async () => {
    const newPost = { title: 'foo', body: 'bar', userId: 1 }
    const response = await apiClient.post('/posts', newPost)

    expect(response.status).toBe(201)
    expect(response.data).toMatchObject(newPost)
  })
})
