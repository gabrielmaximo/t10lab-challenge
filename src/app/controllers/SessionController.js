import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import User from '../models/User';
import authConfig from '../../config/auth';

class SessionControler {
  async store(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(400).json({
        error: `Email ${email} não cadastrado!`,
      });
    }
    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Email e/ou Senha inválidos!' });
    }

    const { _id, name } = user;

    return res.json({
      user: { _id, name, email },
      token: jwt.sign({ id: _id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionControler();
