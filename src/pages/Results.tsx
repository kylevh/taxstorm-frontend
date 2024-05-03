import React from 'react';
import { Button, Grid, GridContainer, Link, Card, CardHeader, CardBody, CardGroup, CardFooter } from "@trussworks/react-uswds";
import { FaDollarSign } from 'react-icons/fa';

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
                                <p className="flex items-center text-success text-2xl text-bold "> Total Tax Owed: <strong>$6,750</strong></p>
                            </Grid>
                        </Grid>
                    </CardBody>
                    <CardFooter>
                        <Link href={'/submissions'}  allowSpacebarActivation className="usa-button ">
                            View All Submissions
                        </Link>
                    </CardFooter>
                </Card>
            </CardGroup>

        </GridContainer >
    );
}