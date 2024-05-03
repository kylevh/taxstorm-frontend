import { Button, Header, Link, Title } from "@trussworks/react-uswds";

export default function SubmissionsView() {
    const submissions = [
        { id: 1, year: 2024, status: 'Pending', amountOwed: '$150', income: '$75,324' },
        { id: 2, year: 2023, status: 'Completed', amountOwed: '$435', income: '$54,326' },
        { id: 3, year: 2022, status: 'Completed', amountOwed: '$745', income: '$57,945' },
        { id: 4, year: 2021, status: 'Completed', amountOwed: '$789', income: '$67,443' },
        { id: 5, year: 2020, status: 'Completed', amountOwed: '$453', income: '$31,922' },
        { id: 6, year: 2019, status: 'Completed', amountOwed: '$664', income: '$10,455' },
        { id: 7, year: 2018, status: 'Completed', amountOwed: '$454', income: '$6,455' },
    ];

    return (
        <>
            <Header extended>
                <div className="usa-navbar">
                    <Title id="extended-logo">
                        <a href="/" title="Home" aria-label="Home">
                            Submissions
                        </a>
                    </Title>
                </div>
            </Header>

            <main id="main-content" className="container mx-auto px-4">
                <div className="text-center mb-4">
                    <Link href='submissions/create'><Button type="button" size="big" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-6 my-6 mt-10 px-4 rounded">
                        Create New Submission
                    </Button></Link>

                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {submissions.map(submission => (
                        <div key={submission.id} className="bg-white border border-green-200 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                            <h2 className="text-3xl font-semibold mb-2">{submission.year} Tax Results</h2>
                            <p className=" text-xl">Status: <span className={`font-semibold ${submission.status === 'Completed' ? 'text-green-500' : 'text-yellow-500'}`}>{submission.status}</span></p>
                            <Link href={`/submissions/result`}>
                                <Button type="button" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold mt-4  py-2 px-4 rounded">
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

