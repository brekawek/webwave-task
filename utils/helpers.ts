import { Page } from '@playwright/test';
import { expect } from '../fixtures/BaseFixture';

export const helpers = {
    async cookieHandler(page: Page) {
        const cookiePopup = page.locator('#c00kie-popup');
        const acceptAllButton = page.getByRole('button', {
            name: 'Zezwól na wszystkie',
            exact: true,
        });

        await page.addLocatorHandler(cookiePopup, async () => {
            await acceptAllButton.click();
            await expect(cookiePopup).toBeHidden();
        });
    },

    async getDateFormatWithTimeFirstOption(date: Date) {
        // get day in YYYY-MM-DD 00:00 format
        const newDate = new Date(date.getTime());
        const yyyy = newDate.getFullYear();
        const mm = String(newDate.getMonth() + 1).padStart(2, '0');
        const dd = String(newDate.getDate()).padStart(2, '0');
        const dateFormat = `${yyyy}-${mm}-${dd} 00:00`;

        return dateFormat;
    },
    async getDateFormatWithTimeSecondOption(date: Date) {
        // get day in MM-DD-YYYY 00:00 format
        const newDate = new Date(date.getTime());
        const yyyy = newDate.getFullYear();
        const mm = String(newDate.getMonth() + 1).padStart(2, '0');
        const dd = String(newDate.getDate()).padStart(2, '0');
        const dateFormat = `${mm}-${dd}-${yyyy} 00:00`;

        return dateFormat;
    },
    async getDateFormatWithTimeThirdOption(date: Date) {
        // get day in MM/DD/YYYY 00:00 format
        const newDate = new Date(date.getTime());
        const yyyy = newDate.getFullYear();
        const mm = String(newDate.getMonth() + 1).padStart(2, '0');
        const dd = String(newDate.getDate()).padStart(2, '0');
        const dateFormat = `${mm}/${dd}/${yyyy} 00:00`;

        return dateFormat;
    },
    async getDateFormatWithoutTime(date: Date) {
        // format as MM/DD/YYYY
        const newDate = new Date(date.getTime());
        const mm = String(newDate.getMonth() + 1).padStart(2, '0');
        const dd = String(newDate.getDate()).padStart(2, '0');
        const yyyy = newDate.getFullYear();
        const dateFormat = `${mm}/${dd}/${yyyy}`;

        return dateFormat;
    },
};
