import express, { Application, Request, Response } from 'express'
import bodyParser from 'body-parser'
import product_routes from './handlers/product';
import user_routes from './handlers/user';
import order_routes from './handlers/order';

const app: Application = express();
let port = 3000;
if (process.env.ENV === 'test') {
  port = 3001;
}
const server = `127.0.0.1:${port}`;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', (req: Request, res: Response) => {
  res.status(200).send('<h1>Working Successfully</h1>')
});
product_routes(app);
user_routes(app);
order_routes(app);

app.listen(3000, function () {
    console.log(`starting app on: ${server}`)
})

export default app;