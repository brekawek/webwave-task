import { faker } from '@faker-js/faker';
import { formDataType } from '../page-object-models/pages/ContactPage';

export const formData: formDataType = {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
};
