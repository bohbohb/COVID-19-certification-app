export interface Person {
    name: string,
    surname: string,
    birthday: Date,
    birthplace: string,
    phone_number: string,
    email: string,
    emergency_contact: EmergencyContact
}

export interface EmergencyContact {
    name: string,
    surname: string,
    phone_number: string
}

export interface Vaccine {
    dose: string,
    date_of_vaccination: Date,
    place: string,
    country: string,
    agent: string,
    type: string,
    manufacturer: string,
    location: Location
}

export interface Location {
    type: string,
    coordinates: number[]
}

export interface Test {
    date_of_test: Date,
    place: string,
    country: string,
    type: string,
    result: boolean,
    location: Location
}

export interface Certificate {
    _id: string,
    uvci: string,
    generated_on: Date,
    valid_until: Date,
    person: Person
    vaccination: Vaccine[],
    test: Test
}