import { Image } from '@spotify/web-api-ts-sdk';

/**
 * @returns A function that takes an {@link Image} array and returns the smallest possible image based on provided dimension requirements.
 */
export const useOptimalImage = () => {
  return (images: Image[], requiredHeight: number, requiredWidth: number): Image => {
    console.log('Images:', images);
    // no defined dimensions means there is only one size and we can return the image early
    if (images[0].height === null || images[0].width === null) {
      return images[0];
    }

    // iterate over all images
    for (let i = 0; i < images.length; i++) {
      if (i === images.length - 1) {
        return images[i];
      }

      // check if the current image is larger or equal to the requested dimensions AND if the next image in the array is smaller than the required dimensions
      if (
        images[i].height >= requiredHeight &&
        images[i].width >= requiredWidth &&
        images[i + 1].height < requiredHeight &&
        images[i + 1].width < requiredWidth
      ) {
        return images[i];
      }
    }

    // no images satisfied the requested dimensions. thus, we return the largest image
    return images[0];
  };
};
