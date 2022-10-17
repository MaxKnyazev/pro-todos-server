import usersServices from './users.services.js';

class UsersControllers {
  getAllUsers = async (req, res) => {
    try {
      const users = await usersServices.getAllUsers();
      
      return res.status(200).json({
        users,
        error: null,
      })
    } catch (error) {
      return res.status(500).json({
        error: error.message,
      })
    }
  }
}

export default new UsersControllers();