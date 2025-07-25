import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import Hero from '../components/Homepage/Hero';
import GuidesExamples from '../components/Homepage/GuidesExamples';
import RestApiReference from '../components/Homepage/RestApiReference';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
                to="/docs/">
                    Get Started Building
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout>
          <Head>
              {/* Preload styles for Stoplight Elements */}
              <link rel="preload" href="/assets/css/elements.min.css" as="style" />
          </Head>
          <Hero />
          <GuidesExamples />
          <RestApiReference />

      <main>

      </main>
    </Layout>
  );
}
