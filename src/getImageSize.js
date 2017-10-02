import { makeCancelable } from './utils/cancelablePromise';

export const getImageSize = url =>
  makeCancelable(
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
    })
  );
