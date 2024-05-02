import { useState } from "react";
import {
    GovBanner,
  Link,
  NavMenuButton,
  PrimaryNav,
  Title,
  Header as USWDSHeader,
} from "@trussworks/react-uswds";

const primaryLinks = [
  {
    name: "Sign In",
    href: "/login",
  },
  {
    name: "Get Started",
    href: "/profiles/create",
  },
] as const;

function Navbar() {
  const [isMobileNavExpanded, setIsMobileNavExpanded] = useState(false);
  const handleMobileNavToggle = () => {
    setIsMobileNavExpanded(!isMobileNavExpanded);
  };
  const navItems = primaryLinks.map((link) => (
    <a href={link.href} key={link.href}>
      {link.name}
    </a>
  ));

  return (
    <>
      <GovBanner />

      <div
        className={`usa-overlay ${isMobileNavExpanded ? "is-visible" : ""}`}
      />
      <USWDSHeader basic={true}>
        <div className="usa-nav-container">
          <div className="usa-navbar">
            <Title className="desktop:margin-top-2">
              <div className="display-flex flex-align-center">
                <span className="margin-right-1">
                  <Link href="/">
                    <img
                      className="width-5 desktop:width-15 desktop:height-10 text-bottom margin-right-05"
                      src={`/images/logos/TaxStorm.svg`}
                      alt="Site logo"
                    />
                  </Link>
                </span>
              </div>
            </Title>
            <NavMenuButton onClick={handleMobileNavToggle} label={"Menu"} />
          </div>
          <PrimaryNav
            items={navItems}
            mobileExpanded={isMobileNavExpanded}
            onToggleMobileNav={handleMobileNavToggle}
          ></PrimaryNav>
        </div>
      </USWDSHeader>
    </>
  );
}

export default Navbar;
