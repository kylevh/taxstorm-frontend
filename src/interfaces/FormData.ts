export interface W2Info {
    employerName?: string;
    wages?: number;
    federalTaxWithheld?: number;
    stateTaxWithheld?: number;
    socialSecurityWages?: number;
    medicareWages?: number;
}

export interface Deduction extends Value{
    id?: number,
    name?: string,
}

export interface UserDeduction {
    deductionId?: number,
    amountSpent?: number,
}

export interface Value {
    value: number;
}

export interface Countable {
    count: number;
}

export interface CreditType{
    id?: number,
    name?: string,
    value?: number,
}

export interface CreditWithCount extends Countable{
    id?: number,
    name?: string,
    value?: number,
}

export interface Credit {
    userId?: number,
    year?: number,
    creditId?: number,
    creditsClaimed?: number,
}

export interface AddressComponent{
    streetAddress?: string;
    city?: string;
    state?: string;
    zip?: string;
}

export interface PersonalInfo {
    firstName: string;
    lastName: string;
    addressComponent: AddressComponent;
    phoneNumber: string;
    ssn: string;
}

export interface FormData {
    personalInfo: PersonalInfo;
    w2Info: W2Info[];
    deductions: Deduction[];
    credits: CreditWithCount[];
    summary: {};
}