import { test, expect } from "@playwright/test"

test.beforeEach(async ({ page }) => {
  await page.goto("/")
})

test.describe("ปั่นเลย!", () => {
  // TODO: Mock request
  // test.beforeEach(async ({ page }) => {
  //   await page.route("/api/quotes", async (route) => {
  //     const json = {
  //       quotes: [
  //         {
  //           id: 1,
  //           body: "foobar",
  //           url: "https://watasalim.vercel.app/q/1",
  //         },
  //       ],
  //     }
  //     await route.fulfill({ json })
  //   })
  // })

  test("should return a quote", async ({ page }) => {
    const button = page.getByText("🚴‍♂️ ปั่นเลย! 🚴‍♀️")

    await button.click()

    const text = await page.getByTestId("result").textContent()

    // TODO: Assert with mocked response
    expect(text).toMatch(/.+/)
  })
})
