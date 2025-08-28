import { test, expect } from '@playwright/test';

test.describe('Todo App', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200');
    // Clear localStorage to ensure a clean state
    await page.evaluate(() => localStorage.clear());
    await page.reload();
  });

  test('should display the app title', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /my to-do list/i })).toBeVisible();
  });

  test('should add a todo', async ({ page }) => {
    const input = page.getByPlaceholder('Add a new task');
    await input.fill('Test Task');
    await input.press('Enter');
    await expect(page.getByText('Test Task')).toBeVisible();
  });

  test('should mark a todo as completed', async ({ page }) => {
    const input = page.getByPlaceholder('Add a new task');
    await input.fill('Complete Me');
    await input.press('Enter');
    const checkbox = page.locator('input[type="checkbox"]').first();
    await checkbox.check();
    const label = page.getByText('Complete Me');
    await expect(label).toHaveClass(/text-decoration-line-through/);
  });

  test('should delete a todo', async ({ page }) => {
    const input = page.getByPlaceholder('Add a new task');
    await input.fill('Delete Me');
    await input.press('Enter');
    await page.getByRole('button', { name: /delete/i }).click();
    await expect(page.getByText('Delete Me')).not.toBeVisible();
  });

  test('should mark all as completed', async ({ page }) => {
    const input = page.getByPlaceholder('Add a new task');
    await input.fill('Task 1');
    await input.press('Enter');
    await input.fill('Task 2');
    await input.press('Enter');
    await page.getByRole('button', { name: /mark all as completed/i }).click();
    const labels = page.locator('.form-check-label');
    await expect(labels.nth(0)).toHaveClass(/text-decoration-line-through/);
    await expect(labels.nth(1)).toHaveClass(/text-decoration-line-through/);
  });

  test('should persist todos after reload', async ({ page }) => {
    const input = page.getByPlaceholder('Add a new task');
    await input.fill('Persistent Task');
    await input.press('Enter');
    await page.reload();
    await expect(page.getByText('Persistent Task')).toBeVisible();
  });
});
