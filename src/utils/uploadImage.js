const url = `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`;

// process.env. will not work in vite app 
const UploadImage = async (image) => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append('upload_preset', 'mern_product');

    const response = await fetch(url, {
        method: "POST",
        body: formData,
    });
    return await response.json();
};

export default UploadImage;
