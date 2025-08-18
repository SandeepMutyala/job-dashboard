import app from './index';

const PORT = process.env.PORT || 4005;

app.listen(PORT, () => {
  console.log(`Notification service running on port ${PORT}`);
});
