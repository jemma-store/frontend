import { useMemo } from "react";

import { CertificateLayout } from "@/layouts/CertificateLayout";
import { useCertificateStore } from "@/store/useCertificateStore";


export const Certificates = () => {
  const { certificates, loading, error } = useCertificateStore();

  if (loading) return <div className="text-center py-20">Завантаження сертифікатів...</div>;
  if (error) return <div className="text-center py-20 text-error">{error}</div>;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const memoCertificates = useMemo(() => certificates, [certificates]);

  return <CertificateLayout certificates={memoCertificates} />;
};
