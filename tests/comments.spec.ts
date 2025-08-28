import { test, expect } from '@playwright/test'
import apiClient from '../utils/apiClient'
import { expectCommentSchema } from '../utils/schemaValidator'
import { expectHeaders } from '../utils/headerValidator'

test.describe('Comments API', () => {

  test('GET /comments returns list of comments with headers and schema', async () => {
    const response = await apiClient.get('/comments')

    expect(response.status).toBe(200)
    expectHeaders(response, {
      'content-type': /application\/json/,
      'cache-control': /max-age/,
      'server': /cloudflare|nginx/i
    })

    response.data.forEach(expectCommentSchema)
  })

  test('GET /comments/1 returns single comment with headers and schema', async () => {
    const response = await apiClient.get('/comments/1')

    expect(response.status).toBe(200)
    expectHeaders(response, {
      'content-type': /application\/json/,
      'cache-control': /max-age/,
      'server': /cloudflare|nginx/i
    })

    expectCommentSchema(response.data)
  })

  test('POST /comments with valid payload creates a new comment', async () => {
    const newComment = { body: 'test comment', postId: 1 }
    const response = await apiClient.post('/comments', newComment)

    expect(response.status).toBe(201)
    expect(response.data).toMatchObject(newComment)
  })

  test('DELETE /comments/1 returns 200', async () => {
    const response = await apiClient.delete('/comments/1')

    expect(response.status).toBe(200)
    expectHeaders(response, {
      'content-type': /application\/json/,
      'cache-control': /max-age/,
      'server': /cloudflare|nginx/i
    })
  })
})
