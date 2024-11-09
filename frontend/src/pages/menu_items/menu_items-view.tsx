import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head';
import 'react-toastify/dist/ReactToastify.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { fetch } from '../../stores/menu_items/menu_itemsSlice';
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

const Menu_itemsView = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { menu_items } = useAppSelector((state) => state.menu_items);

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
        <title>{getPageTitle('View menu_items')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={removeLastCharacter('View menu_items')}
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>ItemName</p>
            <p>{menu_items?.item_name}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>UnitPrice</p>
            <p>{menu_items?.unit_price || 'No data'}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Calories</p>
            <p>{menu_items?.calories || 'No data'}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Protein</p>
            <p>{menu_items?.protein || 'No data'}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Fats</p>
            <p>{menu_items?.fats || 'No data'}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Carbohydrates</p>
            <p>{menu_items?.carbohydrates || 'No data'}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Shop</p>

            <p>{menu_items?.shop?.name ?? 'No data'}</p>
          </div>

          <>
            <p className={'block font-bold mb-2'}>Order_items MenuItem</p>
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
                    {menu_items.order_items_menu_item &&
                      Array.isArray(menu_items.order_items_menu_item) &&
                      menu_items.order_items_menu_item.map((item: any) => (
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
              {!menu_items?.order_items_menu_item?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <BaseDivider />

          <BaseButton
            color='info'
            label='Back'
            onClick={() => router.push('/menu_items/menu_items-list')}
          />
        </CardBox>
      </SectionMain>
    </>
  );
};

Menu_itemsView.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'READ_MENU_ITEMS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default Menu_itemsView;
