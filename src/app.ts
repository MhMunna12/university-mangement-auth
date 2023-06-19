import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';

import globalErrorHandler from './app/middlewares/globalErrorHandler';
import router from './app/routes/index';
import httpStatus from 'http-status';

const app: Application = express();

//cors
app.use(cors());
//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//application routes
app.use('/api/v1/', router);

// app.get('/', async (req: Request, res: Response) => {
//   res.send('Hello World!')
// })

//handle global error
app.use(globalErrorHandler);

//handle not found
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not found',
    errorMessage: [
      {
        path: req.originalUrl,
        message: 'Api Not found',
      },
    ],
  });
  next();
});
export default app;
