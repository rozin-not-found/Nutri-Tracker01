import {
  mdiAccount,
  mdiChartTimelineVariant,
  mdiMail,
  mdiUpload,
} from '@mdi/js';
import Head from 'next/head';
import React, { ReactElement } from 'react';
import 'react-toastify/dist/ReactToastify.min.css';
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
import { SwitchField } from '../../components/SwitchField';

import { SelectField } from '../../components/SelectField';
import { SelectFieldMany } from '../../components/SelectFieldMany';
import { RichTextField } from '../../components/RichTextField';

import { create } from '../../stores/menu_items/menu_itemsSlice';
import { useAppDispatch } from '../../stores/hooks';
import { useRouter } from 'next/router';
import moment from 'moment';

const initialValues = {
  item_name: '',

  unit_price: '',

  calories: '',

  protein: '',

  fats: '',

  carbohydrates: '',

  shop: '',
};

const Menu_itemsNew = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleSubmit = async (data) => {
    await dispatch(create(data));
    await router.push('/menu_items/menu_items-list');
  };
  return (
    <>
      <Head>
        <title>{getPageTitle('New Item')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title='New Item'
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <Formik
            initialValues={initialValues}
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form>
              <FormField label='ItemName'>
                <Field name='item_name' placeholder='ItemName' />
              </FormField>

              <FormField label='UnitPrice'>
                <Field
                  type='number'
                  name='unit_price'
                  placeholder='UnitPrice'
                />
              </FormField>

              <FormField label='Calories'>
                <Field type='number' name='calories' placeholder='Calories' />
              </FormField>

              <FormField label='Protein'>
                <Field type='number' name='protein' placeholder='Protein' />
              </FormField>

              <FormField label='Fats'>
                <Field type='number' name='fats' placeholder='Fats' />
              </FormField>

              <FormField label='Carbohydrates'>
                <Field
                  type='number'
                  name='carbohydrates'
                  placeholder='Carbohydrates'
                />
              </FormField>

              <FormField label='Shop' labelFor='shop'>
                <Field
                  name='shop'
                  id='shop'
                  component={SelectField}
                  options={[]}
                  itemRef={'shops'}
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
                  onClick={() => router.push('/menu_items/menu_items-list')}
                />
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  );
};

Menu_itemsNew.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'CREATE_MENU_ITEMS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default Menu_itemsNew;
