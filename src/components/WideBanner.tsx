export default function WideBanner({
  image,
  alt,
}: {
  image: string;
  alt: string;
}) {
  return (
    <div className="bg-white mt-2.5 p-4">
      <div className="w-full h-[100px] md:h-[160px] rounded-xl overflow-hidden cursor-pointer">
        <img
          src={image}
          alt={alt}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
