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
                    <Link href='submissions/create'><Button type="button" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 mt-6 px-4 rounded">
                        Create New Submission
                    </Button></Link>

                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {submissions.map(submission => (
                        <div key={submission.id} className="border border-gray-100 p-4 rounded-lg shadow">
                            <h2 className="text-xl font-semibold">Year: {submission.year}</h2>
                            <p>Status: <span className={`font-semibold ${submission.status === 'Completed' ? 'text-green-500' : 'text-yellow-500'}`}>{submission.status}</span></p>
                            <p>Amount Owed: {submission.amountOwed}</p>
                            <p>Income: {submission.income}</p>
                            <Link href={`/submissions/result`}>
                                <Button type="button" className="mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                    View Details
                                </Button>
                            </Link>

                        </div>
                    ))}
                </div>
            </main>
        </>
    )
}

