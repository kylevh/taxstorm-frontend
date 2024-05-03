import { Button, Fieldset, Footer, Form, Grid, GridContainer, Header, Label, Link, TextInput, Title } from "@trussworks/react-uswds";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {  useDispatch } from 'react-redux'
import { login } from '../features/user'

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(login())
        setTimeout(() => {
            navigate('/submissions'); // Navigate after a delay
          }, 1000); // Delay in milliseconds
    }

    return (
        <>
            <a className="usa-skipnav" href="#main-content">
                Skip to main content
            </a>



            <main id="main-content">
                <div className="bg-base-lightest">
                    <GridContainer className="usa-section">
                        <Grid row={true} className="flex-justify-center">
                            <Grid col={12} tablet={{
                                col: 8
                            }} desktop={{
                                col: 6
                            }}>
                                <div className="bg-white padding-y-3 padding-x-5 border border-base-lighter">
                                    <h1 className="margin-bottom-0">Sign in</h1>
                                    <Form onSubmit={submitForm}>
                                        <Fieldset legend="Access your account" legendStyle="large">
                                            <Label htmlFor="email">Email address</Label>
                                            <TextInput id="email" name="email" type="email" autoCorrect="off" autoCapitalize="off" required={true} />

                                            <Label htmlFor="password-sign-in">Password</Label>
                                            <TextInput id="password-sign-in" name="password" type={showPassword ? 'text' : 'password'} autoCorrect="off" autoCapitalize="off" required={true} />

                                            <button title="Show password" type="button" className="usa-show-password" aria-controls="password-sign-in" onClick={(): void => setShowPassword(showPassword => !showPassword)}>
                                                {showPassword ? 'Hide password' : 'Show password'}
                                            </button>

                                            <Button type="submit">Sign in</Button>


                                            <p className="padding-y-1">
                                                <Link href="javascript:void();">Forgot password?</Link>
                                            </p>
                                        </Fieldset>
                                    </Form>
                                </div>

                                <p className="text-center padding-top-2">
                                    {"Don't have an account? "}
                                    <Link href="javascript:void();">Create your account now</Link>
                                    .
                                </p>

                                <div className="border-top border-base-lighter margin-top-3 padding-top-1">
                                    <h2 className="text-bold text-lg pb-1">Are you a federal employee?</h2>
                                    <div className="usa-prose">
                                        <p>
                                            If you are a federal employee,
                                            please use SSO.
                                        </p>
                                        <p>
                                            <Button type="button" outline={true}>
                                                Launch secondary SSO
                                            </Button>
                                        </p>
                                    </div>
                                </div>
                            </Grid>
                        </Grid>
                    </GridContainer>
                </div>
            </main>


        </>
    );
}

