import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      first_name: Yup.string().required(),
      last_name: Yup.string().required(),
      cpf: Yup.string()
        .length(11)
        .required(),
      address: Yup.string().required(),
      local_name: Yup.string().required(),
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
