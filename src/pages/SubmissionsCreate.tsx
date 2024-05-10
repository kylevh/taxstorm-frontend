import { Alert, Button, ButtonGroup, Fieldset, Grid, GridContainer, Header, Label, Link, RequiredMarker, Select, StepIndicator, StepIndicatorStep, TextInput, Title } from "@trussworks/react-uswds";
import React, { useState, useEffect } from 'react';
import { FormData, W2Info, CreditWithCount, Countable, PersonalInfo, AddressComponent, Deduction, UserDeduction } from '../interfaces/FormData';
import axios from 'axios';
import { useAppSelector } from '../store/hooks';
import { useNavigate } from 'react-router-dom';

export default function SubmissionsCreate() {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [year, setYear] = useState(2024);
    const [currentStep, setCurrentStep] = useState(-1);
    const [credits, setCredits] = useState<CreditWithCount[]>([]);
    const [deductions, setDeductions] = useState<Deduction[]>([]);
    const [userDeductions, setUserDeductions] = useState<UserDeduction[]>([]);
    const userId = useAppSelector((state: any) => state.user.userData.id); // Use the selector
    const userData = useAppSelector((state: any) => state.user.userData); // Use the selector
    const token = useAppSelector((state: any) => state.user.token);

    const [addressComponent, setAddressComponent] = useState<AddressComponent>({
        streetAddress: '',
        city: '',
        state: '',
        zip: '',
    });

    const [formData, setFormData] = useState<FormData>({
        personalInfo: {
            firstName: '',
            lastName: '',
            addressComponent: {
                streetAddress: '',
                city: '',
                state: '',
                zip: '',
            },
            phoneNumber: '',
            ssn: ''
        },
        w2Info: [],
        deductions: [],
        credits: [],
        summary: {}
    });

    useEffect(() => {
        const fetchCredits = async () => {
            try {
                const response = await axios.get('http://localhost:8080/taxstorm/credits', { headers: { Authorization: `Basic ${token}` } });
                setCredits(response.data.map((credit: CreditWithCount) => ({ ...credit, count: 0 })));
            } catch (error) {
                console.error('Failed to fetch credits', error);
            }
        };

        const fetchDeductions = async () => {
            try {
                const response = await axios.get('http://localhost:8080/taxstorm/deductions', { headers: { Authorization: `Basic ${token}` } });
                setDeductions(response.data.map((deduction: Deduction) => ({ ...deduction })));
            } catch (error) {
                console.error('Failed to fetch deductions', error);
            }
        };

        fetchCredits();
        fetchDeductions();
    }, []);

    const nextStep = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
        else {
            setCurrentStep(currentStep - 1);
        }
    };

    const steps = [
        'Personal Information',
        'W2 Information',
        'Deductions',
        'Credits',
        'Review and Submit'
    ]

    const handleAddUserDeduction = (deductionId: number) => {
        if (deductionId) { // Check if a valid deduction ID is selected
            setUserDeductions(prev => [...prev, { deductionId: deductionId, amountSpent: 0 }]);
        }
    };

    const handleRemoveUserDeduction = (index: number) => {
        setUserDeductions(prev => prev.filter((_, i) => i !== index));
    };

    const handleEditUserDeduction = (index: number, newAmount: number) => {
        setUserDeductions(prev => prev.map((deduction, i) => i === index ? { ...deduction, amountSpent: newAmount } : deduction));
    };

    // Function to decrement the count of a credit
    const handleDecrement = (index: number) => {
        setCredits(credits => credits.map((credit, i) => {
            if (i === index) {
                return { ...credit, count: Math.max(credit.count - 1, 0) }; // Ensure count doesn't go below 0
            }
            return credit;
        }));
    };

    // Function to increment the count of a credit
    const handleIncrement = (index: number) => {
        setCredits(credits => credits.map((credit, i) => {
            if (i === index) {
                return { ...credit, count: credit.count + 1 };
            }
            return credit;
        }));
    };

    const handleInputChange = (step: keyof FormData, field: string, value: any) => {

        setFormData(prev => ({
            ...prev,
            [step]: {
                ...prev[step],
                [field]: value
            }
        }));

    };

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        // Submit personal information
        const personalInfoData = {
            firstName: formData.personalInfo.firstName,
            lastName: formData.personalInfo.lastName,
            email: userData.email,
            address: `${addressComponent.streetAddress}, ${addressComponent.city}, ${addressComponent.state} ${addressComponent.zip}`,
            phoneNumber: formData.personalInfo.phoneNumber,
            ssn: formData.personalInfo.ssn
        };

        try {
            console.log(personalInfoData);
            const response = await axios.put(`http://localhost:8080/taxstorm/users/${userId}`, personalInfoData, {
                headers: {
                    Authorization: `Basic ${token}`
                }
            });
            console.log('Personal information submitted successfully', response.data);
        } catch (error) {
            console.error('Error submitting personal information', error);
            setError('Failed to submit personal information. Please try again.');
        }

        // Submit all the W2s created in form
        for (const w2 of formData.w2Info) {
            const w2Data = {
                employer: w2.employerName,
                year: year, // Assuming the year is static or fetched from somewhere
                wages: w2.wages,
                federalTaxesWithheld: w2.federalTaxWithheld,
                socialSecurityTaxesWithheld: w2.socialSecurityWages,
                medicareTaxesWithheld: w2.medicareWages,
                userId: userId
            };

            try {
                const response = await axios.post('http://localhost:8080/taxstorm/w2s', w2Data, {
                    headers: {
                        Authorization: `Basic ${token}`
                    },
                    timeout: 5000
                });
                console.log('W2 submitted successfully', response.data);
            } catch (error) {
                console.log(w2Data);
                console.error('Error submitting W2', error);
            }
        }

        // Submit all the deductions in the form
        for (const userDeduction of userDeductions) {
            const deductionData = {
                userId: userId,
                year: year,
                deductionId: userDeduction.deductionId,
                amountSpent: userDeduction.amountSpent
            };

            if (userDeduction.amountSpent === 0) {
                console.log(`Skipping deduction submission for ${userDeduction.deductionId} as no amount is spent.`);
                continue;
            }

            try {
                const response = await axios.post(`http://localhost:8080/taxstorm/users/${userId}/deductions`, deductionData, {
                    headers: {
                        Authorization: `Basic ${token}`
                    },
                    timeout: 5000
                });
                console.log('Deduction submitted successfully', response.data);
            } catch (error) {
                console.log(deductionData);
                console.error('Error submitting deduction', error);
            }
        }

        // Submit all the tax credits in the form
        console.log(formData);
        for (const credit of credits) {
            const creditData = {
                userId: userId,
                year: year, // Assuming the year is static or fetched from somewhere
                creditId: credit.id,
                creditsClaimed: credit.count
            };

            if (credit.count === 0) {
                console.log(`Skipping credit submission for ${credit.id} as no credits are claimed.`);
                continue;
            }


            try {
                const response = await axios.post(`http://localhost:8080/taxstorm/users/${userId}/credits`, creditData, {
                    headers: {
                        Authorization: `Basic ${token}`
                    },
                    timeout: 5000
                });
                console.log('Credit submitted successfully', response.data);
            } catch (error) {
                console.log(creditData);
                console.error('Error submitting credit', error);
            }
        }

        // Generate/populate tax form {year}
        try {
            const response = await axios.get(`http://localhost:8080/taxstorm/taxforms/${userId}/${year}`, {
                headers: {
                    Authorization: `Basic ${token}`
                },
                timeout: 5000
            });
            console.log('Tax form was POPULATED successfully', response.data);
        } catch (error) {
            console.error('Error populating tax form', error);
        }

        // Submit tax form {year}
        try {
            const response = await axios.post(`http://localhost:8080/taxstorm/taxforms/${userId}/${year}`, {}, {
                headers: {
                    Authorization: `Basic ${token}`
                },
                timeout: 5000
            });

            console.log('Tax form was SUBMITTED successfully', response.data);
            console.log(token)

        } catch (error) {
            console.error('Error submitting tax form', error);
        }


        // navigate('/submissions');

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

    const handleAddressChange = (field: string, value: string) => {
        setAddressComponent(prev => ({
            ...prev,
            [field]: value
        }));
        console.log(addressComponent)
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
            <main style={{ height: 'calc(100vh - 190px)' }} className="main-content">
                <GridContainer className="usa-section">
                    {error && (
                        <Alert type="error" className="margin-bottom-2" heading="Error" headingLevel="h4">
                            {error}
                        </Alert>
                    )}
                    <Grid row={true} className="">
                        <Grid col={12} tablet={{
                            col: 8
                        }} desktop={{
                            col: 6
                        }}>

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

                                    {/* Welcome */}
                                    {currentStep === -1 && (
                                        <div>
                                            <img src="/images/logos/TaxStorm.svg" alt="TaxStorm Logo" className="w-1/3 mt-5" />
                                            <h1 className="text-bold text-3xl">Welcome to the TaxStorm Tax Calculator</h1>
                                            <p className=" text-xl">We'll ask some questions to help you get started with your tax journey!</p>
                                            <p className=" text-xl">Please enter the year you're filing your tax for</p>
                                            <TextInput id="year" className="margin-top-4" name="year" type="text" value={year || ''}
                                                onChange={e => {
                                                    const inputYear = e.target.value;
                                                    const parsedYear = parseInt(inputYear, 10)
                                                    setYear(parsedYear);  // Set year as string
                                                    if (!isNaN(parseInt(inputYear, 10)) && parseInt(inputYear, 10) >= 2000 && parseInt(inputYear, 10) <= 2050) {
                                                        setError('');
                                                    } else {
                                                        setError('Please input a valid year');
                                                    }
                                                }} />
                                        </div>
                                    )}

                                    {/* Personal Information */}
                                    {currentStep === 0 && (
                                        <div className="flex flex-col">
                                            <Fieldset legend="Full name" legendStyle="large">
                                                <Label htmlFor="first-name">First Name</Label>
                                                <TextInput id="first-name" name="first-name" type="text" value={formData.personalInfo.firstName || ''}
                                                    onChange={e => handleInputChange('personalInfo', 'firstName', e.target.value)} />
                                                <Label htmlFor="last-name">Last Name</Label>
                                                <TextInput id="last-name" name="last-name" type="text" value={formData.personalInfo.lastName || ''}
                                                    onChange={e => handleInputChange('personalInfo', 'lastName', e.target.value)} />
                                            </Fieldset>

                                            <Fieldset legend="Mailing address" legendStyle="large">
                                                <p>
                                                    Required fields are marked with an asterisk (<RequiredMarker />
                                                    ).
                                                </p>
                                                <Label htmlFor="mailing-address-1">Street address</Label>
                                                <TextInput id="mailing-address-1" name="mailing-address-1" type="text" value={addressComponent.streetAddress}
                                                    onChange={e => handleAddressChange('streetAddress', e.target.value)} />

                                                <Label htmlFor="mailing-address-2">Street address line 2</Label>
                                                <TextInput id="mailing-address-2" name="mailing-address-2" type="text" />

                                                <Label htmlFor="city" requiredMarker>
                                                    City
                                                </Label>
                                                <TextInput id="city" name="city" type="text" required value={addressComponent.city}
                                                    onChange={e => handleAddressChange('city', e.target.value)} />

                                                <Label htmlFor="state" requiredMarker>
                                                    State, territory, or military post
                                                </Label>
                                                <Select id="state" name="state" required onChange={e => handleAddressChange('state', e.target.value)}>
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
                                                <TextInput id="zip" name="zip" type="text" inputSize="medium" pattern="[\d]{5}(-[\d]{4})?" onChange={e => handleAddressChange('zip', e.target.value)} />

                                            </Fieldset>
                                            <Fieldset legend="Additional Information" legendStyle="large">
                                                <Label htmlFor="phone-number">Phone Number</Label>
                                                <TextInput id="phone-number" name="phone-number" type="text" value={formData.personalInfo.phoneNumber || ''}
                                                    onChange={e => handleInputChange('personalInfo', 'phoneNumber', e.target.value)} />

                                                <Label htmlFor="ssn">Social Security Number</Label>
                                                <TextInput id="ssn" name="ssn" className="margin-bottom-4" type="text" value={formData.personalInfo.ssn || ''}
                                                    onChange={e => handleInputChange('personalInfo', 'ssn', e.target.value)} />
                                            </Fieldset>
                                        </div>
                                    )}

                                    {/* W2 Information */}
                                    {currentStep === 1 && (
                                        <div>
                                            <h1 className="text-bold text-3xl">W2 Information</h1>
                                            {formData.w2Info.map((w2, index) => (
                                                <div className="flex flex-col" key={index}>
                                                    <h2 className="text-2xl margin-top-4">W2 Form {index + 1}</h2>
                                                    <Label htmlFor={`employer-name-${index}`}>Employer Name</Label>
                                                    <TextInput id={`employer-name-${index}`} name={`employer-name-${index}`} type="text" value={w2.employerName || ''}
                                                        onChange={e => handleW2Change(index, 'employerName', e.target.value)} />

                                                    <Label htmlFor={`wages-${index}`}>Wages</Label>
                                                    <TextInput id={`wages-${index}`} name={`wages-${index}`} type="text" value={w2.wages || ''}
                                                        onChange={e => handleW2Change(index, 'wages', parseFloat(e.target.value))} />

                                                    <Label htmlFor={`federal-tax-withheld-${index}`}>Federal Tax Withheld</Label>
                                                    <TextInput id={`federal-tax-withheld-${index}`} name={`federal-tax-withheld-${index}`} type="text" value={w2.federalTaxWithheld || ''}
                                                        onChange={e => handleW2Change(index, 'federalTaxWithheld', parseFloat(e.target.value))} />

                                                    <Label htmlFor={`social-security-wages-${index}`}>Social Security Wages</Label>
                                                    <TextInput id={`social-security-wages-${index}`} name={`social-security-wages-${index}`} type="text" value={w2.socialSecurityWages || ''}
                                                        onChange={e => handleW2Change(index, 'socialSecurityWages', parseFloat(e.target.value))} />

                                                    <Label htmlFor={`medicare-wages-${index}`}>Medicare Wages</Label>
                                                    <TextInput id={`medicare-wages-${index}`} name={`medicare-wages-${index}`} type="text" value={w2.medicareWages || ''}
                                                        onChange={e => handleW2Change(index, 'medicareWages', parseFloat(e.target.value))} />

                                                    <ButtonGroup>
                                                        <Button type="button" secondary className="mt-2" onClick={() => removeW2(index)}>Remove W2</Button>
                                                    </ButtonGroup>
                                                </div>
                                            ))}
                                            <Button type="button" className="margin-top-2" onClick={addW2}>Add W2</Button>
                                        </div>
                                    )}

                                    {/* Deductions */}
                                    {currentStep === 2 && (
                                        <div>
                                            <Fieldset legend="Deductions" legendStyle="large">
                                                <table className="usa-table usa-table--borderless width-full">
                                                    <thead>
                                                        <tr>
                                                            <th>Deduction Name</th>
                                                            <th>Amount Spent</th>
                                                            <th>Actions</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {userDeductions.map((userDeduction, index) => (
                                                            <tr key={index}>
                                                                <td>{deductions.find(d => d.id === userDeduction.deductionId)?.name}</td>
                                                                <td>
                                                                    <TextInput
                                                                        name={`deductionAmount-${index}`}
                                                                        id={`deductionAmount-${index}`}
                                                                        type="number"
                                                                        value={userDeduction.amountSpent}
                                                                        onChange={e => handleEditUserDeduction(index, parseFloat(e.target.value))}
                                                                    />
                                                                </td>
                                                                <td>
                                                                    <Button type="button" onClick={() => handleRemoveUserDeduction(index)} outline>
                                                                        Remove
                                                                    </Button>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                                <div className="margin-top-2">
                                                    <Select id="deduction-select" name="deduction-select" onChange={e => handleAddUserDeduction(parseInt(e.target.value))}>
                                                        <option value="">Add Deduction</option>
                                                        {deductions.map((deduction, index) => (
                                                            <option key={index} value={deduction.id}>{deduction.name}</option>
                                                        ))}
                                                    </Select>
                                                </div>
                                            </Fieldset>
                                        </div>
                                    )}

                                    {/* Tax Credits */}
                                    {currentStep === 3 && (
                                        <div>
                                            <Fieldset legend="Tax Credits" legendStyle="large">
                                                {credits.map((credit, index) => (
                                                    <div key={index}>
                                                        <Label htmlFor="creditTypeName">{credit?.name}</Label>
                                                        <div className="flex items-center">
                                                            <Button type="button" className="margin-top-1" onClick={() => handleDecrement(index)}>-</Button>
                                                            <TextInput id="creditCount" name="creditCount" readOnly={true} type="number" value={(credit as Countable).count} />
                                                            <Button type="button" className="margin-top-1 margin-left-1" onClick={() => handleIncrement(index)}>+</Button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </Fieldset>
                                        </div>
                                    )}

                                    {/* Review and Submit */}
                                    {currentStep === 4 && (
                                        <div>
                                            <h1 className="text-bold text-3xl">Review and Submit</h1>
                                            <div className="review-section">
                                                <h2 className="text-2xl py-2">Personal Information</h2>
                                                {formData.personalInfo.firstName || formData.personalInfo.lastName || formData.personalInfo.ssn || formData.personalInfo.phoneNumber || formData.personalInfo.addressComponent.streetAddress ? (
                                                    <>
                                                        <p><strong>Full Name:</strong> {formData.personalInfo.firstName} {formData.personalInfo.lastName}</p>
                                                        <p><strong>SSN:</strong> {formData.personalInfo.ssn}</p>
                                                        <p><strong>Address:</strong> {formData.personalInfo.addressComponent.streetAddress}, {formData.personalInfo.addressComponent.city}, {formData.personalInfo.addressComponent.state} {formData.personalInfo.addressComponent.zip}</p>
                                                        <p><strong>Phone Number:</strong> {formData.personalInfo.phoneNumber}</p>
                                                    </>
                                                ) : (
                                                    <p>No personal information provided.</p>
                                                )}

                                                <h2 className="text-2xl py-2">W2 Information</h2>
                                                {formData.w2Info.length > 0 ? (
                                                    formData.w2Info.map((w2, index) => (
                                                        <div key={index}>
                                                            <p><strong>Employer Name {index + 1}:</strong> {w2.employerName}</p>
                                                            <p><strong>Wages:</strong> {w2.wages}</p>
                                                            <p><strong>Federal Tax Withheld:</strong> {w2.federalTaxWithheld}</p>
                                                            <p><strong>Social Security Wages:</strong> {w2.socialSecurityWages}</p>
                                                            <p><strong>Medicare Wages:</strong> {w2.medicareWages}</p>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <p>No W2 information provided.</p>
                                                )}

                                                <h2 className="text-2xl py-2">Deductions</h2>
                                                {userDeductions.length > 0 ? (
                                                    userDeductions.map((userDeduction, index) => {
                                                        const deductionName = deductions.find(d => d.id === userDeduction.deductionId)?.name || "Unknown Deduction";
                                                        return (
                                                            <p key={index}><strong>{deductionName}:</strong> {userDeduction.amountSpent}</p>
                                                        );
                                                    })
                                                ) : (
                                                    <p>No deductions have been added.</p>
                                                )}

                                                <h2 className="text-2xl py-2">Tax Credits</h2>
                                                {credits.some(credit => credit.count > 0) ? (
                                                    credits.map((credit, index) => (
                                                        <p key={index}><strong>{credit.name}:</strong> {credit.count}</p>
                                                    ))
                                                ) : (
                                                    <p>No tax credits have been claimed.</p>
                                                )}
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
                        </Grid>
                    </Grid>
                </GridContainer>
            </main>
        </>
    )
}

