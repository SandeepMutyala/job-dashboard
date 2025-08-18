import app from './index';

const PORT = process.env.PORT || 4003;

app.listen(PORT, () => {
  console.log(`Job service running on port ${PORT}`);
});
