import Router from 'express';
import { registerUser } from '../../controllers/users/index.js';
import { upload } from '../../middlewares/fileUpload/index.js';
const router = Router();

router.route('/register').post(
  upload.fields([
    { name: 'avtar', maxCount: 1 },
    { name: 'coverImage', maxCount: 1 },
  ]),
  registerUser
);

export default router;
