import {
  Address,
  Footer,
  FooterNav,
  Grid,
  GridContainer,
  Logo,
  MediaBlockBody,
  SocialLink,
  SocialLinks,
} from "@trussworks/react-uswds";
import img1 from "/images/icons/group1.png";
import img2 from "/images/icons/group2.png";
import img3 from "/images/icons/group3.png";
import img4 from "/images/icons/group4.png";
import logo from "/images/logos/TaxStorm.svg";
import { useTranslation } from "react-i18next";


function Home() {
  const { t } = useTranslation();

  const returnToTop = (
    <GridContainer className="usa-footer__return-to-top">
      <a href="#">{t('Return to top')}</a>
    </GridContainer>
  );
  const socialLinkItems = [
    <SocialLink key="facebook" name="Facebook" href="#" />,
    <SocialLink key="twitter" name="Twitter" href="#" />,
    <SocialLink key="youtube" name="YouTube" href="#" />,
    <SocialLink key="instagram" name="Instagram" href="#" />,
    <SocialLink key="rss" name="RSS" href="#" />,
  ];
  const footerPrimary = (
    <FooterNav
      aria-label="Footer navigation"
      size="medium"
      links={[
        <a href="javascript:void(0)" className="usa-footer__primary-link">
          {t('Home')}
        </a>,
        <a href="javascript:void(0)" className="usa-footer__primary-link">
          {t('Dashboard')}
        </a>,
        <a href="javascript:void(0)" className="usa-footer__primary-link">
          {t('Taxes')}
        </a>,
        <a href="javascript:void(0)" className="usa-footer__primary-link">
          {t('Settings')}
        </a>,
      ]}
    />
  );

  const footerSecondary = (
    <>
      <Grid row gap>
        <Logo
          size="medium"
          image={<img className="usa-footer__logo-img" style={{ width: '15%' }} src={logo} alt="TaxStorm Logo" />}
        />
        <Grid
          className="usa-footer__contact-links"
          mobileLg={{
            col: 6,
          }}
        >
          <SocialLinks links={socialLinkItems} />
          <h3 className="usa-footer__contact-heading">TaxStorm {t('Help Center')}</h3>
          <Address
            size="medium"
            items={[
              <a key="telephone" href="tel:1-800-555-5555">
                (800) CALL-TAX
              </a>,
              <a key="email" href="mailto:support@taxstorm.com">
                support@taxstorm.com
              </a>,
            ]}
          />
        </Grid>
      </Grid>
    </>
  );

  return (
    <>
      <main id="main-content">
        <section className="usa-hero " style={{ backgroundImage: 'url("/images/taxes.jpg")' }} aria-label="Introduction">
          <GridContainer>
            <div className="usa-hero__callout">
              <h1 className="usa-hero__heading">
                <span className="usa-hero__heading--alt">TaxStorm</span>
                {t('Do your taxes with ease')}
              </h1>
              <p>
                {t('Hero paragraph')}
              </p>
              <a className="usa-button margin-top-2" href="javascript:void(0)">
                {t('Start Your Stress-Free Tax Journey Now!')}
              </a>
            </div>
          </GridContainer>
        </section>

        <section className="grid-container usa-section">
          <Grid row gap>
            <Grid
              tablet={{
                col: 4,
              }}
            >
              <h2 className="font-heading-xl margin-top-0 tablet:margin-bottom-0">
                {t('Doing your taxes have never been easier')}
              </h2>
            </Grid>
            <Grid
              tablet={{
                col: 8,
              }}
              className="usa-prose"
            >
              <p>
                {t('Our advanced tools guide you through every step of the tax filing process, ensuring you maximize your deductions and credits. Begin your hassle-free tax journey with us today!')}
              </p>
              <p>
                {t('Create an account or contact us at (800) CALL-TAX to get started.')}
              </p>
            </Grid>
          </Grid>
        </section>

        <section className="usa-graphic-list usa-section usa-section--dark">
          <GridContainer>
            <Grid row gap className="usa-graphic-list__row">
              <Grid
                tablet={{
                  col: true,
                }}
                className="usa-media-block"
              >
                <img
                  className="usa-media-block__img"
                  src={img1}
                  alt="Alt text"
                />
                <MediaBlockBody>
                  <h2 className="usa-graphic-list__heading">
                    {t('Efficient Tax Filing')}
                  </h2>
                  <p>
                    {t('Utilize')}
                  </p>
                </MediaBlockBody>
              </Grid>
              <Grid
                tablet={{
                  col: true,
                }}
                className="usa-media-block"
              >
                <img
                  className="usa-media-block__img"
                  src={img2}
                  alt="Alt text"
                />
                <MediaBlockBody>
                  <h2 className="usa-graphic-list__heading">
                    {t('Maximize')}
                  </h2>
                  <p>
                    {t('Ensure')}
                  </p>
                </MediaBlockBody>
              </Grid>
            </Grid>
            <Grid row gap className="usa-graphic-list__row">
              <Grid
                tablet={{
                  col: true,
                }}
                className="usa-media-block"
              >
                <img
                  className="usa-media-block__img"
                  src={img3}
                  alt="Alt text"
                />
                <MediaBlockBody>
                  <h2 className="usa-graphic-list__heading">
                    {t('24/7 Support')}
                  </h2>
                  <p>
                    {t('Our tax experts are available around the clock to help you with any questions or issues.')}
                  </p>
                </MediaBlockBody>
              </Grid>
              <Grid
                tablet={{
                  col: true,
                }}
                className="usa-media-block"
              >
                <img
                  className="usa-media-block__img"
                  src={img4}
                  alt="Alt text"
                />
                <MediaBlockBody>
                  <h2 className="usa-graphic-list__heading">
                    {t('Secure and Private')}
                  </h2>
                  <p>
                    {t('Your data is protected with top-notch security measures, ensuring your privacy.')}
                  </p>
                </MediaBlockBody>
              </Grid>
            </Grid>
          </GridContainer>
        </section>

        <section id="test-section-id" className="usa-section">
          <GridContainer>
            <h2 className="font-heading-xl margin-y-0 text-bold text-xl pb-4">{t('Ready to File Your Taxes?')}</h2>
            <p className="usa-intro pb-4">
            {t('Join thousands of satisfied customers who have experienced the ease and security of filing their taxes with TaxStorm. Get started today and feel the difference.')}
            </p>
            <a href="#" className="usa-button usa-button--big">
            {t('File with TaxStorm Now')}
            </a>
          </GridContainer>
        </section>

        <Footer
          returnToTop={returnToTop}
          primary={footerPrimary}
          secondary={footerSecondary}
        />
      </main>
    </>
  );
}

export default Home;
