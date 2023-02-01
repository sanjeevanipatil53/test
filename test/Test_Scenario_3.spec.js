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
      name: "sanjivani_Test_Scenario_3",
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
    "https://www.lambdatest.com/selenium-playground/input-form-demo"
  );
  await page.locator("a[href*='input-form-demo']").click();
  await page.locator("#name").fill("Sanjivani Patil");
  await page.locator("#inputEmail4").fill("sanjivani@gmail.com");
  await page.locator("#inputPassword4").fill("1234");
  await page.locator("#company").fill("Persistent Systems");
  await page.locator("#websitename").fill("www.Persistent.com");
  await page.locator("[name='country']").selectOption("United States");
  await page.locator("#inputCity").fill("Nagpur");
  await page.locator("#inputAddress1").fill("Main Road");
  await page.locator("#inputAddress2").fill("Phase 1");
  await page.locator("#inputState").fill("Maharashtra");
  await page.locator("#inputZip").fill("447057");
  await page.locator('[class*="selenium_btn"]').click();
  const sucess_msg = await page.locator(".success-msg.hidden").textContent();
  expect(
    sucess_msg.includes(
      "Thanks for contacting us, we will get back to you shortly."
    )
  ).toBeTruthy();
  await browser.close();
})();
