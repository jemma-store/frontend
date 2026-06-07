import { CertificateCard } from "@/components/CertificateCard";
import { certificates } from "@/mock/certificates";


export const SimilarCertificates = ({id}: {id: number}) => {
  const filteredCertificates = certificates.filter((item) => item.id !== id);

  return (
    <section className="flex flex-col items-start gap-10 w-full section-indent mt-10">
      <h2 className="w-full font-third font-normal text-brown-dark text-2xl leading-[31.2px] tracking-[0]">
        Перегляньте подібні товари:
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 w-full gap-2">
        {filteredCertificates.map((item) => (
          <CertificateCard key={item.id} certificate={item} />
        ))}
      </div>
    </section>
  );
};
