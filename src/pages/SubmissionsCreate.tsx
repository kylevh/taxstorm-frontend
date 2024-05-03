import { Button, ButtonGroup, Fieldset, Header, Label, Link, RequiredMarker, Select, StepIndicator, StepIndicatorStep, TextInput, Title } from "@trussworks/react-uswds";
import React, { useState } from 'react';
import { FormData, W2Info } from '../interfaces/FormData';

export default function SubmissionsCreate() {
    const [currentStep, setCurrentStep] = useState(-1);
    const [formData, setFormData] = useState<FormData>({
        personalInfo: {},
        w2Info: [],
        additionalIncome: {},
        deductionInfo: {},
        taxCredits: {},
        summary: {}
    });


    const nextStep = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const steps = [
        'Personal Information',
        'W2 Information',
        'Additional Income',
        'Deductions',
        'Credits',
        'Review and Submit'
    ]

    const handleInputChange = (step: keyof FormData, field: string, value: any) => {
        setFormData(prev => ({
            ...prev,
            [step]: {
                ...prev[step],
                [field]: value
            }
        }));
    };

    const handleSubmit = () => {
        // Validate formData here
        // Submit formData to backend AWS server
        console.log(formData);
        // Maybe use axios? not sure
        // axios.post('/api/tax/submit', formData)
        //     .then(response => console.log('Submitted successfully', response))
        //     .catch(error => console.error('Submission error', error));
    };

    const addW2 = () => {
        setFormData(prev => ({
            ...prev,
            w2Info: [...prev.w2Info, {}]  // Add a new empty W2 form
        }));
    };

    const removeW2 = (index: number) => {
        setFormData(prev => ({
            ...prev,
            w2Info: prev.w2Info.filter((_, i) => i !== index)  // Remove W2 form at index
        }));
    };

    const handleW2Change = (index: number, field: keyof W2Info, value: any) => {
        setFormData(prev => ({
            ...prev,
            w2Info: prev.w2Info.map((w2, i) => i === index ? { ...w2, [field]: value } : w2)
        }));
    };

    return (
        <>
            <Header extended>
                <div className="usa-navbar">
                    <Title id="extended-logo">
                        <a href="/" title="Home" aria-label="Home">
                            Create submission
                        </a>
                    </Title>
                </div>
            </Header>
            <main style={{ height: 'calc(100vh - 190px)' }} className="min-w-screen flex flex-col justify-center items-center">
                <div className="w-[60rem] h-[40rem] border-[2px] rounded-xl p-6 flex flex-col justify-between">
                    {currentStep >= 0 && (<StepIndicator
                        headingLevel="h4"
                        ofText="of"
                        stepText="Step"
                    >
                        {steps.map((label, index) => (
                            <StepIndicatorStep
                                key={label}
                                label={label}
                                status={index === currentStep ? 'current' : index < currentStep ? 'complete' : undefined}
                            />
                        ))}
                    </StepIndicator>)}
                    <div className="flex flex-col flex-grow overflow-auto">
                        {currentStep === -1 && (
                            <div>
                                <img src="/images/logos/TaxStorm.svg" alt="TaxStorm Logo" className="w-1/3 mt-5" />
                                <h1 className="text-bold text-3xl">Welcome to the TaxStorm Tax Calculator</h1>
                                <p className=" text-xl">We'll ask some questions to help you get started with your tax journey!</p>
                            </div>
                        )}
                        {currentStep === 0 && (
                            <div className="flex flex-col">
                                <Fieldset legend="Full name" legendStyle="large">
                                    <Label htmlFor="full-name">Full name</Label>
                                    <span className="usa-hint">
                                        For example, Prof. Madeline Martinez Hernandez
                                    </span>
                                    <TextInput id="full-name" name="full-name" type="text" value={formData.personalInfo.name || ''}
                                        onChange={e => handleInputChange('personalInfo', 'name', e.target.value)} />
                                </Fieldset>
                                <Label htmlFor="input-type-text">Social Security Number</Label>
                                <TextInput id="input-type-text" name="input-type-text" type="text" value={formData.personalInfo.ssn || ''}
                                    onChange={e => handleInputChange('personalInfo', 'ssn', e.target.value)} />
                                <Fieldset legend="Personal Address" legendStyle="large">
                                    <p>
                                        Required fields are marked with an asterisk (<RequiredMarker />
                                        ).
                                    </p>
                                    <Label htmlFor="mailing-address-1">Street address</Label>
                                    <TextInput id="mailing-address-1" name="mailing-address-1" type="text" />

                                    <Label htmlFor="mailing-address-2">Street address line 2</Label>
                                    <TextInput id="mailing-address-2" name="mailing-address-2" type="text" />

                                    <Label htmlFor="city" requiredMarker>
                                        City
                                    </Label>
                                    <TextInput id="city" name="city" type="text" required />

                                    <Label htmlFor="state" requiredMarker>
                                        State, territory, or military post
                                    </Label>
                                    <Select id="state" name="state" required>
                                        <option>- Select -</option>
                                        <option value="AL">Alabama</option>
                                        <option value="AK">Alaska</option>
                                        <option value="AZ">Arizona</option>
                                        <option value="AR">Arkansas</option>
                                        <option value="CA">California</option>
                                        <option value="CO">Colorado</option>
                                        <option value="CT">Connecticut</option>
                                        <option value="DE">Delaware</option>
                                        <option value="DC">District of Columbia</option>
                                        <option value="FL">Florida</option>
                                        <option value="GA">Georgia</option>
                                        <option value="HI">Hawaii</option>
                                        <option value="ID">Idaho</option>
                                        <option value="IL">Illinois</option>
                                        <option value="IN">Indiana</option>
                                        <option value="IA">Iowa</option>
                                        <option value="KS">Kansas</option>
                                        <option value="KY">Kentucky</option>
                                        <option value="LA">Louisiana</option>
                                        <option value="ME">Maine</option>
                                        <option value="MD">Maryland</option>
                                        <option value="MA">Massachusetts</option>
                                        <option value="MI">Michigan</option>
                                        <option value="MN">Minnesota</option>
                                        <option value="MS">Mississippi</option>
                                        <option value="MO">Missouri</option>
                                        <option value="MT">Montana</option>
                                        <option value="NE">Nebraska</option>
                                        <option value="NV">Nevada</option>
                                        <option value="NH">New Hampshire</option>
                                        <option value="NJ">New Jersey</option>
                                        <option value="NM">New Mexico</option>
                                        <option value="NY">New York</option>
                                        <option value="NC">North Carolina</option>
                                        <option value="ND">North Dakota</option>
                                        <option value="OH">Ohio</option>
                                        <option value="OK">Oklahoma</option>
                                        <option value="OR">Oregon</option>
                                        <option value="PA">Pennsylvania</option>
                                        <option value="RI">Rhode Island</option>
                                        <option value="SC">South Carolina</option>
                                        <option value="SD">South Dakota</option>
                                        <option value="TN">Tennessee</option>
                                        <option value="TX">Texas</option>
                                        <option value="UT">Utah</option>
                                        <option value="VT">Vermont</option>
                                        <option value="VA">Virginia</option>
                                        <option value="WA">Washington</option>
                                        <option value="WV">West Virginia</option>
                                        <option value="WI">Wisconsin</option>
                                        <option value="WY">Wyoming</option>
                                        <option value="AA">AA - Armed Forces Americas</option>
                                        <option value="AE">AE - Armed Forces Africa</option>
                                        <option value="AE">AE - Armed Forces Canada</option>
                                        <option value="AE">AE - Armed Forces Europe</option>
                                        <option value="AE">AE - Armed Forces Middle East</option>
                                        <option value="AP">AP - Armed Forces Pacific</option>
                                    </Select>

                                    <Label htmlFor="zip">ZIP Code</Label>
                                    <TextInput id="zip" name="zip" type="text" inputSize="medium" pattern="[\d]{5}(-[\d]{4})?" />

                                    <Label htmlFor="urbanization">Urbanization (Puerto Rico only)</Label>
                                    <TextInput id="urbanization" name="urbanization" type="text" />
                                </Fieldset>
                                <select
                                    value={formData.personalInfo.filingStatus || ''}
                                    onChange={e => handleInputChange('personalInfo', 'filingStatus', e.target.value)}
                                >
                                    <option value="">Select Filing Status</option>
                                    <option value="single">Single</option>
                                    <option value="married">Married</option>
                                    <option value="headOfHousehold">Head of Household</option>
                                </select>
                            </div>
                        )}

                        {currentStep === 1 && (
                            <div>
                                <h1 className="text-bold text-3xl">W2 Information</h1>
                                {formData.w2Info.map((w2, index) => (
                                    <div className="flex flex-col" key={index}>
                                        <h2 className="text-2xl">W2 Form {index + 1}</h2>
                                        <Label htmlFor="employer-name">Employer Name</Label>
                                        <TextInput id="employer-name" name="employer-name" className="usa-focus" type="text" value={w2.employerName || ''}
                                            onChange={e => handleW2Change(index, 'employerName', e.target.value)} />

                                        <Label htmlFor="employer-id">Employer ID</Label>
                                        <TextInput id="employer-id" name="employer-id" className="usa-focus" type="text" value={w2.employerID || ''}
                                            onChange={e => handleW2Change(index, 'employerID', e.target.value)} />

                                        <Label htmlFor="wages">Wages</Label>
                                        <TextInput id="wages" name="wages" className="usa-focus" type="text" value={w2.wages || ''}
                                            onChange={e => handleW2Change(index, 'wages', parseFloat(e.target.value))} />
                                        <ButtonGroup>
                                            <Button type="button" secondary className="mt-2" onClick={() => removeW2(index)}>Remove W2</Button>
                                        </ButtonGroup>

                                    </div>
                                ))}
                                <Button type="button" className="margin-top-2" onClick={addW2}>Add W2</Button>
                            </div>
                        )}
                        {currentStep === 2 && (
                            <div>
                                <h1 className="text-bold text-3xl">Additional Income</h1>
                                <Fieldset legend="Additional Income Details" legendStyle="large">
                                    <Label htmlFor="unemployment">Unemployment</Label>
                                    <TextInput id="unemployment" name="unemployment" type="number" value={formData.additionalIncome.unemployment || ''}
                                        onChange={e => handleInputChange('additionalIncome', 'unemployment', parseFloat(e.target.value))} />

                                    <Label htmlFor="interestIncome">Interest Income</Label>
                                    <TextInput id="interestIncome" name="interestIncome" type="number" value={formData.additionalIncome.interestIncome || ''}
                                        onChange={e => handleInputChange('additionalIncome', 'interestIncome', parseFloat(e.target.value))} />

                                    <Label htmlFor="dividendIncome">Dividend Income</Label>
                                    <TextInput id="dividendIncome" name="dividendIncome" type="number" value={formData.additionalIncome.dividendIncome || ''}
                                        onChange={e => handleInputChange('additionalIncome', 'dividendIncome', parseFloat(e.target.value))} />
                                </Fieldset>
                            </div>
                        )}
                        {currentStep === 3 && (
                            <div>
                                <h1 className="text-bold text-3xl">Deductions</h1>
                                <Fieldset legend="Deduction Details" legendStyle="large">
                                    <Label htmlFor="studentLoanInterest">Student Loan Interest</Label>
                                    <TextInput id="studentLoanInterest" name="studentLoanInterest" type="number" value={formData.deductionInfo.studentLoanInterest || ''}
                                        onChange={e => handleInputChange('deductionInfo', 'studentLoanInterest', parseFloat(e.target.value))} />

                                    <Label htmlFor="retirementContributions">Retirement Contributions</Label>
                                    <TextInput id="retirementContributions" name="retirementContributions" type="number" value={formData.deductionInfo.retirementContributions || ''}
                                        onChange={e => handleInputChange('deductionInfo', 'retirementContributions', parseFloat(e.target.value))} />

                                    <Label htmlFor="medicalExpenses">Medical Expenses</Label>
                                    <TextInput id="medicalExpenses" name="medicalExpenses" type="number" value={formData.deductionInfo.medicalExpenses || ''}
                                        onChange={e => handleInputChange('deductionInfo', 'medicalExpenses', parseFloat(e.target.value))} />

                                    <Label htmlFor="charitableContributions">Charitable Contributions</Label>
                                    <TextInput id="charitableContributions" name="charitableContributions" type="number" value={formData.deductionInfo.charitableContributions || ''}
                                        onChange={e => handleInputChange('deductionInfo', 'charitableContributions', parseFloat(e.target.value))} />
                                </Fieldset>
                            </div>
                        )}
                        {currentStep === 4 && (
                            <div>
                                <h1 className="text-bold text-3xl">Tax Credits</h1>
                                <Fieldset legend="Tax Credit Details" legendStyle="large">
                                    <Label htmlFor="educationCredits">Education Credits</Label>
                                    <TextInput id="educationCredits" name="educationCredits" type="number" value={formData.taxCredits.educationCredits || ''}
                                        onChange={e => handleInputChange('taxCredits', 'educationCredits', parseFloat(e.target.value))} />

                                    <Label htmlFor="foreignTaxCredit">Foreign Tax Credit</Label>
                                    <TextInput id="foreignTaxCredit" name="foreignTaxCredit" type="number" value={formData.taxCredits.foreignTaxCredit || ''}
                                        onChange={e => handleInputChange('taxCredits', 'foreignTaxCredit', parseFloat(e.target.value))} />

                                    <Label htmlFor="childTaxCredit">Child Tax Credit</Label>
                                    <TextInput id="childTaxCredit" name="childTaxCredit" type="number" value={formData.taxCredits.childTaxCredit || ''}
                                        onChange={e => handleInputChange('taxCredits', 'childTaxCredit', parseFloat(e.target.value))} />

                                    <Label htmlFor="dependentCareExpenses">Dependent Care Expenses</Label>
                                    <TextInput id="dependentCareExpenses" name="dependentCareExpenses" type="number" value={formData.taxCredits.dependentCareExpenses || ''}
                                        onChange={e => handleInputChange('taxCredits', 'dependentCareExpenses', 'dependentCareExpenses')} />
                                </Fieldset>
                            </div>
                        )}
                        {currentStep === 5 && (
                            <div>
                                <h1 className="text-bold text-3xl">Review and Submit</h1>
                                <div className="review-section">
                                    <h2 className="text-2xl py-2">Personal Information</h2>
                                    <p><strong>Full Name:</strong> {formData.personalInfo.name}</p>
                                    <p><strong>SSN:</strong> {formData.personalInfo.ssn}</p>
                                    <p><strong>Address:</strong> {formData.personalInfo.address}</p>
                                    <p><strong>Filing Status:</strong> {formData.personalInfo.filingStatus}</p>

                                    <h2 className="text-2xl py-2">W2 Information</h2>
                                    {formData.w2Info.map((w2, index) => (
                                        <div key={index}>
                                            <p><strong>Employer Name {index + 1}:</strong> {w2.employerName}</p>
                                            <p><strong>Employer ID:</strong> {w2.employerID}</p>
                                            <p><strong>Wages:</strong> {w2.wages}</p>
                                        </div>
                                    ))}

                                    <h2 className="text-2xl py-2">Additional Income</h2>
                                    <p><strong>Unemployment:</strong> {formData.additionalIncome.unemployment}</p>
                                    <p><strong>Interest Income:</strong> {formData.additionalIncome.interestIncome}</p>
                                    <p><strong>Dividend Income:</strong> {formData.additionalIncome.dividendIncome}</p>

                                    <h2 className="text-2xl py-2">Deductions</h2>
                                    <p><strong>Student Loan Interest:</strong> {formData.deductionInfo.studentLoanInterest}</p>
                                    <p><strong>Retirement Contributions:</strong> {formData.deductionInfo.retirementContributions}</p>
                                    <p><strong>Medical Expenses:</strong> {formData.deductionInfo.medicalExpenses}</p>
                                    <p><strong>Charitable Contributions:</strong> {formData.deductionInfo.charitableContributions}</p>

                                    <h2 className="text-2xl py-2">Tax Credits</h2>
                                    <p><strong>Education Credits:</strong> {formData.taxCredits.educationCredits}</p>
                                    <p><strong>Foreign Tax Credit:</strong> {formData.taxCredits.foreignTaxCredit}</p>
                                    <p><strong>Child Tax Credit:</strong> {formData.taxCredits.childTaxCredit}</p>
                                    <p><strong>Dependent Care Expenses:</strong> {formData.taxCredits.dependentCareExpenses}</p>
                                </div>
                            </div>
                        )}
                    </div>

                    <ButtonGroup>
                        <Button type="button" className="usa-button--outline" onClick={prevStep} disabled={currentStep === -1}>Previous</Button>
                        {currentStep < steps.length - 1 ? (
                            <Button type="button" onClick={nextStep} disabled={currentStep === steps.length - 1}>Next</Button>
                        ) : (
                            <Link href="/submissions/result"><Button type="button" accentStyle="warm" onClick={handleSubmit}>Submit</Button></Link>
                        )}
                    </ButtonGroup>
                </div>
            </main>
        </>
    )
}

