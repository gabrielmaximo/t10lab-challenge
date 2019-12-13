import app from './app';

app.listen(3333, () => {
  console.log(
    'App is running at http://%s:%d in %s mode',
    process.env.APP_HOST,
    process.env.APP_PORT,
    process.env.NODE_ENV
  );
});
