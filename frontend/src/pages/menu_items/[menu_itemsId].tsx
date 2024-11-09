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

import { update, fetch } from '../../stores/menu_items/menu_itemsSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';

const EditMenu_items = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initVals = {
    item_name: '',

    unit_price: '',

    calories: '',

    protein: '',

    fats: '',

    carbohydrates: '',

    shop: '',
  };
  const [initialValues, setInitialValues] = useState(initVals);

  const { menu_items } = useAppSelector((state) => state.menu_items);

  const { menu_itemsId } = router.query;

  useEffect(() => {
    dispatch(fetch({ id: menu_itemsId }));
  }, [menu_itemsId]);

  useEffect(() => {
    if (typeof menu_items === 'object') {
      setInitialValues(menu_items);
    }
  }, [menu_items]);

  useEffect(() => {
    if (typeof menu_items === 'object') {
      const newInitialVal = { ...initVals };

      Object.keys(initVals).forEach(
        (el) => (newInitialVal[el] = menu_items[el] || ''),
      );

      setInitialValues(newInitialVal);
    }
  }, [menu_items]);

  const handleSubmit = async (data) => {
    await dispatch(update({ id: menu_itemsId, data }));
    await router.push('/menu_items/menu_items-list');
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit menu_items')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'Edit menu_items'}
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
                  options={initialValues.shop}
                  itemRef={'shops'}
                  showField={'name'}
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

EditMenu_items.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'UPDATE_MENU_ITEMS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default EditMenu_items;
