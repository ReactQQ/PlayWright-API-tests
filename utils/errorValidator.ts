import { expect } from '@playwright/test'

export function expectErrorResponse(
  response: any,
  expectedStatus: number | number[]
) {
  const actualStatus = response.status
  const contentType = response.headers['content-type']

  console.log('--- Error Response Info ---')
  console.log('Expected status:', expectedStatus)
  console.log('Actual status:  ', actualStatus)
  console.log('Content-Type:   ', contentType)
  console.log('---------------------------')

  if (Array.isArray(expectedStatus)) {
    expect(expectedStatus).toContain(actualStatus)
  } else {
    expect(actualStatus).toBe(expectedStatus)
  }

  if (contentType) {
    expect(contentType).toContain('application/json')
  } else {
    console.warn('Warning: Content-Type header is missing')
  }
}
