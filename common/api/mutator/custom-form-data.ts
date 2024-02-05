export const customFormData = (
  body: Record<string, any>
): FormData => {
  const formData = new FormData();

  Object.keys(body).forEach(key => {
    if (key === 'MediaFile' && body[key]) {
      formData.append(key, {
        uri: body[key],
        type: "image/jpeg",
        name: "image.jpg",
      } as any);
    } else if (typeof body[key] === 'object') {
      Object.keys(body[key]).forEach(subKey => {
        formData.append(`${key}.${subKey}`, body[key][subKey]);
      });
    } else {
      formData.append(key, body[key]);
    }
  });

  return formData;
};

export default customFormData;