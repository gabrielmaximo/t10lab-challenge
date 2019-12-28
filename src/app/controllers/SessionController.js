import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import authConfig from '../../config/auth';

import User from '../models/User';

class SessionControler {
  async store(req, res) {
    const { email, password } = req.body;

    /** Busca pelo email (login) do usuário */
    const user = await User.findOne({ email }).select('+password');

    /** Se o email digitado não estiver cadastrado, ja informa o user que ele errou o email */
    if (!user) {
      return res.status(400).json({
        error: `Email ${email} does not exists!`,
      });
    }

    /** Caso o email exista, esse user errou a senha ou o email */
    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Email or password incorrect!' });
    }

    const { _id, name } = user;

    /** Antes de retornar eu injeto o id, o secret e a data de expiração do token */
    return res.json({
      user: { _id, name, email },
      token: jwt.sign({ id: _id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionControler();
