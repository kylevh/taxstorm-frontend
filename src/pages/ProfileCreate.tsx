import { Button, Checkbox, Fieldset, Form, Grid, GridContainer, Header, Label, MediaBlockBody, TextInput, Title } from "@trussworks/react-uswds";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function ProfileCreate() {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <>
            <Header extended>
                <div className="usa-navbar">
                    <Title id="extended-logo">
                        <a href="/" title="Home" aria-label="Home">
                            Register Profile
                        </a>
                    </Title>
                </div>
            </Header>

            <main id="main-content">
                <div className="bg-base-lightest">
                    <GridContainer className="usa-section">
                        <Grid row className="margin-x-neg-205 flex-justify-center">
                            <Grid col={12} mobileLg={{
                                col: 10
                            }} tablet={{
                                col: 8
                            }} desktop={{
                                col: 6
                            }} className="padding-x-205 margin-bottom-4">
                                <h1 className="desktop:display-none font-sans-lg margin-bottom-4 tablet:margin-top-neg-3">
                                    A tagline that explains the benefit of creating an account.
                                </h1>

                                <div className="bg-white padding-y-3 padding-x-5 border border-base-lighter">
                                    <h1 className="margin-bottom-0">Create account</h1>
                                    <Form onSubmit={() => { }}>
                                        <Fieldset legend="Get started with an account.">
                                            <p>
                                                <abbr title="required" className="usa-hint usa-hint--required">
                                                    *
                                                </abbr>{' '}
                                                indicates a required field.
                                            </p>

                                            <Label htmlFor="email">
                                                Email address{' '}
                                                <abbr title="required" className="usa-label--required">
                                                    *
                                                </abbr>
                                            </Label>
                                            <TextInput id="email" name="email" type="email" autoCapitalize="off" autoCorrect="off" required={true} />

                                            <Label htmlFor="password-create-account">
                                                Create password{' '}
                                                <abbr title="required" className="usa-label--required">
                                                    *
                                                </abbr>
                                            </Label>
                                            <TextInput id="password-create-account" name="password" type={showPassword ? 'text' : 'password'} autoCapitalize="off" autoCorrect="off" required={true} />

                                            <button title="Show password" type="button" className="usa-show-password" aria-controls="password-create-account password-create-account-confirm" onClick={(): void => setShowPassword(showPassword => !showPassword)}>
                                                {showPassword ? 'Hide password' : 'Show password'}
                                            </button>

                                            <Label htmlFor="password-create-account-confirm">
                                                Re-type password{' '}
                                                <abbr title="required" className="usa-label--required">
                                                    *
                                                </abbr>
                                            </Label>
                                            <TextInput id="password-create-account-confirm" name="password-confirm" type={showPassword ? 'text' : 'password'} autoCapitalize="off" autoCorrect="off" required={true} />

                                            <Checkbox id="terms-and-conditions" name="terms-and-conditions" className="margin-y-3" required={true} label={'terms and conditions'} />

                                            <Button type="submit">Create account</Button>
                                        </Fieldset>
                                    </Form>
                                </div>

                                <p className="text-center">
                                    Already have an account?{' '}
                                    <Link to="javascript:void(0);">Sign in</Link>.
                                </p>
                            </Grid>

                            <Grid col={12} mobileLg={{
                                col: 10
                            }} tablet={{
                                col: 8
                            }} desktop={{
                                col: 6
                            }} className="padding-x-205">
                                <div className="border-top border-base-lighter padding-top-4 desktop:border-0 desktop:padding-top-0">
                                    <h2 className="display-none desktop:display-block text-bold text-xl">
                                        Create an account and start doing your taxes with ease!
                                    </h2>

                                    <div className="usa-prose">
                                        <p>
                                            We make it easy for you to do your taxes by 
                                            streamlining the flow of your taxes with an intuitive
                                            system to calculate what you owe.
                                        </p>
    
                                    </div>

                                    <div className="border-top border-base-lighter margin-top-3 padding-top-1">
                                        <h2 className="pt-2">Want to sign in?</h2>
                                        <div className="usa-prose pt-2">
                                            <p>
                                                <Button type="button" outline={true}>
                                                    Go to Sign In
                                                </Button>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Grid>
                        </Grid>
                    </GridContainer>
                </div>
            </main>
        </>
    )
}

