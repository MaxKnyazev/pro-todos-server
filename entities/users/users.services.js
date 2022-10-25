import { User } from './users.model.js';

class UsersServices {
  getAllUsers = async () => {
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