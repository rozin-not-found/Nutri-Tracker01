import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head';
import 'react-toastify/dist/ReactToastify.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { fetch } from '../../stores/shops/shopsSlice';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';
import LayoutAuthenticated from '../../layouts/Authenticated';
import { getPageTitle } from '../../config';
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton';
import SectionMain from '../../components/SectionMain';
import CardBox from '../../components/CardBox';
import BaseButton from '../../components/BaseButton';
import BaseDivider from '../../components/BaseDivider';
import { mdiChartTimelineVariant } from '@mdi/js';
import { SwitchField } from '../../components/SwitchField';
import FormField from '../../components/FormField';

const ShopsView = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { shops } = useAppSelector((state) => state.shops);

  const { id } = router.query;

  function removeLastCharacter(str) {
    console.log(str, `str`);
    return str.slice(0, -1);
  }

  useEffect(() => {
    dispatch(fetch({ id }));
  }, [dispatch, id]);

  return (
    <>
      <Head>
        <title>{getPageTitle('View shops')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={removeLastCharacter('View shops')}
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>ShopName</p>
            <p>{shops?.name}</p>
          </div>

          <FormField label='Multi Text' hasTextareaHeight>
            <textarea className={'w-full'} disabled value={shops?.address} />
          </FormField>

          <>
            <p className={'block font-bold mb-2'}>Receptionists</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>First Name</th>

                      <th>Last Name</th>

                      <th>Phone Number</th>

                      <th>E-Mail</th>

                      <th>Disabled</th>
                    </tr>
                  </thead>
                  <tbody>
                    {shops.receptionists &&
                      Array.isArray(shops.receptionists) &&
                      shops.receptionists.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(`/users/users-view/?id=${item.id}`)
                          }
                        >
                          <td data-label='firstName'>{item.firstName}</td>

                          <td data-label='lastName'>{item.lastName}</td>

                          <td data-label='phoneNumber'>{item.phoneNumber}</td>

                          <td data-label='email'>{item.email}</td>

                          <td data-label='disabled'>
                            {dataFormatter.booleanFormatter(item.disabled)}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!shops?.receptionists?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>MenuItems</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>ItemName</th>

                      <th>UnitPrice</th>

                      <th>Calories</th>

                      <th>Protein</th>

                      <th>Fats</th>

                      <th>Carbohydrates</th>
                    </tr>
                  </thead>
                  <tbody>
                    {shops.menu_items &&
                      Array.isArray(shops.menu_items) &&
                      shops.menu_items.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(
                              `/menu_items/menu_items-view/?id=${item.id}`,
                            )
                          }
                        >
                          <td data-label='item_name'>{item.item_name}</td>

                          <td data-label='unit_price'>{item.unit_price}</td>

                          <td data-label='calories'>{item.calories}</td>

                          <td data-label='protein'>{item.protein}</td>

                          <td data-label='fats'>{item.fats}</td>

                          <td data-label='carbohydrates'>
                            {item.carbohydrates}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!shops?.menu_items?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>Menu_items Shop</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>ItemName</th>

                      <th>UnitPrice</th>

                      <th>Calories</th>

                      <th>Protein</th>

                      <th>Fats</th>

                      <th>Carbohydrates</th>
                    </tr>
                  </thead>
                  <tbody>
                    {shops.menu_items_shop &&
                      Array.isArray(shops.menu_items_shop) &&
                      shops.menu_items_shop.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(
                              `/menu_items/menu_items-view/?id=${item.id}`,
                            )
                          }
                        >
                          <td data-label='item_name'>{item.item_name}</td>

                          <td data-label='unit_price'>{item.unit_price}</td>

                          <td data-label='calories'>{item.calories}</td>

                          <td data-label='protein'>{item.protein}</td>

                          <td data-label='fats'>{item.fats}</td>

                          <td data-label='carbohydrates'>
                            {item.carbohydrates}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!shops?.menu_items_shop?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <BaseDivider />

          <BaseButton
            color='info'
            label='Back'
            onClick={() => router.push('/shops/shops-list')}
          />
        </CardBox>
      </SectionMain>
    </>
  );
};

ShopsView.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'READ_SHOPS'}>{page}</LayoutAuthenticated>
  );
};

export default ShopsView;
