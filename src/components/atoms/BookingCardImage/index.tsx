import Image from "next/image";

interface BookingCardImageProps {
  imageLocation: string;
}

export function BookingCardImage({ imageLocation }: BookingCardImageProps) {
  return (
    <div className="relative w-full" style={{ paddingBottom: "100%" }}>
      <Image
        src={imageLocation}
        alt="home-image"
        fill
        className="absolute inset-0 rounded-xl object-cover"
      />
    </div>
  );
}
