import { app } from './app';

const PORT = process.env.NODE_PORT_INTERNAL || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
