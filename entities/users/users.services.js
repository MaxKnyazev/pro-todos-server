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

  deleteUser = async (id) => {
    try {
      const countDeletedUsers = await User.destroy({
        where: {
          users_id: id
        }
      });

      if (!countDeletedUsers) {
        return {
          error: `Пользователь с id = ${id} не найден!`
        }
      }
      
      let message = `Пользователь с id = ${id} успешно удален!`;
      return {
        message,
        id
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  editUser = async ({id, role}) => {
    try {
      await User.update(
        {
          role,
        },

        {
          where: {
            users_id: id
          }
        }
      )
      
      const editedUser = await User.findOne({
        where: {
          users_id: id
        }}
      )

      return editedUser;
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default new UsersServices();