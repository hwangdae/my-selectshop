import imageCompression from "browser-image-compression";

const options: Record<string, { maxSizeMB: number; maxWidthOrHeight: number }> =
  {
    "small": { maxSizeMB: 1, maxWidthOrHeight: 300 },
    "medium": { maxSizeMB: 2, maxWidthOrHeight: 1280 },
  };

const getCompressionOptions = (size: string) => {
  return options[size]
};

export const imageCompressionFn = async (file: File, size: string) => {
  const options = getCompressionOptions(size);
  const compressionFile = await imageCompression(file, options);
  return compressionFile;
};
