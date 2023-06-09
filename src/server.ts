import express from 'express';
import bodyParser from 'body-parser';
import orderRoutes from './handlers/orders';
import productRoutes from './handlers/products';
import userRoutes from './handlers/users';

const app: express.Application = express();
const address = '0.0.0.0:3000';

app.use(bodyParser.json());

orderRoutes(app);
productRoutes(app);
userRoutes(app);

app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});

export default app;
