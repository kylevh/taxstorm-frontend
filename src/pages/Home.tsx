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
import circleImg from "/images/logos/circleImg.png";
import logo from "/images/logos/TaxStorm.svg";

function Home() {
  const returnToTop = (
    <GridContainer className="usa-footer__return-to-top">
      <a href="#">Return to top</a>
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
      links={Array(5).fill(
        <a href="javascript:void(0)" className="usa-footer__primary-link">
          Primary link
        </a>
      )}
    />
  );
  const footerSecondary = (
    <>
      <Grid row gap>
        <Logo
          size="medium"
          image={<img className="usa-footer__logo-img width:15" src={logo} alt="" />}
        />
        <Grid
          className="usa-footer__contact-links"
          mobileLg={{
            col: 6,
          }}
        >
          <SocialLinks links={socialLinkItems} />
          <h3 className="usa-footer__contact-heading">Agency Contact Center</h3>
          <Address
            size="medium"
            items={[
              <a key="telephone" href="tel:1-800-555-5555">
                (800) CALL-GOVT
              </a>,
              <a key="email" href="mailto:info@agency.gov">
                info@agency.gov
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
        <section className="usa-hero" aria-label="Introduction">
          <GridContainer>
            <div className="usa-hero__callout">
              <h1 className="usa-hero__heading">
                <span className="usa-hero__heading--alt">Hero callout:</span>
                Bring attention to a project priority
              </h1>
              <p>
                Support the callout with some short explanatory text. You don’t
                need more than a couple of sentences.
              </p>
              <a className="usa-button" href="javascript:void(0)">
                Call to action
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
                A tagline highlights your approach
              </h2>
            </Grid>
            <Grid
              tablet={{
                col: 8,
              }}
              className="usa-prose"
            >
              <p>
                The tagline should inspire confidence and interest, focusing on
                the value that your overall approach offers to your audience.
                Use a heading typeface and keep your tagline to just a few
                words, and don’t confuse or mystify.
              </p>
              <p>
                Use the right side of the grid to explain the tagline a bit
                more. What are your goals? How do you do your work? Write in the
                present tense, and stay brief here. People who are interested
                can find details on internal pages.
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
                  src={circleImg}
                  alt="Alt text"
                />
                <MediaBlockBody>
                  <h2 className="usa-graphic-list__heading">
                    Graphic headings can vary.
                  </h2>
                  <p>
                    Graphic headings can be used a few different ways, depending
                    on what your landing page is for. Highlight your values,
                    specific program areas, or results.
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
                  src={circleImg}
                  alt="Alt text"
                />
                <MediaBlockBody>
                  <h2 className="usa-graphic-list__heading">
                    Stick to 6 or fewer words.
                  </h2>
                  <p>
                    Keep body text to about 30 words. They can be shorter, but
                    try to be somewhat balanced across all four. It creates a
                    clean appearance with good spacing.
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
                  src={circleImg}
                  alt="Alt text"
                />
                <MediaBlockBody>
                  <h2 className="usa-graphic-list__heading">
                    Never highlight anything without a goal.
                  </h2>
                  <p>
                    For anything you want to highlight here, understand what
                    your users know now, and what activity or impression you
                    want from them after they see it.
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
                  src={circleImg}
                  alt="Alt text"
                />
                <MediaBlockBody>
                  <h2 className="usa-graphic-list__heading">
                    Could also have 2 or 6.
                  </h2>
                  <p>
                    In addition to your goal, find out your users’ goals. What
                    do they want to know or do that supports your mission? Use
                    these headings to show these.
                  </p>
                </MediaBlockBody>
              </Grid>
            </Grid>
          </GridContainer>
        </section>

        <section id="test-section-id" className="usa-section">
          <GridContainer>
            <h2 className="font-heading-xl margin-y-0">Section heading</h2>
            <p className="usa-intro">
              Everything up to this point should help people understand your
              agency or project: who you are, your goal or mission, and how you
              approach it. Use this section to encourage them to act. Describe
              why they should get in touch here, and use an active verb on the
              button below. “Get in touch,” “Learn more,” and so on.
            </p>
            <a href="#" className="usa-button usa-button--big">
              Call to action
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
