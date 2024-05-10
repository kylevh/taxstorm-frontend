import { Button, Header, Link, Title } from "@trussworks/react-uswds";
import { useState, useEffect } from 'react';
import { useAppSelector } from '../store/hooks';
import { TaxForm } from '../features/user';
import axios from 'axios';

export default function SubmissionsView() {
    const [taxForms, setTaxForms] = useState<TaxForm[]>([]);
    const userId = useAppSelector((state: any) => state.user.userData.id); // Use the selector
    const token = useAppSelector((state: any) => state.user.token);
    useEffect(() => {
        const fetchTaxForms = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/taxstorm/taxforms?userId=${userId}`, {
                    headers: {
                        Authorization: `Basic ${token}`
                    }
                });
                setTaxForms(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Failed to fetch tax forms', error);
            }
        };

        fetchTaxForms();
    }, [userId]); // Dependency array to refetch when userId changes



    return (
        <>
            <Header extended>
                <div className="usa-navbar">
                    <Title id="extended-logo">
                        <a href="/" title="Home" aria-label="Home">
                            Tax Forms
                        </a>
                    </Title>
                </div>
            </Header>

            <main id="main-content" className="container mx-auto px-4">
                <div className="text-center mb-4">
                    <Link href='submissions/create'><Button type="button" size="big" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-6 my-6 mt-10 px-4 rounded">
                        Create New Tax Form
                    </Button></Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {taxForms.map(form => (
                        <div key={form.year} className="bg-white border border-green-200 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                            <h2 className="text-3xl font-semibold mb-2">{form.year} Tax Form Results</h2>
                            <p className="text-xl">Total Wages: ${form.totalWages.toFixed(2)}</p>
                            <p className="text-xl">Federal Taxes: ${form.totalFederalTaxesWithheld.toFixed(2)}</p>
                            <p className="text-xl">Social Security Taxes: ${form.totalSocialSecurityTaxesWithheld.toFixed(2)}</p>
                            <p className="text-xl">Medicare Taxes: ${form.totalMedicareTaxesWithheld.toFixed(2)}</p>
                            <p className="text-xl">Credits: ${form.credits.toFixed(2)}</p>
                            <p className="text-xl">Deductions: ${form.deductions.toFixed(2)}</p>
                            <p className="text-xl">Refund: ${form.refund.toFixed(2)}</p>
                            <Link href={`/submissions/result/${form.year}`}>
                                <Button type="button" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold mt-4 py-2 px-4 rounded">
                                    View Results
                                </Button>
                            </Link>
                        </div>
                    ))}
                </div>
            </main>
        </>
    )
}

