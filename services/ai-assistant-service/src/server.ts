import app from './index';

const PORT = process.env.PORT || 4006;

app.listen(PORT, () => {
  console.log(`AI Assistant service running on port ${PORT}`);
});
