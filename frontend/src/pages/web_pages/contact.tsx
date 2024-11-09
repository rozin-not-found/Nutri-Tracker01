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
  ContactFormDesigns,
  FaqDesigns,
} from '../../components/WebPageComponents/designs';

import HeroSection from '../../components/WebPageComponents/HeroComponent';

import ContactFormSection from '../../components/WebPageComponents/ContactFormComponent';

import FaqSection from '../../components/WebPageComponents/FaqComponent';

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
      question: 'How can I access my order history?',
      answer:
        "You can access your order history by logging into the ${projectName} app and navigating to the 'Order History' section. Here, you'll find all your past orders with detailed information.",
    },
    {
      question: 'What information is included in the nutritional breakdown?',
      answer:
        'The nutritional breakdown includes calories, protein, fats, carbohydrates, and other key nutrients for each menu item, helping you make informed dietary choices.',
    },
    {
      question: 'How do I update menu items and nutritional data?',
      answer:
        'Admins can update menu items and nutritional data through the admin dashboard. Simply log in, navigate to the menu management section, and make the necessary changes.',
    },
    {
      question: 'Is there a customer support team available?',
      answer:
        'Yes, our customer support team is available to assist you with any questions or issues you may have. You can contact us through the contact form on our website.',
    },
    {
      question: 'Can I customize the QR code features?',
      answer:
        "Yes, the QR code features can be customized to suit your restaurant's needs, providing customers with easy access to their order details and nutritional information.",
    },
  ];

  return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <title>{`Contact Nutri-Tracker - Get in Touch`}</title>
        <meta
          name='description'
          content={`Reach out to Nutri-Tracker for any inquiries or support. Our team is here to assist you with any questions you may have about our services.`}
        />
      </Head>
      <WebSiteHeader projectName={'Nutri-Tracker01'} pages={pages} />
      <main className={`flex-grow  ${bgColor}    rounded-none  `}>
        <HeroSection
          projectName={'Nutri-Tracker01'}
          image={['Customer support team']}
          mainText={`Connect with ${projectName} Today`}
          subTitle={`We're here to help with any questions or support you need. Reach out to the ${projectName} team and let us assist you in enhancing your restaurant operations.`}
          design={HeroDesigns.IMAGE_RIGHT || ''}
          buttonText={`Contact Us`}
        />

        <FaqSection
          projectName={'Nutri-Tracker01'}
          design={FaqDesigns.ACCORDION || ''}
          faqs={faqs}
          mainText={`Common Questions about ${projectName} `}
        />

        <ContactFormSection
          projectName={'Nutri-Tracker01'}
          design={ContactFormDesigns.WITH_IMAGE || ''}
          image={['Person filling contact form']}
          mainText={`Get in Touch with ${projectName} `}
          subTitle={`Have questions or need support? Contact us anytime, and our team at ${projectName} will respond promptly to assist you.`}
        />
      </main>
      <WebSiteFooter projectName={'Nutri-Tracker01'} pages={pages} />
    </div>
  );
}

WebSite.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};
