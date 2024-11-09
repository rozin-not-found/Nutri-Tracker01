import { mdiChartTimelineVariant, mdiUpload } from '@mdi/js';
import Head from 'next/head';
import React, { ReactElement, useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';

import CardBox from '../../components/CardBox';
import LayoutAuthenticated from '../../layouts/Authenticated';
import SectionMain from '../../components/SectionMain';
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton';
import { getPageTitle } from '../../config';

import { Field, Form, Formik } from 'formik';
import FormField from '../../components/FormField';
import BaseDivider from '../../components/BaseDivider';
import BaseButtons from '../../components/BaseButtons';
import BaseButton from '../../components/BaseButton';
import FormCheckRadio from '../../components/FormCheckRadio';
import FormCheckRadioGroup from '../../components/FormCheckRadioGroup';
import FormFilePicker from '../../components/FormFilePicker';
import FormImagePicker from '../../components/FormImagePicker';
import { SelectField } from '../../components/SelectField';
import { SelectFieldMany } from '../../components/SelectFieldMany';
import { SwitchField } from '../../components/SwitchField';
import { RichTextField } from '../../components/RichTextField';

import { update, fetch } from '../../stores/shops/shopsSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';

const EditShops = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initVals = {
    name: '',

    address: '',

    receptionists: [],

    menu_items: [],
  };
  const [initialValues, setInitialValues] = useState(initVals);

  const { shops } = useAppSelector((state) => state.shops);

  const { shopsId } = router.query;

  useEffect(() => {
    dispatch(fetch({ id: shopsId }));
  }, [shopsId]);

  useEffect(() => {
    if (typeof shops === 'object') {
      setInitialValues(shops);
    }
  }, [shops]);

  useEffect(() => {
    if (typeof shops === 'object') {
      const newInitialVal = { ...initVals };

      Object.keys(initVals).forEach(
        (el) => (newInitialVal[el] = shops[el] || ''),
      );

      setInitialValues(newInitialVal);
    }
  }, [shops]);

  const handleSubmit = async (data) => {
    await dispatch(update({ id: shopsId, data }));
    await router.push('/shops/shops-list');
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit shops')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'Edit shops'}
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form>
              <FormField label='ShopName'>
                <Field name='name' placeholder='ShopName' />
              </FormField>

              <FormField label='Address' hasTextareaHeight>
                <Field name='address' as='textarea' placeholder='Address' />
              </FormField>

              <FormField label='Receptionists' labelFor='receptionists'>
                <Field
                  name='receptionists'
                  id='receptionists'
                  component={SelectFieldMany}
                  options={initialValues.receptionists}
                  itemRef={'users'}
                  showField={'firstName'}
                ></Field>
              </FormField>

              <FormField label='MenuItems' labelFor='menu_items'>
                <Field
                  name='menu_items'
                  id='menu_items'
                  component={SelectFieldMany}
                  options={initialValues.menu_items}
                  itemRef={'menu_items'}
                  showField={'item_name'}
                ></Field>
              </FormField>

              <BaseDivider />
              <BaseButtons>
                <BaseButton type='submit' color='info' label='Submit' />
                <BaseButton type='reset' color='info' outline label='Reset' />
                <BaseButton
                  type='reset'
                  color='danger'
                  outline
                  label='Cancel'
                  onClick={() => router.push('/shops/shops-list')}
                />
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  );
};

EditShops.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'UPDATE_SHOPS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default EditShops;
