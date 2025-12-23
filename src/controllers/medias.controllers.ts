import { Request, Response } from 'express'
import formidable from 'formidable'
import path from 'path'
import HTTP_STATUS from '~/constants/httpStatus'

export const uploadSingleImageController = async (
  req: Request, //
  res: Response
) => {
  //tạo thằng formidable để parse (form data - dữ liệu từ form do client gửi lên)
  const form = formidable({
    uploadDir: path.resolve('uploads'),
    keepExtensions: true, //giữ lại đuôi file đc gửi lên
    maxFiles: 1,
    maxFileSize: 300 * 1024 //300kb
  })
  //parse dữ liệu  từ form của req do client gửi lên
  form.parse(req, (err, fields, files) => {
    if (err) {
      throw err
    } else {
      return res.status(HTTP_STATUS.OK).json({
        message: 'Upload image success',
        data: files
      })
    }
  })
}
