import express from 'express';
import 'dotenv/config';
import { connectToDB } from './db/index.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bcrypt from 'bcrypt';
import uploadToCloudinary from './utils/cloudinary.js';
import { upload } from './middlewares/fileUpload/index.js';
import userRouter from './routes/users/index.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json({ limit: '20kb' }));
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.urlencoded({ extends: true, limit: '20kb' }));
app.use(express.static('public'));

connectToDB();

app.use('/api/v1/users', userRouter);

app.post('/start', upload.single('avtar_image'), async (req, res) => {
  const avtar_image = req.file;
  if (!avtar_image) {
    return res
      .status(404)
      .send({ statusCode: 404, message: 'Please send file' });
  }
  const image = await uploadToCloudinary(avtar_image);
  if (!image) {
    return res
      .status(500)
      .send({ statusCode: 500, message: 'Something issue while file upload' });
  }
  const { url, format, created_at, original_filename } = image;
  res.status(200).send({
    statusCode: 200,
    message: 'Server is running ',
    data: { avtar_image: { url, format, created_at, original_filename } },
  });
});

// async function createPasswordHash(password) {
//   try {
//     const saltRounds = 10;
//     const hashedPassword = await bcrypt.hash(password, saltRounds);
//     console.log('Hashed Password:', hashedPassword);
//     return hashedPassword;
//   } catch (error) {
//     console.error('Error hashing password:', error);
//   }
// }

// // Example usage
// const password = 'mySecurePassword123';
// createPasswordHash(password);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
