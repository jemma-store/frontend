import { useCompareStore } from '@/store/useCompareStore';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from '@/assets/icons/ArrowLeft';
import { useWindowWidth } from '@/lib/hooks/useWindowWidth';

export const CompareProductsPage = () => {

  const navigate = useNavigate()
  const compareItems = useCompareStore((state) => state.compareItems);
  const categoryName = compareItems.find(item => item.categoryName);

  const {isDesktop, isTablet, isMobile} = useWindowWidth()

  return (
    <div className="container leading-[130%] pb-16">

      <div className='mt-24 md:mt-35'>
        <button
          onClick={() => navigate(-1)}
          className=' flex items-center leading-none gap-1 text-[16px] font-medium'>
            <ArrowLeft />
            <span>Назад</span>
        </button>
      </div>

      <h2 className='mb-12 mt-9 text-center text-[20px] text-button md:text-black md:text-left'>Порівняння товарів</h2> 
      <h2 className='text-[16px] text-button text-center pb-3 font-main md:hidden'>Метал</h2>

      {isDesktop || isMobile ? (
        null
      ) : (
        <span className='hidden md:block md:text-button md:pb-9 md:text-[16px]'>{categoryName?.categoryName}</span>
      )}
      
      {isTablet || isDesktop ? (
        <>
        <div className='flex flex-row w-full justify-center gap-5 pb-17'>
          {compareItems.map(item => (
            <div className='w-50'>
              <img 
              src={item.images[0].url} 
              alt={`${item.categoryName}, ${item.collectionName}`}
              />
              <div className='flex text-[12px] justify-between'>
                <div className='flex gap-1'>
                  <span>{item.categoryName}</span>
                  <span>"{item.collectionName}"</span>
                </div>
                
                <span>{item.price.normalPrice} грн</span>
              </div>
            </div>
          ))}
        </div>

          <div className='grid grid-cols-4 py-1 bg-[#F6F6F6]'>
            <h3 className='text-[16px] font-normal'>Метал</h3>
            {compareItems.map(item => (
              <div>
                <span>{item.description?.characteristic.metal}</span>
              </div>
            ))}
          </div>

        <div className='grid grid-cols-4 py-1'>
          <h3 className='text-[16px] font-normal'>Колір</h3>
          {compareItems.map(item => (
            <div>
              <span>{item.description?.characteristic.color}</span>
            </div>
          ))}
        </div>

        <div className='grid grid-cols-4 py-1 bg-[#F6F6F6]'>
          <h3 className='text-[16px] font-normal '>Середня Вага</h3>
          {compareItems.map(item => (
            <div>
              <span>~ {item.description?.characteristic.averageWeight}</span>
            </div>
          ))}
        </div>

        <div className='grid grid-cols-4 py-1'>
          <h3 className='text-[16px] font-normal'>Ширина</h3>
          {compareItems.map(item => (
            <div>
              <span>{item.description?.characteristic.size.width}</span>
            </div>
          ))}
        </div>

        <div className='grid grid-cols-4 py-1 bg-[#F6F6F6]'>
          <h3 className='text-[16px] font-normal'>Висота</h3>
          {compareItems.map(item => (
            <div>
              <span>{item.description?.characteristic.size.height}</span>
            </div>
          ))}
        </div>

       <div className='grid grid-cols-4 py-1 '>
          <h3 className='text-[16px] font-normal'>Довжина</h3>
          {compareItems.map(item => (
            <div>
              <span>{item.description?.characteristic.size.length}</span>
            </div>
          ))}
        </div>

        <div className='grid grid-cols-4 py-1 bg-[#F6F6F6]'>
          <h3 className='text-[16px] font-normal'>Камінь</h3>
          {compareItems.map(item => (
            <div>
              <span>{item.description?.characteristic.stone}</span>
            </div>
          ))}
        </div>
       </>
      ) : (
        <div>
           {compareItems.map((item) => (
      <div key={item.id} className='flex flex-col pb-3'>
        <div className='flex justify-between '>
          <section className='flex gap-2'>
            <div className='w-20 h-26 flex-shrink-0 overflow-hidden'>
              <img className="w-full h-full object-cover" src={item.images[0].url} alt="Обраний товар" />
            </div>
            <div className='flex flex-col'>
              <span>{item.name}</span>
              <span>"{item.collectionName}"</span>
              <span className='text-button'>{item.price.normalPrice} грн</span>
            </div>
          </section>
          <span className='text-[16px] text-end'>{item.description?.characteristic.metal}</span>
        </div>
      </div>
      ))}

       <h2 className='text-[16px] text-button text-center pb-3 pt-5 font-main'>Колір металу</h2>

      {compareItems.map((item) => (
      <div key={item.id} className='flex flex-col gap-3 pb-3'>
       
        <div className='flex justify-between '>
          <section className='flex gap-2'>
            <div className='w-20 h-26 flex-shrink-0 overflow-hidden'>
              <img className="w-full h-full object-cover" src={item.images[0].url} alt="Обраний товар" />
            </div>
            <div className='flex flex-col'>
              <span>{item.name}</span>
              <span>"{item.collectionName}"</span>
              <span className='text-button'>{item.price.normalPrice} грн</span>
            </div>
          </section>
          <span className='text-[16px] text-end'>{item.description?.characteristic.color}</span>
        </div>
      </div>
      ))}

        <h2 className='text-[16px] text-button text-center pb-3 pt-5 font-main'>Середня вага</h2>

      {compareItems.map((item) => (
      <div key={item.id} className='flex flex-col gap-3 pb-3'>
       
        <div className='flex justify-between '>
          <section className='flex gap-2'>
            <div className='w-20 h-26 flex-shrink-0 overflow-hidden'>
              <img className="w-full h-full object-cover" src={item.images[0].url} alt="Обраний товар" />
            </div>
            <div className='flex flex-col'>
              <span>{item.name}</span>
              <span>"{item.collectionName}"</span>
              <span className='text-button'>{item.price.normalPrice} грн</span>
            </div>
          </section>
          <span className='text-[16px] text-end'>~{item.description?.characteristic.averageWeight}</span>
        </div>
      </div>
      ))}

      <h2 className='text-[16px] text-button text-center pb-3 pt-5 font-main'>Розміри</h2>

      {compareItems.map((item) => (
      <div key={item.id} className='flex flex-col gap-3 pb-3'>
       
        <div className='flex justify-between '>
          <section className='flex gap-2'>
            <div className='w-20 h-26 flex-shrink-0 overflow-hidden'>
             <img className="w-full h-full object-cover" src={item.images[0].url} alt="Обраний товар" />
            </div>
            <div className='flex flex-col'>
              <span>{item.name}</span>
              <span>"{item.collectionName}"</span>
              <span className='text-button'>{item.price.normalPrice} грн</span>
            </div>
          </section>
          <div className='flex flex-col gap-1 flex-shrink-0 text-end'>
            <span className='text-[16px]'>ширина {item.description?.characteristic.size.width} мм</span>
            <span className='text-[16px]'>висота {item.description?.characteristic.size.height} мм</span>
            <span className='text-[16px]'>довжина {item.description?.characteristic.size.length} мм</span>
          </div>
        </div>
      </div>
      ))}

      <h2 className='text-[16px] text-button text-center pb-3 pt-5 font-main'>Камінь</h2>

      {compareItems.map((item) => (
      <div key={item.id} className='flex flex-col gap-3 pb-3'>
       
        <div className='flex justify-between '>
          <section className='flex gap-2'>
            <div className='w-20 h-26 flex-shrink-0 overflow-hidden'>
              <img className="w-full h-full object-cover" src={item.images[0].url} alt="Обраний товар" />
            </div>
            <div className='flex flex-col'>
              <span>{item.name}</span>
              <span>"{item.collectionName}"</span>
              <span className='text-button'>{item.price.normalPrice} грн</span>
            </div>
          </section>
          <div className='flex flex-col gap-1 flex-shrink-0 text-end'>
            <span className='text-[16px]'>{item.description?.characteristic.stone}</span>
          </div>
        </div>
      </div>
      ))}
    </div>
      )}
  </div>
  );
};