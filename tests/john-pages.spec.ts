import { test, expect } from './auth-utils';

test.slow();
test('regular user can log in and use the navbar', async ({ getUserPage }) => {
  // Call the getUserPage fixture with users signin info to get authenticated session for user
  const customUserPage = await getUserPage('john@foo.com', 'changeme');

  // Navigate to the home page and wait for post-login indicator
  await customUserPage.goto('http://localhost:3000/');
  await expect(customUserPage.getByRole('button', { name: 'john@foo.com' })).toBeVisible({ timeout: 10000 });

  // Each navbar link opens its page (page titles come from the M1 mockup)
  await customUserPage.locator('#browse-nav').click();
  await expect(customUserPage.getByRole('heading', { name: 'Browse Lost & Found Items' })).toBeVisible({
    timeout: 5000,
  });

  await customUserPage.locator('#report-nav').click();
  await expect(customUserPage.getByRole('heading', { name: 'Report a Lost or Found Item' })).toBeVisible({
    timeout: 5000,
  });

  await customUserPage.locator('#dashboard-nav').click();
  await expect(customUserPage.getByRole('heading', { name: 'My Dashboard' })).toBeVisible({ timeout: 5000 });

  await customUserPage.locator('#home-nav').click();
  await expect(customUserPage).toHaveURL('http://localhost:3000/');
});
