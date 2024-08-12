export function dataURLToBlob(dataURL) {
    const byteString = atob(dataURL.split(',')[1]);
    const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
}

export async function blobToDataURL(blob) {
    return new Promise(async (resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
}

// Function to read the CSV file
export function readCSVFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            resolve(event.target.result);
        };
        reader.onerror = (error) => {
            reject(error);
        };
        reader.readAsText(file);
    });
}

function getMimeType(filename) {
    const extension = filename.split('.').pop().toLowerCase();
    const mimeTypes = {
        'jpg': 'image/jpeg',
        'jpeg': 'image/jpeg',
        'png': 'image/png',
        'gif': 'image/gif',
        'svg': 'image/svg+xml',
        // Add other MIME types as needed
    };
    return mimeTypes[extension] || 'application/octet-stream';
}

// Function to read the ZIP file
export async function readZipFile(file) {
    try {
        const zip = new JSZip();
        const zipContent = await zip.loadAsync(file);
        const files = {};
        for (const filepath of Object.keys(zipContent.files)) {
            const filename = filepath.split('/').pop(); // Get the file name without directory
            const fileContent = await zipContent.files[filepath].async('blob');
            const mimeType = getMimeType(filename);
            const typedBlob = new Blob([fileContent], { type: mimeType });
            files[filename] = typedBlob;
        }
        return files;
    } catch (e) {
        var message = `Error reading zip file ${file}`;
        console.error(message, e);
        throw e;
    }
}

// Function to download all files as a zip file
export async function downloadAllAsZip(files, zipName) {
    //    - 'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.7.1/jszip.min.js'
    const zip = new JSZip();

    for (const file of files) {
        const fileName = file.split('/').pop();
        const response = await fetch(file);
        const blob = await response.blob();
        zip.file(fileName, blob);
    }

    var content = await zip.generateAsync({ type: 'blob' });
    saveAs(content, zipName);
}