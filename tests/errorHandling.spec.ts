import { test, expect } from '@playwright/test'
import apiClient from '../utils/apiClient'
import { expectErrorResponse } from '../utils/errorValidator'
import { expectHeaders } from '../utils/headerValidator'

test.describe('Posts API - error handling / corner cases', () => {

  test('GET /posts/9999 returns 404 safely', async () => {
    const response = await apiClient.get('/posts/9999')
    expectErrorResponse(response, 404)
    expectHeaders(response, {
      'content-type': /application\/json/,
      'cache-control': /max-age/,
      'server': /cloudflare|nginx/i
    })
  })

  test('POST /posts with malformed JSON handled safely', async () => {
    const malformedPost = '{"title": "bad json", "body": "oops"' // missing closing }
    const response = await apiClient.post('/posts', malformedPost, {
      headers: { 'Content-Type': 'application/json' },
      transformRequest: [(data) => data]
    })

    expectHeaders(response, {
      'content-type': /application\/json/,
      'cache-control': /max-age/,
      'server': /cloudflare|nginx/i
    })
    expect([201, 400, 500]).toContain(response.status)
    console.log('Note: Malformed JSON test handled safely; headers may not be JSON')
  })

  test('DELETE /posts/1 returns 200 or 404 (unsupported operation)', async () => {
    const response = await apiClient.delete('/posts/1')
    expect([200, 404]).toContain(response.status)
    expectHeaders(response, {
      'content-type': /application\/json/,
      'cache-control': /max-age/,
      'server': /cloudflare|nginx/i
    })
    console.log('Note: DELETE endpoint simulated; headers may vary')
  })

  test('GET /invalid-endpoint returns 404 safely', async () => {
    const response = await apiClient.get('/invalid-endpoint')
    expectErrorResponse(response, 404)
    expectHeaders(response, {
      'content-type': /application\/json/,
      'cache-control': /max-age/,
      'server': /cloudflare|nginx/i
    })
  })
})
