export const convertToWebP = async (file:File) => {
    const img = new Image();
    console.log(img)
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
  
    return new Promise((resolve, reject) => {
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx!.drawImage(img, 0, 0);
        canvas.toBlob((blob) => {
            if(blob){
                resolve(blob);
                console.log("변 환 성공")
            }else{
                reject(new Error("변환에 실패 했습니다."))
            }

        }, 'image/webp');
      };
  
      img.onerror = reject;
      img.src = URL.createObjectURL(file);
    });
  };