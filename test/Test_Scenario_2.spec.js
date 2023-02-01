const { chromium } = require("playwright");
const { expect } = require("@playwright/test");
const cp = require("child_process");
const playwrightClientVersion = cp
  .execSync("npx playwright --version")
  .toString()
  .trim()
  .split(" ")[1];
(async () => {
  const capabilities = {
    browserName: "Chrome",
    browserVersion: "110.0",
    "LT:Options": {
      video: true,
      screenshots: true,
      network: true,
      platform: "Windows 10",
      name: "sanjivani_Test_Scenario_2",
      tunnel: false,
      console: true,
      user: "sanjivani_patil",
      accessKey: "q0xDt7e7RQmhCHnDRdBRAHYpHQSAma9WuDhkxYX7Y5dJOBR9w1",
    },
  };
  const browser = await chromium.connect({
    wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(
      JSON.stringify(capabilities)
    )}`,
  });
  const page = await browser.newPage();
  await page.goto(
    "https://www.lambdatest.com/selenium-playground/drag-drop-range-sliders-demo"
  );
  await page.locator("#slider3").getByRole("slider").click();
  await page.locator("#rangeSuccess").click();
  for (let it = 0; it <= 44; it++) {
    await page.locator("#slider3").getByRole("slider").press("ArrowRight");
  }
  const value = await page.getByText("95").textContent();
  expect(value.includes("95")).toBeTruthy();
  await browser.close();
})();
