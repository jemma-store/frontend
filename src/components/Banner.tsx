export const Banner = () => {
  return (
    <div
      className={`h-[320px] w-full mt-[40px] bg-cover bg-center flex justify-center relative bg-[url('/images/banner-mobile.png')] md:h-[417px] md:bg-[url('/images/banner-tablet.png')] xl:h-[400px] xl:mt-[45px] xl:items-center xl:bg-[url('/images/Banner.png')]`}
    >
      <h1 className="text-center text-main uppercase mt-14 w-[254px] md:text-[54px] md:w-[621px] lg:w-[621px] xl:mt-105 xl:h-[621px] xl:text-[54px] xl:color-white xl:text-accent">
        Зроби свій стиль неповторним
      </h1>
    </div>
  );
};
