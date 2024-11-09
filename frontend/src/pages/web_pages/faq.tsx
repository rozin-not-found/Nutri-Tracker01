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
  FaqDesigns,
  ContactFormDesigns,
} from '../../components/WebPageComponents/designs';

import HeroSection from '../../components/WebPageComponents/HeroComponent';

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

  const faqs = [
    {
      question: 'What is the main purpose of ${projectName}?',
      answer:
        '${projectName} is designed to enhance restaurant operations by providing personalized nutrition tracking and efficient order management, improving customer satisfaction and operational efficiency.',
    },
    {
      question: 'How does the QR code feature work?',
      answer:
        'Each receipt includes a unique QR code that customers can scan to access detailed nutritional information and their order history, making it easy to track dietary intake.',
    },
    {
      question: 'Can I customize the nutritional data for menu items?',
      answer:
        'Yes, admins can input and update nutritional data for each menu item through the admin dashboard, ensuring accurate and up-to-date information for customers.',
    },
    {
      question: 'Is there a free trial available?',
      answer:
        'Currently, ${projectName} does not offer a free trial. However, we provide detailed demos and support to help you understand how our services can benefit your restaurant.',
    },
    {
      question: 'How secure is the data on ${projectName}?',
      answer:
        '${projectName} uses secure authentication and data management practices to ensure that all user and restaurant data is protected and accessible only to authorized users.',
    },
    {
      question: 'What kind of support does ${projectName} offer?',
      answer:
        'We offer comprehensive support through our contact form and customer service team, ready to assist with any questions or issues you may encounter.',
    },
  ];

  return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <title>{`Nutri-Tracker FAQ - Your Questions Answered`}</title>
        <meta
          name='description'
          content={`Find answers to common questions about Nutri-Tracker, including features, pricing, and support. Contact us for further assistance.`}
        />
      </Head>
      <WebSiteHeader projectName={'Nutri-Tracker01'} pages={pages} />
      <main className={`flex-grow  ${bgColor}    rounded-none  `}>
        <HeroSection
          projectName={'Nutri-Tracker01'}
          image={['Person reading FAQ page']}
          mainText={`Find Answers with ${projectName} FAQ`}
          subTitle={`Explore our comprehensive FAQ section to get quick answers to your questions about ${projectName}. Learn more about our features, pricing, and support options.`}
          design={HeroDesigns.TEXT_CENTER || ''}
          buttonText={`Explore FAQs`}
        />

        <FaqSection
          projectName={'Nutri-Tracker01'}
          design={FaqDesigns.TWO_COLUMN || ''}
          faqs={faqs}
          mainText={`Your Questions About ${projectName} Answered `}
        />

        <ContactFormSection
          projectName={'Nutri-Tracker01'}
          design={ContactFormDesigns.HIGHLIGHTED_DIVERSITY || ''}
          image={['Person using contact form']}
          mainText={`Contact ${projectName} Support Team `}
          subTitle={`Have more questions or need assistance? Reach out to us anytime, and our team at ${projectName} will respond promptly to help you.`}
        />
      </main>
      <WebSiteFooter projectName={'Nutri-Tracker01'} pages={pages} />
    </div>
  );
}

WebSite.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};
