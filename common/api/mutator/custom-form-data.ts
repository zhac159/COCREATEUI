export const customFormData = (body: Record<string, any>): FormData => {
  const formData = new FormData();

  Object.keys(body).forEach((key) => {
    if (key === "MediaFile" && body[key]) {
      formData.append(key, {
        uri: body[key],
        type: "image/jpeg",
        name: "image.jpg",
      } as any);
    } else if (key === "MediaFiles" && Array.isArray(body[key])) {
      body[key].forEach((file: string) => {
        formData.append("MediaFiles", {
          uri: file,
          type: "image/jpeg",
          name: `image.jpg`,
        } as any);
      });
    } else if (typeof body[key] === "object") {
      Object.keys(body[key]).forEach((subKey) => {

        console.log('key', key);
        console.log('subKey', subKey);
        if (key.split('.').pop() === "FileSrcs") {
          formData.append(`${key}`, body[key][subKey]);
        } else {
          formData.append(`${key}.${subKey}`, body[key][subKey]);
        }
      });
    }
    // if (/FileSrcs\.\d+$/.test(key)) {
    //   formData.append(key.replace(/\.(\d+)$/, ''), body[key]);
    // }
    else {
      formData.append(key, body[key]);
    }
  });

  return formData;
};
