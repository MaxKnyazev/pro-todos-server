import { User } from './users.model.js';

class UsersServices {
  getAllUsers = async (req, res) => {
    try {
      const users = await User.findAll({
        raw: true,
      });
      
      return users;
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default new UsersServices();