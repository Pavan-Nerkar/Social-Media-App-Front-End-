const cloud_name = "dwaejd9sj";
const upload_preset = "social_media_uploads";

export const uploadToCloudinary = async (file, fileType) => {
  if (!file || !fileType) {
    console.error("Missing file or fileType");
    return null;
  }

  try {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", upload_preset); // only preset, no cloud_name here

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloud_name}/${fileType}/upload`,
      {
        method: "POST",
        body: data,
      }
    );

    const fileData = await res.json();
    console.log("Cloudinary response:", fileData);

    if (fileData.secure_url) {
      return fileData.secure_url;
    } else {
      console.error("Upload failed:", fileData);
      return null;
    }
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    return null;
  }
};
