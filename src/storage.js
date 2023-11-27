import multer from "multer";

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + ".webp")
        req.fileName = uniqueSuffix + ".webp";
    },
});

export const upload = multer({storage: storage});