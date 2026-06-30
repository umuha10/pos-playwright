// Megambil object test dan expect dari Playwright
import { test, expect } from '@playwright/test';

// Import Page Object untuk halaman Login
import { LoginPage} from '../pages/LoginPage';

// Mengambil environtment dari variable (usernam & password)
import process from 'node:process'; 

import device from '../test-data/device.json';
import users from '../test-data/users.json';

// Membuat test case
test('TC001 Login - Empty Username & Password', async ({page}) => {
    
    // Membuat instance LoginPage
    const loginPage = new LoginPage(page);

    // Membuka halaman utama (baseURL + '/')
    await page.goto('/');

    // Login menggunakan username & password dari file users.json
    await loginPage.login(
        users.emptyUsernamePassword.username,
        users.emptyUsernamePassword.password
    );

    await expect(page.getByText('Gagal Login')).toBeVisible();
    await expect(page.getByText('required, required')).toBeVisible();
})

// Membuat test case
test('TC002 Login - Empty Username', async ({page}) => {
    
    // Membuat instance LoginPage
    const loginPage = new LoginPage(page);

    // Membuka halaman utama (baseURL + '/')
    await page.goto('/');

    // Login menggunakan username & password dari file users.json
    await loginPage.login(
        users.emptyUsername.username,
        users.emptyUsername.password
    );

    await expect(page.getByText('Gagal Login')).toBeVisible();
    await expect(page.getByText('required')).toBeVisible();
})

// Membuat test case
test('TC003 Login - Empty Password', async ({page}) => {
    
    // Membuat instance LoginPage
    const loginPage = new LoginPage(page);

    // Membuka halaman utama (baseURL + '/')
    await page.goto('/');

    // Login menggunakan username & password dari file users.json
    await loginPage.login(
        users.emptyPassword.username,
        users.emptyPassword.password
    );

    await expect(page.getByText('Gagal Login')).toBeVisible();
    await expect(page.getByText('required')).toBeVisible();
})

// Membuat test case
test('TC004 Login - Invalid Username', async ({page}) => {
    
    // Membuat instance LoginPage
    const loginPage = new LoginPage(page);

    // Membuka halaman utama (baseURL + '/')
    await page.goto('/');

    // Login menggunakan username & password dari file users.json
    await loginPage.login(
        users.invalidUsername.username,
        process.env.APP_PASSWORD
    );

    await expect(page.getByText('Gagal Login')).toBeVisible();
    await expect(page.getByText('record not found')).toBeVisible();
})

// Membuat test case
test('TC005 Login - Invalid Password', async ({page}) => {
    
    // Membuat instance LoginPage
    const loginPage = new LoginPage(page);

    // Membuka halaman utama (baseURL + '/')
    await page.goto('/');

    // Login menggunakan username & password dari file users.json
    await loginPage.login(
        process.env.APP_USERNAME,
        users.invalidPassword.password
    );

    await expect(page.getByText('Gagal Login')).toBeVisible();
    await expect(page.getByText('password tidak sesuai')).toBeVisible();
})

// Membuat test case
test('TC006 Login - Invalid Username & Password', async ({page}) => {
    
    // Membuat instance LoginPage
    const loginPage = new LoginPage(page);

    // Membuka halaman utama (baseURL + '/')
    await page.goto('/');

    // Login menggunakan username & password dari file users.json
    await loginPage.login(
        users.invalidUsernamePassword.username,
        users.invalidUsernamePassword.password
    );

    await expect(page.getByText('Gagal Login')).toBeVisible();
    await expect(page.getByText('record not found')).toBeVisible();
})


// Membuat test case
test('TC007 Login - New device - Empty Device Name', async ({page}) => {
    
    // Membuat instance LoginPage
    const loginPage = new LoginPage(page);

    // Membuka halaman utama (baseURL + '/')
    await page.goto('/');

    // Login menggunakan username & password dari file .env
    await loginPage.login(
        process.env.APP_USERNAME!,
        process.env.APP_PASSWORD!
    );

    // Memastikan tombol Register muncul setelah login berhasil
    await expect(loginPage.registerButton)
        .toBeVisible();

    await page.waitForTimeout(5000);

    // Mendengarkan event dialog (alert/confirm/prompt)
    page.once('dialog', async dialog =>{
        
        // Memastikan isi alert sesaui yang diharapkan
        expect(dialog.message()).toContain('Nama perangkat tidak boleh kosong');

        // Menekan tombol OK pada alert
        await dialog.accept();
    });

    // Klik tombol register tanpa mengisi nama perangkat
    await loginPage.registerButton.click();
})

test('TC008 Login - New Device - Valid Device Name', async ({page}) => {
    // Membuat instance LoginPage
    const loginPage = new LoginPage(page);

    // Membuka halaman utama (baseURL + '/')
    await page.goto('/');

    // Login menggunakan username & password dari file .env
    await loginPage.login(
        process.env.APP_USERNAME!,
        process.env.APP_PASSWORD!
    );

    // Isi nama perangkat
    await loginPage.registerDevice(
        device.deviceName.name
    );

    await page.waitForTimeout(5000);

    page.getByPlaceholder('Masukkan nama pelanggan');

    // await expect(page).toHaveURL('/kasir');
    await expect(
        page.getByPlaceholder('Masukkan nama pelanggan')
    ).toBeVisible();

})

test('TC009 Login - New Device - Numeric Device Name', async ({page}) => {
    // Membuat instance LoginPage
    const loginPage = new LoginPage(page);

    // Membuka halaman utama (baseURL + '/')
    await page.goto('/');

    // Login menggunakan username & password dari file .env
    await loginPage.login(
        process.env.APP_USERNAME!,
        process.env.APP_PASSWORD!
    );

    // Isi nama perangkat
    await loginPage.registerDevice(
        device.numericDeviceName.name
    );

    await page.waitForTimeout(5000);

    page.getByPlaceholder('Masukkan nama pelanggan');

    // await expect(page).toHaveURL('/kasir');
    await expect(
        page.getByPlaceholder('Masukkan nama pelanggan')
    ).toBeVisible();

})

test('TC010 Login - New Device - Character Device Name', async ({page}) => {
    // Membuat instance LoginPage
    const loginPage = new LoginPage(page);

    // Membuka halaman utama (baseURL + '/')
    await page.goto('/');

    // Login menggunakan username & password dari file .env
    await loginPage.login(
        process.env.APP_USERNAME!,
        process.env.APP_PASSWORD!
    );

    // Isi nama perangkat
    await loginPage.registerDevice(
        device.charDeviceName.name
    );

    await page.waitForTimeout(5000);

    page.getByPlaceholder('Masukkan nama pelanggan');

    // await expect(page).toHaveURL('/kasir');
    await expect(
        page.getByPlaceholder('Masukkan nama pelanggan')
    ).toBeVisible();

})
test('TC011 Login - New Device - Combination Device Name', async ({page}) => {
    // Membuat instance LoginPage
    const loginPage = new LoginPage(page);

    // Membuka halaman utama (baseURL + '/')
    await page.goto('/');

    // Login menggunakan username & password dari file .env
    await loginPage.login(
        process.env.APP_USERNAME!,
        process.env.APP_PASSWORD!
    );

    // Isi nama perangkat
    await loginPage.registerDevice(
        device.combinationDeviceName.name
    );

    await page.waitForTimeout(5000);

    page.getByPlaceholder('Masukkan nama pelanggan');

    // await expect(page).toHaveURL('/kasir');
    await expect(
        page.getByPlaceholder('Masukkan nama pelanggan')
    ).toBeVisible();

})