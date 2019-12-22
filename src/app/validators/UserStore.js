import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().required(),
      password: Yup.string().required(),
      confirmPassword: Yup.string()
        .required()
        .oneOf([Yup.ref('password')]),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (error) {
    return res.status(400).json({
      erro: 'Validation Error! Invalid JSON body.',
      messages: error.inner.map(err => {
        return {
          path: err.path,
          value: err.value,
          type: err.type,
          message: err.message,
        };
      }),
    });
  }
};
