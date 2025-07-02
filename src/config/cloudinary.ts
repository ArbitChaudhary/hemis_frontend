interface IUpload {
  image: File | File[] | null
}

const url = 'https://api.cloudinary.com/v1_1/dsc65mxay/image/upload'

export const upload = async ({ image }: IUpload) => {
  if (!image) {
    throw new Error('No image uploaded')
  }
  const formData = new FormData()

  const file = Array.isArray(image) ? image[0] : image
  formData.append('file', file)
  formData.append('upload_preset', 'hemis_preset')
  const response = await fetch(url, {
    method: 'POST',
    body: formData,
  })
  const data = await response.json()
  return data.secure_url
}
