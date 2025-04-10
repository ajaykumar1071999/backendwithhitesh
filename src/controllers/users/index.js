import response from '../../utils/ApiResponse.js';
import asyncHandler from '../../utils/AsyncHandler.js';

const registerUser = asyncHandler(async (req, res) => {
  res
    .status(200)
    .json(response(200, 'All working fine', { name: 'Ajay umar' }));
});

export { registerUser };
