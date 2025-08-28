import { test, expect } from '@playwright/test'
import apiClient from '../utils/apiClient'
import { expectProfileSchema } from '../utils/schemaValidator'
import { expectHeaders } from '../utils/headerValidator'

test.describe('Profile API', () => {

  test('GET /profile returns profile with headers and schema', async () => {
    const response = await apiClient.get('/profile')

    expect(response.status).toBe(200)
    expectHeaders(response, {
      'content-type': /application\/json/,
      'cache-control': /max-age/,
      'server': /cloudflare|nginx/i
    })

    expectProfileSchema(response.data)
  })

  test('POST /profile with valid payload updates profile', async () => {
    const newProfile = { name: 'typicode' }
    const response = await apiClient.post('/profile', newProfile)

    expect(response.status).toBe(201)
    expect(response.data).toMatchObject(newProfile)
  })

  test('DELETE /profile returns 200', async () => {
    const response = await apiClient.delete('/profile')

    expect(response.status).toBe(200)
    expectHeaders(response, {
      'content-type': /application\/json/,
      'cache-control': /max-age/,
      'server': /cloudflare|nginx/i
    })
  })
})
