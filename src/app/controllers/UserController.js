import sgMail from '@sendgrid/mail';

// Models
import User from '../models/User';

class UserController {
  async store(req, res) {
    const { email, name } = req.body;

    /** Verifica se o usuário a ser cadastrado ja existe */
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res
        .status(400)
        .json({ error: `Email: ${email} already been registered.` });
    }

    const { _id, created_at, updated_at } = await User.create(req.body);

    /** Email de boas vindas */
    sgMail.setApiKey(process.env.SENDGRID_KEY);

    const msg = {
      to: email,
      from: 'familia_maximo@hotmail.com',
      subject: 'Email de boas vindas',
      text: `Seja bem vindo ao reino ${name}!`,
    };

    await sgMail.send(msg);

    return res.status(201).json({ _id, name, email, created_at, updated_at });
  }
}

export default new UserController();
