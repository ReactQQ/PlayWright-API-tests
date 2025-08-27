import { test } from '@playwright/test'
import apiClient from '../utils/apiClient'
import { expectErrorResponse } from '../utils/errorValidator'
import { expectHeaders } from '../utils/headerValidator'

test.describe('Posts API Error Handling', () => {
  test('GET /posts/9999 returns 404 for invalid post ID', async () => {
    const response = await apiClient.get('/posts/9999')
    expectErrorResponse(response, 404)
    expectHeaders(response, {
      'content-type': /application\/json/,
      'cache-control': /max-age/,
      'server': /cloudflare|nginx/i
    })
  })

  test('POST /posts with malformed JSON returns error', async () => {
    const malformedPost = '{"title": "bad json", "body": "oops"' // missing closing }

    const response = await apiClient.post('/posts', malformedPost, {
      headers: { 'Content-Type': 'application/json' },
      transformRequest: [(data) => data] // send raw string
    })

    console.log(response.status)
    console.log(response.headers['content-type'])

    expectErrorResponse(response, 500)
    expectHeaders(response, {
      'content-type': /application\/json/,
      'cache-control': /max-age/,
      'server': /cloudflare|nginx/i
    })
  })

  test('DELETE /posts/1 returns 200 or 404 (unsupported operation)', async () => {
    const response = await apiClient.delete('/posts/1')
    expectErrorResponse(response, [200, 404])
    expectHeaders(response, {
      'content-type': /application\/json/,
      'cache-control': /max-age/,
      'server': /cloudflare|nginx/i
    })
  })

  test('GET /invalid-endpoint returns 404', async () => {
    const response = await apiClient.get('/invalid-endpoint')
    expectErrorResponse(response, 404)
    expectHeaders(response, {
      'content-type': /application\/json/,
      'cache-control': /max-age/,
      'server': /cloudflare|nginx/i
    })
  })
})
