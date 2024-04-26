import { useState } from "react";
import {
    NavMenuButton,
    PrimaryNav,
    Title,
    Header as USWDSHeader,
} from "@trussworks/react-uswds";

const primaryLinks = [
    {
        name: "Home",
        href: "/",
    },
    {
        name: "Profile",
        href: "/profiles",
    },
    {
        name: "Login",
        href: "/profiles/create",
    },    {
        name: "Create Submission",
        href: "/submissions/create",
    },
] as const;

function Navbar() {
    const [isMobileNavExpanded, setIsMobileNavExpanded] = useState(false);
    const handleMobileNavToggle = () => {
        setIsMobileNavExpanded(!isMobileNavExpanded);
    };
    const navItems = primaryLinks.map((link) => (
        <a href={link.href} key={link.href}>
            {(link.name)}
        </a>
    ));

    return (
        <>
            <div
                className={`usa-overlay ${isMobileNavExpanded ? "is-visible" : ""}`}
            />
            <USWDSHeader basic={true}>
                <div className="usa-nav-container">
                    <div className="usa-navbar">
                        <Title className="desktop:margin-top-2">
                            <div className="display-flex flex-align-center">
                                <span className="margin-right-1">
                                    <img
                                        className="width-3 desktop:width-5 text-bottom margin-right-05"
                                        src={`/images/logos/logo.svg`}
                                        alt="Site logo"
                                    />
                                </span>
                                <span className="font-sans-lg flex-fill">{("Menu")}</span>
                            </div>
                        </Title>
                        <NavMenuButton
                            onClick={handleMobileNavToggle}
                            label={("Menu")}
                        />
                    </div>
                    <PrimaryNav
                        items={navItems}
                        mobileExpanded={isMobileNavExpanded}
                        onToggleMobileNav={handleMobileNavToggle}
                    ></PrimaryNav>
                </div>
            </USWDSHeader>
        </>
    )
}

export default Navbar;
