import multer from "multer";

const storage = multer.diskStorage({
destination: function (req, file, cb) {
  cb(null, './public/temp')
  // cb(null, "");
},
filename: function (_req, file, cb) {
  cb(null, file.originalname)
}
})//cb==call back fnction 

export const upload = multer({ storage: storage });