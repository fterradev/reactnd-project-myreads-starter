export const getImageSize = url =>
  new Promise((resolve, reject) => {
    const image = new Image();

    image.onload = () => {
      resolve({
        width: `${image.width}px`,
        height: `${image.height}px`
      });
    };
    image.onerror = () => {
      reject('Failed to load image.');
    };
    image.src = url;
  });
