import { Grid, GridContainer, Link, Card, CardHeader, CardBody, CardGroup, CardFooter } from "@trussworks/react-uswds";

export default function Results() {
    return (
        <GridContainer>
            <h1>Your 2024 Tax Results</h1>
            <CardGroup >
                <Card headerFirst>
                    <CardHeader>
                        <h2 className="text-bold text-3xl">Summary</h2>
                    </CardHeader>
                    <CardBody>
                        <Grid row gap>
                            <Grid col={12} >
                                <p className="flex items-center text-2xl pb-2">Total Income:{' '}<strong>$50,000</strong></p>
                                <p className="flex items-center text-2xl pb-2">Total Deductions: <strong>$5,000</strong></p>
                                <p className="flex items-center text-2xl  pb-2"> Taxable Income: <strong>$45,000</strong></p>
                                <div className="justify-center items-center flex flex-col pt-4">
                                    <p className="flex items-center  text-2xl text-bold "> Total Tax Owed: </p>
                                    <strong className="text-2xl text-success">$6,750</strong>

                                </div>
                            </Grid>
                        </Grid>
                    </CardBody>
                    <CardFooter>
                        <Link href={'/submissions'} allowSpacebarActivation className="usa-button ">
                            View All Submissions
                        </Link>
                    </CardFooter>
                </Card>
            </CardGroup>

        </GridContainer >
    );
}