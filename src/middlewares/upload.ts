
import multer from 'multer';
import path from 'path';
import Jimp from 'jimp';



export default {
    storage: multer.diskStorage({
        destination: async (req, file, cb) => {
            const save = path.resolve(__dirname, '..', '..', 'public')
            cb(null, save);
        },
        filename: (req, file, cb) => {
            const ext = path.extname(file.originalname);
            const name = path.basename(file.originalname, ext);

            cb(null, `${name}-${Date.now()}${ext}`);
        },
    }),
};