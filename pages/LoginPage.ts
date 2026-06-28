import { Page, page } from '@playwright/test';

export class LoginPage {
    constructor(private page: Page){}

    username = this.page.getByPlaceholder('Username');
    password = this.page.getByPlaceholder('Password');
    loginButton = this.page.getByRole('button', {
        name: 'Login',
    });

    deviceNameTextbox = this.page.getByPlaceholder('Contoh: Kasir Utama');
    registerButton = this.page.getByRole('button', {
        name: 'Daftarkan Perangkat',
    });

    async login(username:string, password:string) {
        await this.username.fill(username);
        await this.password.fill(password);
        await this.loginButton.click();
    }

    async registerDevice(deviceName:string){
        await this.deviceNameTextbox.fill(deviceName);
        await this.registerButton.click();
    }
}   