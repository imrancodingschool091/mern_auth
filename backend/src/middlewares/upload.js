import multer from "multer";
import path from "path";
import { fileURLToPath } from 'url';

// Fix __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set absolute path to "public/tem" in root
const uploadDir = path.join(__dirname, '../../public/temp');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir); // upload to /public/tem
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname); // preserve original file extension
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

export const upload = multer({ storage });