import { useState } from "react";
import {
  Button,
  GovBanner,
  LanguageSelector,
  Link,
  NavMenuButton,
  PrimaryNav,
  Title,
  Header as USWDSHeader,
} from "@trussworks/react-uswds";
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { logout } from '../features/user'
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const primaryLinks = [
  {
    name: "Sign In",
    href: "/login",
  }
] as const;

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch()
  const [isMobileNavExpanded, setIsMobileNavExpanded] = useState(false);
  const handleMobileNavToggle = () => {
    setIsMobileNavExpanded(!isMobileNavExpanded);
  };
  const { t, i18n } = useTranslation();
  const isLoggedIn = useAppSelector((state) => state.loggedIn.loggedIn); // Use the selector

  const handleLanguageChange = (languageCode: any) => {
    console.log("CHANGED LANGUAGE");
    i18n.changeLanguage(languageCode);
  };

  const handleLogout = () => {
    navigate('/');
    dispatch(logout());
  };

  const navItems = isLoggedIn ? [
    <>
      <div>
        <Link href="/submissions">
          <Button type="button">{t('Submissions')}</Button>
        </Link>
        <Link href="/profiles/view">
          <Button type="button">{t('View Profile')}</Button>
        </Link>
        <Button onClick={handleLogout} type="button">{t('Log out')}</Button>
      </div>
    </>
  ] : (
    primaryLinks.map((link) => (
      <a href={link.href} key={link.href}>
        {t(link.name)}
      </a>
    ))
  );

  return (
    <>
      <GovBanner />

      <div
        className={`usa-overlay ${isMobileNavExpanded ? "is-visible" : ""}`}
      />
      <USWDSHeader basic={true}>
        <div className="usa-nav-container desktop:margin-bottom-1">
          <div className="usa-navbar">
            <Title className="desktop:margin-top-2 ">
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
          >
            {isLoggedIn ? null : <Link href="/profiles/create"><Button className="margin-left-1" accentStyle="warm" type="button">{t('Get Started')}</Button></Link>}
            <LanguageSelector
              onClick={handleLanguageChange}
              langs={[
                {
                  attr: 'en',
                  label: 'English',
                  on_click: function Ga() { }
                },
                {
                  attr: 'es',
                  label: 'Español',
                  label_local: 'Spanish',
                  on_click: function Ga() { }
                },

              ]}
            />
          </PrimaryNav>

        </div>

      </USWDSHeader>
    </>
  );
}

export default Navbar;
