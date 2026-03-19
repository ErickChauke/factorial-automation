const { test, expect } = require('@playwright/test');

/* form validation styling */

test('applies red border on invalid input and resets on valid', async ({ page }) => {
  await page.goto('/');

  await page.locator('#number').fill('abc');
  await page.locator('#getFactorial').click();
  await expect(page.locator('#number')).toHaveCSS('border', /2px solid rgb\(255, 0, 0\)/);

  await page.locator('#number').fill('5');
  await page.locator('#getFactorial').click();
  await expect(page.locator('#number')).toHaveCSS('border', /1px solid rgb\(204, 204, 204\)/);
});

/* factorial of 12 */

test('calculates factorial of 12 correctly', async ({ page }) => {
  await page.goto('/');
  await page.locator('#number').fill('12');
  await page.locator('#getFactorial').click();
  await expect(page.locator('#resultDiv')).toContainText(
    'The factorial of 12 is: 479001600'
  );
});

/* api call verification */

test('sends correct API request for factorial calculation', async ({ page }) => {
  let interceptedRequest = null;

  await page.route('**/factorial', (route, request) => {
    interceptedRequest = {
      method: request.method(),
      headers: request.headers(),
      postData: request.postData(),
    };
    route.continue();
  });

  await page.goto('/');
  await page.locator('#number').fill('9');
  await page.locator('#getFactorial').click();

  // wait for result so we know the request went through
  await expect(page.locator('#resultDiv')).toContainText('The factorial of 9 is:');

  expect(interceptedRequest).not.toBeNull();
  expect(interceptedRequest.method).toBe('POST');
  expect(interceptedRequest.postData).toContain('number=9');
  expect(interceptedRequest.headers['content-type']).toContain(
    'application/x-www-form-urlencoded'
  );
});
