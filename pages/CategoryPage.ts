import { Page, page } from "@playwright/test";

export class CategoryPage {
    constructor (private page: Page){}

    categoryNameTextbox = this.page.getByPlaceholder('Contoh: Makanan');
    categoryNameSaveButton = this.page.getByRole('button', {
        name: 'Simpan',
    });
    categoryManagementButton = this.page.getByRole('button',{
        name: 'Management Kategori',
    });
    addCategoryButton = this.page.getByRole('button',{
        name: 'Tambah Kategori',
    });

    async addCategory(categoryName: string){
        await this.addCategoryButton.click();
        await this.categoryNameTextbox.fill(categoryName);
        await this.categoryNameSaveButton.click();
    }


}