import Image, { ImageProps } from "next/image";
import { useState } from "react";

interface ImageWithFallbackProps extends Omit<ImageProps, "src" | "alt"> {
  src: string;
  alt: string;
}

export default function ImageWithFallback({
  src,
  alt,
  width,
  height,
  className,
  ...props
}: ImageWithFallbackProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        role="presentation"
        style={{
          width,
          height,
          backgroundColor: "black",
        }}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      onError={() => setHasError(true)}
      {...props}
      priority={true}
      style={{ objectFit: "cover", ...props.style }}
    />
  );
}
