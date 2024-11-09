import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head';
import 'react-toastify/dist/ReactToastify.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { fetch } from '../../stores/orders/ordersSlice';
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

const OrdersView = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { orders } = useAppSelector((state) => state.orders);

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
        <title>{getPageTitle('View orders')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={removeLastCharacter('View orders')}
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <FormField label='OrderDate'>
            {orders.order_date ? (
              <DatePicker
                dateFormat='yyyy-MM-dd hh:mm'
                showTimeSelect
                selected={
                  orders.order_date
                    ? new Date(
                        dayjs(orders.order_date).format('YYYY-MM-DD hh:mm'),
                      )
                    : null
                }
                disabled
              />
            ) : (
              <p>No OrderDate</p>
            )}
          </FormField>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Customer</p>

            <p>{orders?.customer?.firstName ?? 'No data'}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Receptionist</p>

            <p>{orders?.receptionist?.firstName ?? 'No data'}</p>
          </div>

          <>
            <p className={'block font-bold mb-2'}>OrderItems</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>Quantity</th>

                      <th>TotalPrice</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.order_items &&
                      Array.isArray(orders.order_items) &&
                      orders.order_items.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(
                              `/order_items/order_items-view/?id=${item.id}`,
                            )
                          }
                        >
                          <td data-label='quantity'>{item.quantity}</td>

                          <td data-label='total_price'>{item.total_price}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!orders?.order_items?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>Order_items Order</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>Quantity</th>

                      <th>TotalPrice</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.order_items_order &&
                      Array.isArray(orders.order_items_order) &&
                      orders.order_items_order.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(
                              `/order_items/order_items-view/?id=${item.id}`,
                            )
                          }
                        >
                          <td data-label='quantity'>{item.quantity}</td>

                          <td data-label='total_price'>{item.total_price}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!orders?.order_items_order?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <BaseDivider />

          <BaseButton
            color='info'
            label='Back'
            onClick={() => router.push('/orders/orders-list')}
          />
        </CardBox>
      </SectionMain>
    </>
  );
};

OrdersView.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'READ_ORDERS'}>{page}</LayoutAuthenticated>
  );
};

export default OrdersView;
