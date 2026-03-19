const { test, expect } = require('@playwright/test');

/* valid factorial inputs */

test.describe('Valid factorial calculations', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('calculates factorial of 0', async ({ page }) => {
    await page.locator('#number').fill('0');
    await page.locator('#getFactorial').click();
    await expect(page.locator('#resultDiv')).toContainText('The factorial of 0 is: 1');
  });

  test('calculates factorial of 1', async ({ page }) => {
    await page.locator('#number').fill('1');
    await page.locator('#getFactorial').click();
    await expect(page.locator('#resultDiv')).toContainText('The factorial of 1 is: 1');
  });

  test('calculates factorial of 5', async ({ page }) => {
    await page.locator('#number').fill('5');
    await page.locator('#getFactorial').click();
    await expect(page.locator('#resultDiv')).toContainText('The factorial of 5 is: 120');
  });

  test('calculates factorial of 10', async ({ page }) => {
    await page.locator('#number').fill('10');
    await page.locator('#getFactorial').click();
    await expect(page.locator('#resultDiv')).toContainText('The factorial of 10 is: 3628800');
  });
});

/* invalid inputs */

test.describe('Invalid input handling', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('rejects negative number', async ({ page }) => {
    await page.locator('#number').fill('-1');
    await page.locator('#getFactorial').click();
    await expect(page.locator('#resultDiv')).toContainText('Please enter an integer');
  });

  test('rejects decimal number', async ({ page }) => {
    await page.locator('#number').fill('3.5');
    await page.locator('#getFactorial').click();
    await expect(page.locator('#resultDiv')).toContainText('Please enter an integer');
  });

  test('rejects alphabetic input', async ({ page }) => {
    await page.locator('#number').fill('abc');
    await page.locator('#getFactorial').click();
    await expect(page.locator('#resultDiv')).toContainText('Please enter an integer');
  });

  test('rejects special characters', async ({ page }) => {
    await page.locator('#number').fill('!@#');
    await page.locator('#getFactorial').click();
    await expect(page.locator('#resultDiv')).toContainText('Please enter an integer');
  });

  test('rejects empty input', async ({ page }) => {
    await page.locator('#getFactorial').click();
    await expect(page.locator('#resultDiv')).toContainText('Please enter an integer');
  });
});

/* ui elements */

test.describe('UI elements', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('has correct page title', async ({ page }) => {
    await expect(page).toHaveTitle(/Factorial/);
  });

  test('displays heading text', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('The greatest factorial calculator!');
  });

  test('displays input field', async ({ page }) => {
    await expect(page.locator('#number')).toBeVisible();
  });

  test('displays calculate button with correct text', async ({ page }) => {
    await expect(page.locator('#getFactorial')).toBeVisible();
    await expect(page.locator('#getFactorial')).toHaveText('Calculate!');
  });

  test('displays copyright message', async ({ page }) => {
    await expect(page.locator('body')).toContainText('Qxf2 Services');
  });
});

/* link navigation */

test.describe('Link navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('navigates to About page', async ({ page }) => {
    await page.click('a[href="/about"]');
    await expect(page).toHaveURL(/\/about/);
  });

  test('Terms and Conditions link points to terms page', async ({ page }) => {
    const termsLink = page.locator('a', { hasText: 'Terms and Conditions' });
    await expect(termsLink).toHaveAttribute('href', '/terms');
  });

  test('Privacy link points to privacy page', async ({ page }) => {
    const privacyLink = page.locator('a', { hasText: 'Privacy' });
    await expect(privacyLink).toHaveAttribute('href', '/privacy');
  });
});

/* edge cases + usability */

test.describe('Edge cases and usability', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('handles large number input', async ({ page }) => {
    await page.locator('#number').fill('1000');
    await page.locator('#getFactorial').click();
    await expect(page.locator('#resultDiv')).toContainText('The factorial of 1000 is:');
  });

  test('handles leading zeros', async ({ page }) => {
    await page.locator('#number').fill('007');
    await page.locator('#getFactorial').click();
    await expect(page.locator('#resultDiv')).toContainText('The factorial of 7 is: 5040');
  });

  test('handles whitespace-only input', async ({ page }) => {
    await page.locator('#number').fill('   ');
    await page.locator('#getFactorial').click();
    await expect(page.locator('#resultDiv')).toContainText('Please enter an integer');
  });

  test('submits on Enter key press', async ({ page }) => {
    await page.locator('#number').fill('5');
    await page.locator('#number').press('Enter');
    await expect(page.locator('#resultDiv')).toContainText('The factorial of 5 is: 120');
  });

  test('result updates between consecutive calculations', async ({ page }) => {
    await page.locator('#number').fill('5');
    await page.locator('#getFactorial').click();
    await expect(page.locator('#resultDiv')).toContainText('The factorial of 5 is: 120');

    await page.locator('#number').fill('3');
    await page.locator('#getFactorial').click();
    await expect(page.locator('#resultDiv')).toContainText('The factorial of 3 is: 6');
  });

  test('handles rapid double-click on calculate', async ({ page }) => {
    await page.locator('#number').fill('5');
    await page.locator('#getFactorial').dblclick();
    await expect(page.locator('#resultDiv')).toContainText('The factorial of 5 is: 120');
  });

  test('navigates back from About page to calculator', async ({ page }) => {
    await page.click('a[href="/about"]');
    await expect(page).toHaveURL(/\/about/);
    await page.goBack();
    await expect(page).toHaveURL(/\/$/);
    await expect(page.locator('#getFactorial')).toBeVisible();
  });
});
