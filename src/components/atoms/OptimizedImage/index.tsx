import Image from "next/image";

interface OptimizedImageProps {
  src: string;
  width?: string;
  maxWidth?: string;
}

export function OptimizedImage({ src, width, maxWidth }: OptimizedImageProps) {
  return (
    <div style={{ width: "100%" }} className="relative">
      <Image
        src={src}
        alt="rate"
        layout="fill"
        objectFit="contain"
        className="w-full absolute"
      />
    </div>
  );
}
