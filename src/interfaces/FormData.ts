export interface W2Info {
    employerName?: string;
    employerID?: string;
    wages?: number;
    federalTaxWithheld?: number;
    stateTaxWithheld?: number;
    socialSecurityWages?: number;
    medicareWages?: number;
}

export interface FormData {
    personalInfo: {
        name?: string;
        ssn?: string; // Social Security Number
        address?: string;
        filingStatus?: 'single' | 'married' | 'headOfHousehold';
    };
    w2Info: W2Info[];
    additionalIncome: {
        unemployment?: number;
        interestIncome?: number;
        dividendIncome?: number;
    };
    deductionInfo: {
        studentLoanInterest?: number;
        retirementContributions?: number;
        medicalExpenses?: number;
        charitableContributions?: number;
    };
    taxCredits: {
        educationCredits?: number;
        foreignTaxCredit?: number;
        childTaxCredit?: number;
        dependentCareExpenses?: number;
    };
    summary: {};
}