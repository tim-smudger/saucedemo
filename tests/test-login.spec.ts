import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { ProductPage } from '../pages/product-page';
import { before } from 'node:test';

  let loginPage :LoginPage;
  let productPage : ProductPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productPage = new ProductPage(page);
    await loginPage.open();
  });

test('test login with correct credentials', async ({ page }) => {
  await loginPage.login('standard_user', 'secret_sauce');
  await productPage.pageOpened();

});

test('test incorrect credentials gives an error message' , async ({ page }) => {
  await loginPage.login('standard_user', 'wrong_password');
  expect(await loginPage.getErrorMessage()).toBe('Epic sadface: Username and password do not match any user in this service');
});

test('test error message can be cleared', async ({ page }) => {
  await loginPage.login('standard_user', 'wrong_password');
  await loginPage.errorbutton.click();
  await expect(loginPage.errorbutton).not.toBeVisible();
});

test('test locked out user gets an error message' , async ({ page }) => {
  await loginPage.login('locked_out_user', 'secret_sauce');
  expect(await loginPage.getErrorMessage()).toBe('Epic sadface: Sorry, this user has been locked out.');
});