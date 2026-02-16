import { expect, test } from '../fixtures/BaseFixture';
import { formData } from '../test-data/testData';
import { helpers } from '../utils/helpers';

test.describe('Contact form', () => {
    test('fill in the form and submit - happy path', async ({ page, contactPage }) => {
        const contactFormData = { ...formData };

        await page.goto('/');
        // domain expired - workaround:
        const newUrl = page.locator('.link-to-page');
        await expect(newUrl).not.toHaveAttribute('href', '#');
        await newUrl.click();

        await helpers.cookieHandler(page);

        await contactPage.fillForm(contactFormData);

        // TO FIX: Test is flaky at this point
        await contactPage.submitButton.click();

        await expect(contactPage.formSentSuccessfullyText).toBeVisible();
        await expect(contactPage.firstNameInput).toBeEmpty();
        await expect(contactPage.lastNameInput).toBeEmpty();
        await expect(contactPage.emailInput).toBeEmpty();
        await expect(contactPage.dateTime.dateTimePicker).toBeEmpty();
    });

    test('fill in the form and submit - email validation', async ({ page, contactPage }) => {
        const incorrectEmail = ',,test';
        const contactFormData = { ...formData, email: incorrectEmail };

        await page.goto('/');
        // domain expired - workaround:
        const newUrl = page.locator('.link-to-page');
        await expect(newUrl).not.toHaveAttribute('href', '#');
        await newUrl.click();

        await helpers.cookieHandler(page);

        const expectedDateValue = await contactPage.fillForm(contactFormData);

        // TO FIX: Test is flaky at this point
        await contactPage.submitButton.click();

        await expect(contactPage.invalidFormText).toBeVisible();
        await expect(contactPage.firstNameInput).toHaveValue(contactFormData.firstName);
        await expect(contactPage.lastNameInput).toHaveValue(contactFormData.lastName);
        await expect(contactPage.emailInput).toHaveValue(incorrectEmail);
        await expect(contactPage.dateTime.dateTimePicker).toHaveValue(expectedDateValue);
    });
});
