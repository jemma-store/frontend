export const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-main z-[2000]">
      <h3 className="text-accent hidden">
        JEMMA
      </h3>
      
      <img className="bg-transparent" width={200} height={56} src="/loader.gif" alt="Loader gif" />
    </div>
  );
};
