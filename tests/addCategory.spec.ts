import { test, expect } from "@playwright/test";
import { CategoryPage } from "../pages/CategoryPage";
import { LoginPage } from "../pages/LoginPage";
import device from "../test-data/device.json";
import category from "../test-data/category.json";

test('TC001 - Access Category Menu Form', async ({page})=> {
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

    await categoryPage.addCategoryButton.click();
        
    await expect (
        page.getByRole('heading', { name: 'Tambah Kategori' })
    ).toBeVisible();

})

test('TC002 - Add Category - Valid Category Name', async ({page})=>{
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

    await categoryPage.addCategory(
        category.validCategory.name
    );

    await expect(
        page.getByText("Kategori Ditambahkan")
    ).toBeVisible();
    
    await expect(
        page.getByText("Kategori baru berhasil ditambahkan.")
    ).toBeVisible();

    await page.getByPlaceholder('Cari kategori...').fill(category.validCategory.name);
    await page.keyboard.press('Enter');

    await expect(
        page.getByText("Kategori Ditambahkan")
    ).toBeVisible();
    
    await expect(
        page.getByText("Kategori baru berhasil ditambahkan.")
    ).toBeVisible();
    
    await expect (
        page.getByText(category.validCategory.name)
    ).toBeVisible();
})

test('TC003 - Add Category - Duplicate Category Name', async ({page})=>{
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

    await categoryPage.addCategory(
        category.duplicateCategory.name
    );

    await categoryPage.addCategory(
        category.duplicateCategory.name
    );

    await expect(
        page.getByText("Opps!")
    ).toBeVisible();

    await expect (
        page.getByText("no data")
    ).toBeVisible();
})

test('TC004 - Add Category - Character Category Name', async ({page})=>{
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

    await categoryPage.addCategory(
        category.charCategory.name
    );

    await page.getByPlaceholder('Cari kategori...').fill(category.charCategory.name);
    await page.keyboard.press('Enter');

    await expect(
        page.getByText("Kategori Ditambahkan")
    ).toBeVisible();
    
    await expect(
        page.getByText("Kategori baru berhasil ditambahkan.")
    ).toBeVisible();

    await expect(
        page.getByText(category.charCategory.name)
    ).toBeVisible();

})

test('TC005 - Add Category - Numeric Category Name', async ({page})=>{
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

    await categoryPage.addCategory(
        category.numericCategory.name
    );

    await page.getByPlaceholder('Cari kategori...').fill(category.numericCategory.name);
    await page.keyboard.press('Enter');

    await expect(
        page.getByText("Kategori Ditambahkan")
    ).toBeVisible();
    
    await expect(
        page.getByText("Kategori baru berhasil ditambahkan.")
    ).toBeVisible();

    await expect(
        page.getByText(category.numericCategory.name)
    ).toBeVisible();

})

test('TC006 - Add Category - Alphanumeric & character Category Name', async ({page})=>{
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

    await categoryPage.addCategory(
        category.combiCategory.name
    );

    await page.getByPlaceholder('Cari kategori...').fill(category.combiCategory.name);
    await page.keyboard.press('Enter');

    await expect(
        page.getByText("Kategori Ditambahkan")
    ).toBeVisible();
    
    await expect(
        page.getByText("Kategori baru berhasil ditambahkan.")
    ).toBeVisible();

    await expect(
        page.getByText(category.combiCategory.name)
    ).toBeVisible();

})

test('TC007 - Add Category - Empty Category Name', async ({page})=>{
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

    await categoryPage.addCategory(
        category.emptyCategory.name
    );

    const validationMessage = await categoryPage.categoryNameTextbox.evaluate(
        (el: HTMLInputElement) => el.validationMessage
    );

    expect(validationMessage).toBe('Please fill out this field.');
})

test('TC008 - Add Category - Long Category Name', async ({page})=>{
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

    await categoryPage.addCategory(
        category.longCategory.name
    );

    await page.getByPlaceholder('Cari kategori...').fill(category.longCategory.name);
    await page.keyboard.press('Enter');
    
    await expect(
        page.getByText("Kategori Ditambahkan")
    ).toBeVisible();
    
    await expect(
        page.getByText("Kategori baru berhasil ditambahkan.")
    ).toBeVisible();

    await expect(
        page.getByText(category.longCategory.name)
    ).toBeVisible();
})

test('TC009 - Add Category - "Batal" Button', async ({page})=>{
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

    await categoryPage.categoryManagementButton.click();

    await categoryPage.addCategoryButton.click();

    await categoryPage.cancelCategoryButton.click();

    await expect (
        page.getByText("Manajemen Kategori")
    ).toBeVisible();
})