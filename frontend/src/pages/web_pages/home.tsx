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
  FeaturesDesigns,
  AboutUsDesigns,
  FaqDesigns,
  ContactFormDesigns,
} from '../../components/WebPageComponents/designs';

import HeroSection from '../../components/WebPageComponents/HeroComponent';

import FeaturesSection from '../../components/WebPageComponents/FeaturesComponent';

import AboutUsSection from '../../components/WebPageComponents/AboutUsComponent';

import FaqSection from '../../components/WebPageComponents/FaqComponent';

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
      name: 'QR Code Integration',
      description:
        'Easily generate QR codes for each receipt, allowing customers to access detailed nutritional information and order history with a simple scan.',
      icon: 'mdiQrcode',
    },
    {
      name: 'Nutritional Insights',
      description:
        'Provide customers with comprehensive nutritional breakdowns for each menu item, helping them make informed dietary choices.',
      icon: 'mdiFoodApple',
    },
    {
      name: 'Order Management',
      description:
        'Streamline order processing with efficient receipt generation and order tracking, ensuring smooth operations for your restaurant.',
      icon: 'mdiClipboardList',
    },
  ];

  const faqs = [
    {
      question: 'How does the QR code integration work?',
      answer:
        'Each receipt generated by the system includes a unique QR code. Customers can scan this code using their smartphones to access detailed nutritional information and their order history online.',
    },
    {
      question: 'Can I update nutritional data for menu items?',
      answer:
        'Yes, as an admin, you can input and update nutritional data for each menu item through the admin dashboard, ensuring customers receive accurate information.',
    },
    {
      question: 'Is ${projectName} suitable for all types of restaurants?',
      answer:
        '${projectName} is designed for small restaurants and micro-businesses, providing them with tools to enhance customer experience through personalized nutrition tracking and efficient order management.',
    },
    {
      question: 'How secure is the login system?',
      answer:
        'The application uses role-based authentication with secure password management to ensure that only authorized users can access the admin and receptionist dashboards.',
    },
    {
      question: 'What technology stack does ${projectName} use?',
      answer:
        '${projectName} is built using React for the frontend and Firebase for backend services, ensuring a responsive and reliable user experience.',
    },
    {
      question: 'Can customers view their order history?',
      answer:
        'Yes, customers can log in to the application to view their order receipts and access detailed nutritional information through the QR code feature.',
    },
  ];

  return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <title>{`Nutri-Tracker - Personalized Nutrition Tracking for Restaurants`}</title>
        <meta
          name='description'
          content={`Nutri-Tracker offers personalized nutrition tracking for small restaurants and micro-businesses, featuring QR code integration, order management, and nutritional insights.`}
        />
      </Head>
      <WebSiteHeader projectName={'Nutri-Tracker01'} pages={pages} />
      <main className={`flex-grow  ${bgColor}    rounded-none  `}>
        <HeroSection
          projectName={'Nutri-Tracker01'}
          image={['Healthy meal with QR code']}
          mainText={`Transform Dining with ${projectName} Today`}
          subTitle={`${projectName} empowers small restaurants with personalized nutrition tracking, QR code integration, and seamless order management for enhanced customer experience.`}
          design={HeroDesigns.IMAGE_RIGHT || ''}
          buttonText={`Get Started`}
        />

        <FeaturesSection
          projectName={'Nutri-Tracker01'}
          image={['App interface with features']}
          withBg={0}
          features={features_points}
          mainText={`Discover ${projectName} Key Features`}
          subTitle={`Explore how ${projectName} enhances restaurant operations with innovative nutrition tracking and order management solutions.`}
          design={FeaturesDesigns.CARDS_GRID_WITH_ICONS || ''}
        />

        <AboutUsSection
          projectName={'Nutri-Tracker01'}
          image={['Team collaborating on project']}
          mainText={`Empowering Restaurants with ${projectName}`}
          subTitle={`${projectName} is dedicated to transforming small restaurants by providing innovative nutrition tracking and seamless order management solutions, enhancing customer satisfaction and operational efficiency.`}
          design={AboutUsDesigns.IMAGE_LEFT || ''}
          buttonText={`Learn More`}
        />

        <FaqSection
          projectName={'Nutri-Tracker01'}
          design={FaqDesigns.ACCORDION || ''}
          faqs={faqs}
          mainText={`Frequently Asked Questions about ${projectName} `}
        />

        <ContactFormSection
          projectName={'Nutri-Tracker01'}
          design={ContactFormDesigns.WITH_IMAGE || ''}
          image={['Person typing on laptop']}
          mainText={`Get in Touch with ${projectName} `}
          subTitle={`Reach out to us anytime with your questions or feedback. Our team at ${projectName} is here to assist you and will respond promptly to your inquiries.`}
        />
      </main>
      <WebSiteFooter projectName={'Nutri-Tracker01'} pages={pages} />
    </div>
  );
}

WebSite.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};
