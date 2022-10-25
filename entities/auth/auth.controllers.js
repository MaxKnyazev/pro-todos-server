import authServices from './auth.services.js';

class AuthControllers {
  registration = async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await authServices.registration(email, password);

      if (user.error) {
        return res.status(400).json({
          error: user.error,
        })
      }
      
      return res.status(200).json({
        user,
        error: null,
      })
    } catch (error) {
      return res.status(500).json({
        error: error.message,
      })
    }
  }

  login = async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email) {
        return res.status(400).json({
          error: 'Email не передан!',
        })
      }

      if (!password) {
        return res.status(400).json({
          error: 'Пароль не передан!',
        })
      }

      const user = await authServices.login(email, password);

      if (user.error) {
        return res.status(400).json({
          error: user.error,
        })
      }
      
      return res.status(200).json({
        user,
        error: null,
      })
    } catch (error) {
      return res.status(500).json({
        error: error.message,
      })
    }
  }

  confirm = async (req, res) => {
    try {
      const accessToken = req.headers.authorization.split(' ')[1];
      
      if (!accessToken) {
        return res.status(401).json({
          error: 'Authorization error: Access token not provided',
        });
      }

      const user = await authServices.confirm(accessToken);

      if (user.error) {
        return res.status(400).json({
          error: user.error,
        })
      }

      return res.status(200).json({
        user,
        error: null
      });

    } catch (error) {
      return res.status(500).json({error})
    }
  }
}

export default new AuthControllers();