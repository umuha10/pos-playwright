import { test, expect } from "@playwright/test";
import { CategoryPage } from "../pages/CategoryPage";
import { LoginPage } from "../pages/LoginPage";
import device from "../test-data/device.json";

test('TC001 - Access Category Menu', async ({page})=> {
    const loginPage = new LoginPage(page);
    const categoryPage = new CategoryPage(page);
    
    await page.goto('/');

    await loginPage.login(
        process.env.APP_USERNAME!,
        process.env.APP_PASSWORD!
    );

    await loginPage.registerDevice(
        device.deviceName.name
    );

    await page.waitForTimeout(5000);

    await page.goto('/stok');

    await page.waitForTimeout(5000);

    await categoryPage.categoryManagementButton.click();
    await page.waitForTimeout(5000);

    await expect(
        page.getByRole('navigation').nth(1)
    ).toContainText('Manajemen Kategori');

    await expect(page).toHaveURL('/kategori');

    await expect
})

