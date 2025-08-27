import { test, expect } from '@playwright/test'
import apiClient from '../utils/apiClient'
import { expectPostSchema } from '../utils/schemaValidator'
import { expectHeaders } from '../utils/headerValidator'

test.describe('Posts API via Axios with schema and headers', () => {
  test('GET /posts returns list of posts with valid schema and headers', async () => {
    const response = await apiClient.get('/posts')

    expect(response.status).toBe(200)
    expectHeaders(response, {
      'content-type': /application\/json/,
      'cache-control': /max-age/,
      'server': /cloudflare|nginx/i
    })

    response.data.forEach((post: any) => expectPostSchema(post))
  })

  test('GET /posts/1 returns single post with valid schema and headers', async () => {
    const response = await apiClient.get('/posts/1')

    expect(response.status).toBe(200)
    expectHeaders(response, {
      'content-type': /application\/json/,
      'cache-control': /max-age/,
      'server': /cloudflare|nginx/i
    })

    expectPostSchema(response.data)
  })

  test('GET /posts/9999 returns 404 with proper headers', async () => {
    const response = await apiClient.get('/posts/9999')

    expect(response.status).toBe(404)
    expect(response.headers['content-type']).toContain('application/json')
    expectHeaders(response, {
      'content-type': /application\/json/,
      'cache-control': /max-age/,
      'server': /cloudflare|nginx/i
    })
  })

  test('POST /posts with valid payload returns correct schema and headers', async () => {
    const newPost = { title: 'foo', body: 'bar', userId: 1 }
    const response = await apiClient.post('/posts', newPost)

    expect(response.status).toBe(201)
    expect(response.headers['content-type']).toContain('application/json')

    expectPostSchema(response.data)
  })

  

  test('POST /posts with invalid payload (JSONPlaceholder does not reject)', async () => {
    const invalidPost = { wrong: 'field' }
    const response = await apiClient.post('/posts', invalidPost)

    expect(response.status).toBe(201)
    expect(response.headers['content-type']).toContain('application/json')
    expect(response.data).toHaveProperty('wrong')

    console.log(
      'Note: JSONPlaceholder does not enforce payload validation; schema checks are skipped for invalid payloads.'
    )
  })

  test('POST /posts with extra field is returned by API', async () => {
    const postWithExtra = { title: 'Extra Test', body: 'Check this field', userId: 5, extraField: 'Hello there' }
    const response = await apiClient.post('/posts', postWithExtra)

    expect(response.status).toBe(201)
    expect(response.headers['content-type']).toContain('application/json')

    expectPostSchema(response.data)
    expect(response.data).toHaveProperty('extraField')
    expect(response.data.extraField).toBe('Hello there')
  })
})




