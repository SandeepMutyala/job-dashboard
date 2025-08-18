import app from './index';

const PORT = process.env.PORT || 4004;

app.listen(PORT, () => {
  console.log(`Application service running on port ${PORT}`);
});
