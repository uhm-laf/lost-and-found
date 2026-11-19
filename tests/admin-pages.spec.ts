import { test, expect } from './auth-utils';

test.slow();
test('admin can log in and reach the admin page', async ({ getUserPage }) => {
  // Call the getUserPage fixture with admin signin info to get authenticated session for admin
  const adminPage = await getUserPage('admin@foo.com', 'changeme');

  // Navigate to the home page and wait for post-login indicator
  await adminPage.goto('http://localhost:3000/');
  await expect(adminPage.getByRole('button', { name: 'admin@foo.com' })).toBeVisible({ timeout: 10000 });

  // Navbar matches the M1 mockup header
  await expect(adminPage.getByRole('link', { name: 'UH Manoa Lost & Found' })).toBeVisible({ timeout: 5000 });
  await expect(adminPage.locator('#home-nav')).toBeVisible({ timeout: 5000 });
  await expect(adminPage.locator('#browse-nav')).toBeVisible({ timeout: 5000 });
  await expect(adminPage.locator('#report-nav')).toBeVisible({ timeout: 5000 });
  await expect(adminPage.locator('#dashboard-nav')).toBeVisible({ timeout: 5000 });

  // The template's admin page is hidden from the navbar but still works by URL
  await adminPage.goto('http://localhost:3000/admin');
  await expect(adminPage.getByRole('heading', { name: 'List Stuff Admin' })).toBeVisible({ timeout: 5000 });
  await expect(adminPage.getByRole('heading', { name: 'List Users Admin' })).toBeVisible({ timeout: 5000 });
});
