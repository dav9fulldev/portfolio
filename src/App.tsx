import { MotionConfig } from "motion/react";
import { LanguageProvider, useI18n } from "./i18n/LanguageContext";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Projects } from "./components/Projects";
import { Expertise } from "./components/Expertise";
import { Technologies } from "./components/Technologies";
import { Journey } from "./components/Journey";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

function NotFound() {
  const { t } = useI18n();
  return (
    <main className="container-page grid min-h-dvh place-content-center text-center">
      <p className="eyebrow">404</p>
      <h1 className="display mt-4 text-6xl text-paper">{t.notFound.title}</h1>
      <p className="mt-4 text-mute">{t.notFound.body}</p>
      <a href={import.meta.env.BASE_URL} className="btn btn-primary mx-auto mt-8">
        {t.notFound.back}
      </a>
    </main>
  );
}

function isHome() {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  const path = window.location.pathname.replace(/\/index\.html$/, "").replace(/\/$/, "");
  return path === base;
}

export default function App() {
  return (
    <LanguageProvider>
      <MotionConfig reducedMotion="user">
        {isHome() ? (
          <>
            <Header />
            <main id="main">
              <Hero />
              <About />
              <Projects />
              <Expertise />
              <Technologies />
              <Journey />
              <Contact />
            </main>
            <Footer />
          </>
        ) : (
          <NotFound />
        )}
      </MotionConfig>
    </LanguageProvider>
  );
}
