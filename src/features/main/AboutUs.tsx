import { About } from '@/assets';

export const AboutUs = () => {
  return (
    <section
      id="about-us"
      className="relative w-full lg:h-[800px] h-[273px] flex flex-col items-center justify-center  section-indent bg-cover bg-center"
      style={{ backgroundImage: `url(${About})` }}
    >
      <div className="container">
        <h2 className="text-center text-[var(--brown-dark)] lg:mb-[41px] mb-[33px]">Про нас</h2>

        <div className="w-full flex flex-col z-50 items-center justify-center lg:gap-6 gap-5 text-center lg:text-[length:var(--text)]">
          <p className="max-w-[490px]">
            У нашому ювелірному магазині кожна прикраса — це поєднання бездоганної якості та
            унікального стилю. Ми віримо, що коштовності мають не лише прикрашати, а й підкреслювати
            індивідуальність.
          </p>

          <p className="max-w-[490px]">
            Ми ретельно відбираємо найкращі дорогоцінні метали та натуральні камені, щоб створювати
            прикраси, що передають витонченість, довговічність і гармонію. Наші майстри ювелірного
            мистецтва працюють із любов’ю до деталей, втілюючи у виробах унікальні рішення.
          </p>
        </div>
      </div>
    </section>
  );
};
