import { Request } from 'express'
import sharp from 'sharp'
import { UPLOAD_IMAGE_DIR } from '~/constants/dir'
import { getExtFromFileName, getNameFromFileName, handleUploadSingleImage, handleUploadSingleVideo } from '~/utils/file'
import fs from 'fs'
class MediasServices {
  //
  async uploadSingleImage(req: Request) {
    //xử lý file va lưu vào upload_image_temp
    const file = await handleUploadSingleImage(req) //sau khi mà tao lưu đc rồi
    const newFileName = getNameFromFileName(file.newFilename) + '.jpg'
    file.newFilename = newFileName
    const newPath = UPLOAD_IMAGE_DIR + '/' + newFileName //đổi tên lưu file
    //xử lý bằng sharp để nén file lại
    //nhận vào link dẫn đến file tạm cần xử lý
    const info = await sharp(file.filepath).jpeg().toFile(newPath)
    //xóa file trong temp đi
    fs.unlinkSync(file.filepath)
    return `http://localhost:3000/static/image/${newFileName}`
  }

  // async uploadSingleVideo(req: Request) {
  //   const file = await handleUploadSingleVideo(req) //sau khi mà tao lưu đc rồi
  //   const ext = getExtFromFileName(file.originalFilename as string)
  //   // fs.renameSync(file.filepath, file.filepath + '.' + ext)
  //   // file.newFilename = file.newFilename + '.' + ext
  //   return `http://localhost:3000/static/video/${file.newFilename}`
  // }

  async uploadSingleVideo(req: Request) {
    const file = await handleUploadSingleVideo(req) //sau khi mà tao lưu đc rồi
    const ext = getExtFromFileName(file.originalFilename as string)
    // fs.renameSync(file.filepath, file.filepath + '.' + ext)
    // file.newFilename = file.newFilename + '.' + ext
    return `http://localhost:3000/static/video/${file.newFilename}`
  }
}

const mediasServices = new MediasServices()
export default mediasServices
