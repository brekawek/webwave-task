import { expect, Page } from '@playwright/test';
import { helpers } from '../../utils/helpers';

export type formDataType = {
    firstName: string;
    lastName: string;
    email: string;
};

export default class ContactPage {
    constructor(private page: Page) {}

    firstNameInput = this.page.getByPlaceholder('Imię');
    lastNameInput = this.page.getByPlaceholder('Nazwisko');
    emailInput = this.page.getByPlaceholder('Email');
    dateTime = {
        dateTimePicker: this.page.locator('[datepicker="datetimepicker"]'),
        selectDay: (dayNumber: number) =>
            this.page.locator('[data-handler="selectDay"]').getByText(dayNumber.toString()),
    };
    submitButton = this.page.locator('.ww_inner_element_content').filter({ hasText: 'Wyślij' });

    formSentSuccessfullyText = this.page
        .getByText('Formularz został wysłany — dziękujemy.')
        .first();
    invalidFormText = this.page.getByText('Proszę wypełnić wszystkie wymagane pola!').first();

    async fillForm(formData: formDataType) {
        const currentDayDate = new Date();
        const currentDayDateNumber = currentDayDate.getDate();
        const expectedDateWithTimeFirstOption =
            await helpers.getDateFormatWithTimeFirstOption(currentDayDate);
        const expectedDateWithTimeSecondOption =
            await helpers.getDateFormatWithTimeSecondOption(currentDayDate);
        const expectedDateWithTimeThirdOption =
            await helpers.getDateFormatWithTimeThirdOption(currentDayDate);
        const expectedDateWithoutTime = await helpers.getDateFormatWithoutTime(currentDayDate);

        await this.firstNameInput.fill(formData.firstName);
        await this.lastNameInput.fill(formData.lastName);
        await this.emailInput.fill(formData.email);

        await this.dateTime.dateTimePicker.click();
        await this.dateTime.selectDay(currentDayDateNumber).click();

        const actualDateValue = await this.dateTime.dateTimePicker.inputValue();

        // Determine which expected date format matches the actual value
        let expectedDateValue: string;
        switch (actualDateValue) {
            case expectedDateWithTimeFirstOption:
                expectedDateValue = expectedDateWithTimeFirstOption;
                break;
            case expectedDateWithTimeSecondOption:
                expectedDateValue = expectedDateWithTimeSecondOption;
                break;
            case expectedDateWithTimeThirdOption:
                expectedDateValue = expectedDateWithTimeThirdOption;
                break;
            case expectedDateWithoutTime:
                expectedDateValue = expectedDateWithoutTime;
                break;
            default:
                throw new Error(
                    `Unexpected date value. Got "${actualDateValue}", expected one of: "${expectedDateWithTimeFirstOption}", "${expectedDateWithTimeSecondOption}", "${expectedDateWithTimeThirdOption}", "${expectedDateWithoutTime}"`,
                );
        }

        await expect(this.dateTime.dateTimePicker).toHaveValue(expectedDateValue);

        // Close date picker
        await this.page.keyboard.press('Escape');

        return expectedDateValue;
    }
}
