import React, { useEffect, useState } from 'react';
import type { ReactElement } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useAppSelector } from '../../stores/hooks';
import LayoutGuest from '../../layouts/Guest';
import WebSiteHeader from '../../components/WebPageComponents/Header';
import WebSiteFooter from '../../components/WebPageComponents/Footer';
import {
  HeroDesigns,
  AboutUsDesigns,
  FeaturesDesigns,
  ContactFormDesigns,
} from '../../components/WebPageComponents/designs';

import HeroSection from '../../components/WebPageComponents/HeroComponent';

import AboutUsSection from '../../components/WebPageComponents/AboutUsComponent';

import FeaturesSection from '../../components/WebPageComponents/FeaturesComponent';

import ContactFormSection from '../../components/WebPageComponents/ContactFormComponent';

export default function WebSite() {
  const cardsStyle = useAppSelector((state) => state.style.cardsStyle);
  const bgColor = useAppSelector((state) => state.style.bgLayoutColor);
  const projectName = 'Nutri-Tracker01';

  useEffect(() => {
    const darkElement = document.querySelector('body .dark');
    if (darkElement) {
      darkElement.classList.remove('dark');
    }
  }, []);
  const pages = [
    {
      href: '/home',
      label: 'home',
    },

    {
      href: '/about',
      label: 'about',
    },

    {
      href: '/services',
      label: 'services',
    },

    {
      href: '/contact',
      label: 'contact',
    },

    {
      href: '/faq',
      label: 'FAQ',
    },
  ];

  const features_points = [
    {
      name: 'Seamless QR Code Access',
      description:
        'Generate unique QR codes for each receipt, allowing customers to easily access their order details and nutritional information with a quick scan.',
      icon: 'mdiQrcodeScan',
    },
    {
      name: 'Comprehensive Nutritional Data',
      description:
        'Provide detailed nutritional breakdowns for menu items, helping customers make informed dietary choices and enhancing their dining experience.',
      icon: 'mdiNutrition',
    },
    {
      name: 'Efficient Order Management',
      description:
        'Streamline the order process with intuitive receipt generation and order tracking, ensuring smooth operations and satisfied customers.',
      icon: 'mdiOrderBoolAscending',
    },
  ];

  return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <title>{`About Nutri-Tracker - Our Mission and Vision`}</title>
        <meta
          name='description'
          content={`Learn more about Nutri-Tracker, our mission to enhance restaurant operations with personalized nutrition tracking and efficient order management solutions.`}
        />
      </Head>
      <WebSiteHeader projectName={'Nutri-Tracker01'} pages={pages} />
      <main className={`flex-grow  ${bgColor}    rounded-none  `}>
        <HeroSection
          projectName={'Nutri-Tracker01'}
          image={['Team brainstorming in office']}
          mainText={`Discover the Vision Behind ${projectName}`}
          subTitle={`At ${projectName}, we are committed to revolutionizing small restaurant operations with innovative nutrition tracking and seamless order management. Join us on our journey to enhance dining experiences.`}
          design={HeroDesigns.IMAGE_BG || ''}
          buttonText={`Our Story`}
        />

        <AboutUsSection
          projectName={'Nutri-Tracker01'}
          image={['Team members discussing ideas']}
          mainText={`The Heart and Soul of ${projectName}`}
          subTitle={`${projectName} is driven by a passion for innovation in the restaurant industry, focusing on personalized nutrition tracking and efficient order management to elevate customer experiences.`}
          design={AboutUsDesigns.IMAGE_LEFT || ''}
          buttonText={`Meet Our Team`}
        />

        <FeaturesSection
          projectName={'Nutri-Tracker01'}
          image={['Features displayed on screen']}
          withBg={0}
          features={features_points}
          mainText={`Explore ${projectName} Core Features`}
          subTitle={`Discover how ${projectName} enhances restaurant operations with cutting-edge features designed for efficiency and customer satisfaction.`}
          design={FeaturesDesigns.CARDS_GRID_WITH_ICONS_DIVERSITY || ''}
        />

        <ContactFormSection
          projectName={'Nutri-Tracker01'}
          design={ContactFormDesigns.HIGHLIGHTED || ''}
          image={['Person using contact form']}
          mainText={`Connect with ${projectName} Team `}
          subTitle={`Have questions or feedback? Reach out to us anytime, and our team at ${projectName} will respond promptly to assist you.`}
        />
      </main>
      <WebSiteFooter projectName={'Nutri-Tracker01'} pages={pages} />
    </div>
  );
}

WebSite.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};
