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
  ContactFormDesigns,
  PricingDesigns,
} from '../../components/WebPageComponents/designs';

import HeroSection from '../../components/WebPageComponents/HeroComponent';

import FeaturesSection from '../../components/WebPageComponents/FeaturesComponent';

import ContactFormSection from '../../components/WebPageComponents/ContactFormComponent';

import PricingSection from '../../components/WebPageComponents/PricingComponent';

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
      name: 'Advanced Nutrition Tracking',
      description:
        'Provide detailed nutritional information for each menu item, helping customers make informed dietary choices and enhancing their dining experience.',
      icon: 'mdiFood',
    },
    {
      name: 'Efficient Order Processing',
      description:
        'Streamline order management with intuitive receipt generation and tracking, ensuring smooth operations and satisfied customers.',
      icon: 'mdiReceipt',
    },
    {
      name: 'Customizable Menu Management',
      description:
        "Easily update and manage your restaurant's menu, including nutritional data, to keep your offerings fresh and accurate.",
      icon: 'mdiMenu',
    },
  ];

  const pricing_features = {
    standard: {
      features: [
        'Basic Nutrition Tracking',
        'Order Management',
        'QR Code Generation',
      ],
      limited_features: ['Limited Menu Management', 'Basic Support'],
    },
    premium: {
      features: [
        'Advanced Nutrition Tracking',
        'Comprehensive Order Management',
        'Custom QR Code Features',
      ],
      also_included: [
        'Full Menu Management',
        'Priority Support',
        'Analytics Dashboard',
      ],
    },
    business: {
      features: [
        'Complete Nutrition and Order Solutions',
        'Custom Integrations',
        'Dedicated Account Manager',
        '24/7 Support',
      ],
    },
  };

  const description = {
    standard:
      'Ideal for small restaurants or cafes looking to enhance their customer experience with basic nutrition tracking and order management.',
    premium:
      'Perfect for growing businesses or startups that need advanced features and priority support to streamline operations and improve customer satisfaction.',
    business:
      'Designed for large enterprises requiring comprehensive solutions, custom integrations, and dedicated support to manage complex restaurant operations.',
  };

  return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <title>{`Nutri-Tracker Services - Enhance Your Restaurant`}</title>
        <meta
          name='description'
          content={`Explore the services offered by Nutri-Tracker, including personalized nutrition tracking, efficient order management, and competitive pricing plans for small restaurants.`}
        />
      </Head>
      <WebSiteHeader projectName={'Nutri-Tracker01'} pages={pages} />
      <main className={`flex-grow  ${bgColor}    rounded-none  `}>
        <HeroSection
          projectName={'Nutri-Tracker01'}
          image={['Restaurant staff using app']}
          mainText={`Elevate Your Dining Experience with ${projectName}`}
          subTitle={`Discover how ${projectName} transforms restaurant operations with cutting-edge nutrition tracking and seamless order management services tailored for small businesses.`}
          design={HeroDesigns.IMAGE_LEFT || ''}
          buttonText={`Explore Services`}
        />

        <FeaturesSection
          projectName={'Nutri-Tracker01'}
          image={['App features on display']}
          withBg={1}
          features={features_points}
          mainText={`Unlock ${projectName} Powerful Features`}
          subTitle={`Explore the innovative features of ${projectName} that streamline restaurant operations and enhance customer satisfaction.`}
          design={FeaturesDesigns.CARDS_GRID_WITH_ICONS || ''}
        />

        <PricingSection
          projectName={'Nutri-Tracker01'}
          withBg={0}
          features={pricing_features}
          description={description}
        />

        <ContactFormSection
          projectName={'Nutri-Tracker01'}
          design={ContactFormDesigns.WITH_IMAGE || ''}
          image={['Customer service representative']}
          mainText={`Reach Out to ${projectName} Support `}
          subTitle={`Have questions about our services or need assistance? Contact us anytime, and our team at ${projectName} will respond promptly to help you.`}
        />
      </main>
      <WebSiteFooter projectName={'Nutri-Tracker01'} pages={pages} />
    </div>
  );
}

WebSite.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};
