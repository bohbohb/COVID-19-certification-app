export interface PersonalInformation {
    firstname: string,
    lastname: string,
    birthdate: Date,
    birthplace: string,
    phonenumber: string,
    email: string,
    ecFirstname: string,
    ecLastname: string,
    ecPhonenumber: string
}

export interface VaccinationForm extends PersonalInformation {
    dose: number,
    vaccinationDate: Date,
    vaccinationPlace: string,
    manufacturer: string
}

export interface TestForm extends PersonalInformation {
    testDate: Date,
    testPlace: string,
    testResult: boolean
}

export interface AddVaccineForm {
    fullname: string,
    firstname: string,
    lastname: string,
    dose: number,
    vaccinationDate: Date,
    vaccinationPlace: string,
    manufacturer: string
}