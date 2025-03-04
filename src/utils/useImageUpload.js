// cloudName = "duxdwpukk"
// apiKey = '358525598819934'
// apiSecret = 'VveKXd8WPp3l0IRoqeLlkVEvTwM'
// apiEnv = 'CLOUDINARY_URL=cloudinary://358525598819934:VveKXd8WPp3l0IRoqeLlkVEvTwM@duxdwpukk'

export default async function uploadToCloudinary(file) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "uniThrift"); // Set in Cloudinary dashboard

    const response = await fetch(`https://api.cloudinary.com/v1_1/duxdwpukk/image/upload`, {
        method: "POST",
        body: formData,
    });

    const data = await response.json();
    return data.secure_url; // URL of uploaded image
}
