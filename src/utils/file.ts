//file này dùng để xử lý file
import path from 'path'
import fs from 'fs' //file system(xử lý file | xóa | thêm | tìm)
import { UPLOAD_IMAGE_TEMP_DIR, UPLOAD_VIDEO_DIR } from '~/constants/dir'
import { Request } from 'express'
import formidable, { File } from 'formidable'
export const initFolder = () => {
  //không có thì mới cần tạo
  //   if (!fs.existsSync(UPLOAD_IMAGE_TEMP_DIR)) {
  //     fs.mkdirSync(UPLOAD_IMAGE_TEMP_DIR, { recursive: true })
  //   }
  ;[UPLOAD_IMAGE_TEMP_DIR, UPLOAD_VIDEO_DIR].forEach((dir) => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
  })
}

export const handleUploadSingleImage = async (req: Request) => {
  //nhận req từ express
  //tạo thằng formidable để parse (form data - dữ liệu từ form do client gửi lên)
  const form = formidable({
    uploadDir: path.resolve(UPLOAD_IMAGE_TEMP_DIR),
    keepExtensions: true, //giữ lại đuôi file đc gửi lên
    maxFiles: 1,
    maxFileSize: 300 * 1024, //300kb
    //thêm 1 hàm kiểm tra
    filter: function ({ name, originalFilename, mimetype }) {
      //điều kiện để valid
      const valid = name === 'image' && Boolean(mimetype?.includes('image/'))
      if (!valid) {
        form.emit('error' as any, new Error('Not File Type') as any)
      }
      //nếu oke
      return valid //hiện tại là true, còn false là kẹt ở trên rồi
    }
  })
  //parse dữ liệu  từ form của req do client gửi lên
  return new Promise<File>((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) {
        return reject(err)
      }
      if (!files.image) {
        return reject(new Error('Image is empty'))
      }
      return resolve(files.image[0] as File)
    })
  })
}

export const getNameFromFileName = (filename: string) => {
  const nameArr = filename.split('.')
  nameArr.pop()
  return nameArr.join('.')
}

export const getExtFromFileName = (filename: string) => {
  const nameArr = filename.split('.')
  return nameArr.pop()
}
//abc.asdfa.asdf.png 4:1 jpg
//abc.asdfa.asdf.jpg

export const handleUploadSingleVideo = async (req: Request) => {
  //nhận req từ express
  //tạo thằng formidable để parse (form data - dữ liệu từ form do client gửi lên)
  const form = formidable({
    uploadDir: path.resolve(UPLOAD_VIDEO_DIR),
    keepExtensions: true, //giữ lại đuôi file đc gửi lên
    maxFiles: 1,
    maxFileSize: 300 * 1024 * 1024, //300MB
    //thêm 1 hàm kiểm tra
    filter: function ({ name, originalFilename, mimetype }) {
      //điều kiện để valid
      const valid = name === 'video' && Boolean(mimetype?.includes('video/'))
      if (!valid) {
        form.emit('error' as any, new Error('Not File Type') as any)
      }
      //nếu oke
      return valid //hiện tại là true, còn false là kẹt ở trên rồi
    }
  })
  //parse dữ liệu  từ form của req do client gửi lên
  return new Promise<File>((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) {
        return reject(err)
      }
      if (!files.video) {
        return reject(new Error('Video is empty'))
      }
      return resolve(files.video[0] as File)
    })
  })
}
