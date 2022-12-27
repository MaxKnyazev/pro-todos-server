import { User } from '../users/users.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

class AuthServices {
  registration = async (email, password) => {
    try {
      const candidate = await User.findOne({
        where: {
          email
        }
      })

      if (candidate) {
        return {
          error: 'Пользователь с таким email уже существует'
        }
      }

      const hashPassword = bcrypt.hashSync(password, 10);

      const user = await User.create({
        email,
        password: hashPassword,
        role: 'user',
      });
      
      const {password: _password, ...userWithoutPassword} = user.dataValues;

      return userWithoutPassword;
    } catch (error) {
      throw new Error(error);
    }
  }

  login = async (email, password) => {
    try {
      const user = await User.findOne({
        where: {
          email
        }
      })
      
      if (!user) {
        return {
          error: 'Пользователя с таким email не существует',
        }
      }

      const validPassword = bcrypt.compareSync(password, user.dataValues.password);

      if (!validPassword) {
        return {
          error: 'Email или пароль неверный',
        }
      }
      
      const accessToken = jwt.sign({
        id: user.dataValues.users_id,
        email: user.dataValues.email,
      }, process.env.SECRET_KEY, {
        // expiresIn: '1d',
        expiresIn: '30m'
      });
      
      const {password: _password, ...userWithoutPassword} = user.dataValues;

      userWithoutPassword.accessToken = accessToken;

      return userWithoutPassword;
    } catch (error) {
      throw new Error(error);
    }
  }

  confirm = async (accessToken) => {
    const decodedUser = jwt.verify(accessToken, process.env.SECRET_KEY);
    console.log('AuthServices -> currentUser -> decodedUser —------------------');
    console.log(decodedUser);
    
    const { email } = decodedUser;
    
    const resultUser = await User.findOne({
      where: {
        email,
      },
    });
    
    console.log(resultUser);
    
    if (!resultUser) {
      return {
        error: `Пользователя с таким email не существует`,
      }
    }
    
    const freshAccessToken = jwt.sign(
      {
        id: resultUser.dataValues.users_id,
        email: resultUser.dataValues.email
      },
        process.env.SECRET_KEY,
      {
        expiresIn: '30m'
        // expiresIn: '1d'
      }
    );

    const {password: _password, ...userWithoutPassword} = resultUser.dataValues;
    userWithoutPassword.accessToken = freshAccessToken;
    
    return userWithoutPassword
  }
}

export default new AuthServices();