import { User } from '../../DB/Models/Models.js';
// signup
export const createUser = async (req, res) => {
  try {
    const userData = req.body;
    const { email } = userData;
    const exists = await User.findOne({ where: { email } });
    if (exists) {
      return res.status(409).json({
        message: 'Email already exists'
      });
    }
    const user = User.build(userData);
    await user.save();
    res.status(201).json({
      message: 'User created successfully',
      user
    });
  } catch (error) {
    res.status(400).json({
      message: 'Validation error',
      error: error.message
    });
  }
};
// upsert user
export const upsertUser = async (req, res) => {
  try {
    const userData = req.body;
    const { id } = req.params;

    // Check if user exists
    const exists = await User.findByPk(id);

    if (exists) {
      // Update user (skip validation)
      await User.update(userData, { where: { id }, validate: false });

      return res.status(200).json({
        message: 'User updated or created successfully',
        user: { id, ...userData }
      });
    } else {
      // Create new user with specified id (skip validation)
      const user = await User.create({ id, ...userData }, { validate: false });

      return res.status(201).json({
        message: 'User created or updated successfully',
        user
      });
    }
  } catch (error) {
    res.status(400).json({
      message: 'Validation error',
      error: error.message
    });
  }
};
// get user by email
export const getuserbyemail = async (req,res)=>{
  try {
    const {email}=req.query;
    if(!email){
      return res.status(400).json({
        message:'Email is required'
      });
    }
    const user = await User.findOne({where:{email}})
    if(!user){
      return res.status(404).json({
        message:'no user found'
      });
    }
    res.status(200).json({
      message:'User found successfully',
      user
    });
  } catch (error) {
    res.status(500).json({
      message:'Internal server error',
      error: error.message
    });
  }
  }
  // get user by id
export const getuserbyid = async (req,res)=>{
  try {
    const {id}=req.params;
    if(!id){
      return res.status(400).json({
        message:'Id is required'
      });
    }
    const user = await User.findByPk(id,{
      attributes: { exclude: ['role'] }
    })
    if(!user){
      return res.status(404).json({
        message:'no user found'
      });
    }
    res.status(200).json({
      message:'User found successfully',
      user
    });
  } catch (error) {
    res.status(500).json({
      message:'Internal server error',
      error: error.message
    });
  }
  }
