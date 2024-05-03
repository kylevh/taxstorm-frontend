import React from 'react';
import { Button, Grid, GridContainer, Link, Card, CardHeader, CardBody, CardGroup } from "@trussworks/react-uswds";
import { FaDollarSign } from 'react-icons/fa';

export default function Results() {


    return (
        <GridContainer className="usa-section">
            <h1>Your 2024 Tax Results</h1>
            <CardGroup  >
                <Card>
                    <CardHeader>
                        <h2 className="text-bold text-xl">Summary</h2>
                    </CardHeader>
                    <CardBody>
                        <Grid row gap>
                            <Grid col={12} >
                                <p className="flex items-center pb-2"><FaDollarSign /> Total Income:{' '}<strong>$50,000</strong></p>
                                <p className="flex items-center pb-2"><FaDollarSign /> Total Deductions: <strong>$5,000</strong></p>
                                <p className="flex items-center pb-2"><FaDollarSign /> Taxable Income: <strong>$45,000</strong></p>
                                <p className="flex items-center text-success"><FaDollarSign /> Total Tax Owed: <strong>$6,750</strong></p>
                            </Grid>
                        </Grid>
                    </CardBody>
                </Card>
            </CardGroup>

            <Link href='/submissions'><Button type="button">View All Submissions</Button></Link>
        </GridContainer>
    );
}