// scripts: 
//     - 'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.7.1/jszip.min.js'
//     - 'https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.5/FileSaver.min.js'

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
        const blob = await cacheHelper.manageCache('pdf-cache', fileName, async () => {
            const response = await fetch(file);
            return await response.blob();
        });
        zip.file(fileName, blob);
    }

    var content = await zip.generateAsync({ type: 'blob' });
    saveAs(content, zipName);
}

/**
 * Requires 
 * 'https://cdn.jsdelivr.net/npm/aws-sdk/dist/aws-sdk.min.js'
 * Initializes the AWS S3 connection
 * @param {*} k The key
 * @param {*} s The secret
 * @returns 
 */
export function setAWS(k, s) {
    AWS.config.update({
        accessKeyId: k,
        secretAccessKey: s,
        region: 'us-west-1',
    });
    return new AWS.S3({
        endpoint: 'https://dnqjtsaxybwrurmucsaa.supabase.co/storage/v1/s3',
        s3ForcePathStyle: true, // Needed for S3-compatible storage
        signatureVersion: 'v4', // Ensure the signature version is compatible
    });
}

/**
 * Saves the provided file to the AWS S3 file storage
 * @param {*} s3 Use the SetAWS function to initialize the AWS S3 connection
 * @param {*} fileInput The file input element. EX: $("#hitbox")[0]
 * @param {*} path Full path on where to store the file inside of S3
 * @returns 
 */
export function saveFileToS3(s3, fileInput, path) {
    return new Promise((resolve, reject) => {
        if (fileInput.files.length === 0) {
            alert('Please select a file to upload.');
            return reject('Please select a file to upload.');
        }

        const file = fileInput.files[0];
        const fileName = file.name.trim().replace(/\s+/g, "_");
        const bucketName = path;

        s3.putObject({
            Bucket: bucketName,
            Key: fileName,
            Body: file,
            ContentType: file.type, // Specify the MIME type
        }, (err, data) => {
            if (err) {
                reject(`Error uploading file: ${err}`);
            } else {
                // Construct the URL of the uploaded file
                const fileUrl = `https://${s3.endpoint.hostname}/storage/v1/object/public/${bucketName}/${fileName}`;
                resolve(fileUrl);
            }
        });
    });
}
