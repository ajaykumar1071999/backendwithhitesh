import errorResponse from '../../utils/ApiError.js';
import response from '../../utils/ApiResponse.js';
import asyncHandler from '../../utils/AsyncHandler.js';
import User from '../../models/user.model.js';
import uploadToCloudinary from '../../utils/cloudinary.js';
import bcrypt from 'bcrypt';

const registerUser = asyncHandler(async (req, res) => {
  try {
    const { fullName, email, username, password } = req.body;
    const { avtar, coverImage } = req.files;

    const coverImagePath = coverImage
      ? coverImage[0].path.replace(/\\/g, '/')
      : null;
    const avtarPath = avtar ? avtar[0].path.replace(/\\/g, '/') : null;

    const requiredFields = {
      fullName,
      email,
      username,
      password,
      avtar,
      coverImage,
    };

    const missingFields = Object.entries(requiredFields)
      .filter(
        ([key, value]) => value === undefined || value === null || value === ''
      )
      .map(([key]) => key);

    if (missingFields.length > 0) {
      const message = `Please provide required fields: ${missingFields.join(', ')}`;
      return errorResponse(res, 400, message, missingFields);
    }

    const cloudinaryAvtar = await uploadToCloudinary(avtarPath);
    const cloudinaryCoverImage = await uploadToCloudinary(coverImagePath);

    if (!cloudinaryAvtar || !cloudinaryCoverImage) {
      return errorResponse(res, 500, 'Cloudinary upload failed', [
        'Cloudinary error',
      ]);
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    if (!hashedPassword) {
      return errorResponse(res, 500, 'Error hashing password', [
        'Hashing failed',
      ]);
    }

    const finalUser = {
      fullName,
      email,
      username,
      password: hashedPassword,
      avtar: cloudinaryAvtar?.url,
      coverImage: cloudinaryCoverImage?.url,
    };

    const existingUser = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (existingUser) {
      return errorResponse(res, 400, 'User already exist', [
        existingUser.username === username
          ? 'Username already taken'
          : 'Email already in use',
      ]);
    }

    const user = await User.create(finalUser);

    if (!user) {
      return errorResponse(res, 500, 'Error creating user', [
        'User creation failed',
      ]);
    }
    return response(res, 201, 'User registered successfully', {
      username,
      fullName,
      email,
      avtar: cloudinaryAvtar?.url,
      coverImage: cloudinaryCoverImage?.url,
    });
  } catch (error) {
    return errorResponse(
      res,
      500,
      'Something went wrong',
      [error.message],
      error.stack
    );
  }
});


export { registerUser };
