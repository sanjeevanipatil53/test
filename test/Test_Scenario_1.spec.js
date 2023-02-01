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
      name: "sanjivani_Test_Scenario_1",
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
  await page.goto("https://www.lambdatest.com/selenium-playground/");
  await page
    .locator(
      "[href*='https://www.lambdatest.com/selenium-playground/simple-form-demo']"
    )
    .click();
  const h1_heading = await page.locator("h1").textContent();
  expect(h1_heading.includes("Simple Form Demo")).toBeTruthy();
  var msg = "Welcome to LambdaTest";
  await page.locator("input[id*='user-message']").fill(msg);
  await page.locator("#showInput").click();
  var output_msg = await page.locator("#message").textContent();
  expect(output_msg.includes(msg)).toBeTruthy();
  await page.close();
  await browser.close();
})();
