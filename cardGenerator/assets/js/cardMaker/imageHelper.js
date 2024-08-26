
import { blobToDataURL } from "./fileHelper.js";

async function compressImage(imageBlob) {
    return new Promise((resolve, reject) => {
        new Compressor(imageBlob, {
            quality: 0.9, // High quality setting for print
            maxWidth: 2500, // Optional: Limit the maximum width for large images
            maxHeight: 2500, // Optional: Limit the maximum height for large images
            success(result) {
                resolve(result);
            },
            error(err) {
                reject(err);
            }
        });
    });
}

export async function loadImage(src) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = async () => {
            resolve(img);
        }
        img.onerror = reject;
    });
}

async function fetchImageAsDataURL(url) {
    const response = await fetch(url);
    const blob = await response.blob();
    return await blobToDataURL(await compressImage(blob));
}

export async function getImageDataUrl(imageSource, zipData) {
    if (imageSource && (imageSource.startsWith('http://') || imageSource.startsWith('https://'))) {
        return await fetchImageAsDataURL(imageSource);
    } else if (zipData) {
        const blob = zipData[imageSource];
        if (blob) {
            return await blobToDataURL(await compressImage(blob))
        }
        throw `Unable to load ${imageSource} from zip`;
    }
}

export function getSizeToMax(maxWidth, maxHeight, image) {
    try {
        var heightAdj = maxHeight / image.height;
        var widthAdj = maxWidth / image.width;

        if ((image.width * heightAdj) <= maxWidth) {
            return { height: image.height * heightAdj, width: image.width * heightAdj, wPadding: (maxWidth - (image.width * heightAdj)) / 2 };
        } else if ((image.height * widthAdj) <= maxHeight) {
            return { height: image.height * widthAdj, width: image.width * widthAdj, hPadding: (maxHeight - (image.height * widthAdj)) / 2 };
        }
        debugger;
    } catch (e) {
        var message = `Error determining max size for ${image.name}`;
        console.error(message, e);
        throw e;
    }
}