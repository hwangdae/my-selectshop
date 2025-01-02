import imageCompression from "browser-image-compression";

const options: Record<
  string,
  { maxSizeMB: number; maxWidthOrHeight: number; useWebWorker: boolean }
> = {
  small: { maxSizeMB: 0.5, maxWidthOrHeight: 300, useWebWorker: true },
  medium: { maxSizeMB: 1, maxWidthOrHeight: 1280, useWebWorker: true },
};

const getCompressionOptions = (size: string) => {
  return options[size];
};

export const imageCompressionFn = async (file: File, size: string) => {
  // const options = { maxSizeMB: 0.3, maxWidthOrHeight: 300, useWebWorker: true };
  const options = getCompressionOptions(size);
  const compressionFile = await imageCompression(file, options);
  return compressionFile;
};
