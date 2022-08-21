type BannerProps = {
  bgImage: string;
  alt: string;
  children: React.ReactNode;
};

export const Banner: React.FC<BannerProps> = ({ bgImage, alt, children }) => {
  return (
    <div className="flex items-center justify-between px-8 relative">
      <img src={bgImage} alt={alt} className="w-full" />
      <div className="flex flex-col justify-center mx-8 p-16 absolute inset-0 h-full w-full">
        {children}
      </div>
    </div>
  );
};
