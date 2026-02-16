import { test as base } from '@playwright/test';
import ContactPage from '../page-object-models/pages/ContactPage';

type BaseFixture = {
    contactPage: ContactPage;
};

export const test = base.extend<BaseFixture>({
    contactPage: async ({ page }, use) => {
        await use(new ContactPage(page));
    },
});

export { expect } from '@playwright/test';
