import app from './index';

const PORT = process.env.PORT || 4001;

app.listen(PORT, () => {
  console.log(`User service running on port ${PORT}`);
});
