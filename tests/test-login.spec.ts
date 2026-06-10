import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { ProductPage } from '../pages/product-page';
import { env } from '../environments';

  let loginPage :LoginPage;
  let productPage : ProductPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productPage = new ProductPage(page);
    await loginPage.open();
  });

test('test login with correct credentials', async() => {
  await loginPage.login(env.users.standard.username, env.users.standard.password);
  await productPage.waitUntilLoaded();
  await expect(productPage.inventoryList).toBeVisible();
});


test('test missing password gives an error message', async() => {
  await loginPage.login(env.users.standard.username, '');
  expect(await loginPage.getErrorMessage()).toBe('Epic sadface: Password is required');
});

test('test missing username gives an error message', async() => {
  await loginPage.login('', env.users.standard.password);
  expect(await loginPage.getErrorMessage()).toBe('Epic sadface: Username is required');

});

test('test incorrect credentials gives an error message' , async ({ page }) => {
  await loginPage.login(env.users.standard.username, 'wrong_password');
  expect(await loginPage.getErrorMessage()).toBe('Epic sadface: Username and password do not match any user in this service');
});

test('test error message can be cleared', async ({ page }) => {
  await loginPage.login(env.users.standard.username, 'wrong_password');
  await loginPage.errorbutton.click();
  await expect(loginPage.errorbutton).not.toBeVisible();
});

test('test locked out user gets an error message' , async ({ page }) => {
  await loginPage.login(env.users.locked.username, env.users.locked.password);
  expect(await loginPage.getErrorMessage()).toBe('Epic sadface: Sorry, this user has been locked out.');
});

test('test login can be completed using keyboard navigation only', async ({ page }) => {
  await loginPage.loginViaKeyboard(env.users.standard.username, env.users.standard.password);
  await productPage.waitUntilLoaded();
  await expect(productPage.inventoryList).toBeVisible();
});

test('test delayed login still works ', async ({ page }) => {
    test.setTimeout(60000);
  await loginPage.loginViaKeyboard(env.users.slow.username, env.users.slow.password);
  await productPage.waitUntilLoaded();
  await expect(productPage.inventoryList).toBeVisible();
});

