import "./About.css";
import useAboutAnimations from "./useAboutAnimations";

function About() {

  useAboutAnimations();

  return (
    <>
      <div className="intro-screen">
        <div className="intro-logo" id="introLogo">
          BHAVANA
        </div>
      </div>

      <div className="paper">

        <header>

          <div className="logo-container">
            <div className="logo">
              BHAVANA
            </div>
          </div>

          <nav>
            <a href="#">About</a>
            <a href="#">Services</a>
            <a href="#">Gallery</a>
            <a href="#">Resources</a>
            <a href="#">Shop</a>
            <a href="#">Contact</a>
          </nav>

        </header>

        <section className="split-wrapper">

          <div className="top-image"></div>

          <div className="about-section">

            <div className="about-container">

              <div className="about-content-wrapper">

                <h2 className="about-title">
                  ABOUT ME
                </h2>

                <div className="about-image-wrapper">
                  <img
                    src="/images/image2.jpg"
                    alt="About"
                    className="about-image"
                  />
                </div>

              </div>

              <div className="about-paragraphs">
                <p>
                  As a photographer and creative director,
                  I combine technical expertise with visual storytelling.
                </p>
              </div>

            </div>

          </div>

          <div
            className="bottom-section"
            id="bottomSection"
          >

            <div
              className="bottom-bg"
              id="bottomBg"
            ></div>

            <div className="parallax-text-layer">

              <div
                className="parallax-text"
                id="parallaxText"
              >
                <span>RESULT WORKS</span>
              </div>

            </div>

            <div className="overlay-image-wrapper">

              <img
                src="/images/overlay.png"
                alt=""
                className="overlay-image"
              />

            </div>

            <div className="photo-grid">

              <div className="photo-col">
                <div
                  className="photo-item photo-from-top"
                  id="ptop1"
                >
                  <img
                    src="/images/gallery1.jpg"
                    alt=""
                  />
                </div>
              </div>

              <div className="photo-col">
                <div
                  className="photo-item photo-from-bottom"
                  id="pbot1"
                >
                  <img
                    src="/images/gallery2.jpg"
                    alt=""
                  />
                </div>
              </div>

              <div className="photo-col">
                <div
                  className="photo-item photo-from-top"
                  id="ptop2"
                >
                  <img
                    src="/images/gallery3.jpg"
                    alt=""
                  />
                </div>
              </div>

              <div className="photo-col">
                <div
                  className="photo-item photo-from-bottom"
                  id="pbot2"
                >
                  <img
                    src="/images/gallery4.jpg"
                    alt=""
                  />
                </div>
              </div>

              <div className="photo-col">
                <div
                  className="photo-item photo-from-bottom"
                  id="pbot3"
                >
                  <img
                    src="/images/gallery5.jpg"
                    alt=""
                  />
                </div>
              </div>

            </div>

          </div>

        </section>

      </div>
    </>
  );
}

export default About;