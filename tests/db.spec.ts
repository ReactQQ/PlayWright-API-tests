import { test, expect } from '@playwright/test'
import apiClient from '../utils/apiClient'
import { expectDbSchema } from '../utils/schemaValidator'
import { expectHeaders } from '../utils/headerValidator'

test.describe('DB API', () => {

  test('GET /db returns full DB with headers and schema', async () => {
    const response = await apiClient.get('/db')

    expect(response.status).toBe(200)
    expectHeaders(response, {
      'content-type': /application\/json/,
      'cache-control': /max-age/,
      'server': /cloudflare|nginx/i
    })

    expectDbSchema(response.data)
  })

  test('DELETE /db returns 200', async () => {
    const response = await apiClient.delete('/db')

    expect(response.status).toBe(200)
    expectHeaders(response, {
      'content-type': /application\/json/,
      'cache-control': /max-age/,
      'server': /cloudflare|nginx/i
    })
  })
})
