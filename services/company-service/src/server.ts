import app from './index';

const PORT = process.env.PORT || 4002;

app.listen(PORT, () => {
  console.log(`Company service running on port ${PORT}`);
});
