import { expect } from '@playwright/test'

export function expectHeaders(response: any, expectedHeaders: Record<string, string | RegExp>) {
  for (const key in expectedHeaders) {
    const expectedValue = expectedHeaders[key]
    const actualValue = response.headers[key.toLowerCase()]
    if (!actualValue) {
      console.warn(`Header '${key}' not found in response`)
      continue
    }
    if (expectedValue instanceof RegExp) {
      expect(actualValue).toMatch(expectedValue)
    } else {
      expect(actualValue).toBe(expectedValue)
    }
  }
}