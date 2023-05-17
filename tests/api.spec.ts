import { test, expect } from "@playwright/test"

test.describe("/api", () => {
  test("should return api info", async ({ request }) => {
    const response = await request.get(`/api/`)
    expect(response.ok()).toBeTruthy()

    const result = await response.json()
    expect(result).toHaveProperty("description")
  })
})

test.describe("/api/quotes", () => {
  test("should return all quotes", async ({ request }) => {
    const response = await request.get(`/api/quotes`)
    expect(response.ok()).toBeTruthy()

    const result = await response.json()
    expect(result).toHaveProperty("quotes")
    expect(result.quotes).toBeInstanceOf(Array)
  })
})

test.describe("/api/quotes/:id", () => {
  test("should return specific quote", async ({ request }) => {
    const response = await request.get(`/api/quotes/1`)
    expect(response.ok()).toBeTruthy()

    const result = await response.json()
    expect(result).toHaveProperty("quote.id")
    expect(result).toHaveProperty("quote.body")
    expect(result).toHaveProperty("quote.url")
  })
})

test.describe("/api/quotes/random", () => {
  test("should return random quote", async ({ request }) => {
    const response = await request.get(`/api/quotes/random`)
    expect(response.ok()).toBeTruthy()

    const result = await response.json()
    expect(result).toHaveProperty("quote.id")
    expect(result).toHaveProperty("quote.body")
    expect(result).toHaveProperty("quote.url")
  })
})

test.describe("/api/quotes/latest", () => {
  test("should return latest quote", async ({ request }) => {
    const response = await request.get(`/api/quotes/latest`)
    expect(response.ok()).toBeTruthy()

    const result = await response.json()
    expect(result).toHaveProperty("quote.id")
    expect(result).toHaveProperty("quote.body")
    expect(result).toHaveProperty("quote.url")
  })
})
