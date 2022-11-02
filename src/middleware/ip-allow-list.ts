import { NextFunction, Request, Response } from 'express';
import { Netmask } from 'netmask';
import { logger } from '../services/logger-service';

const validIps = ['192.168.1.0/2', '127.0.0.1/32'];
export const ipCheck = (req: Request, res: Response, next: NextFunction) => {
  logger.info(`request ip is : ${req.ip}`);
  try {
    if (
      validIps.some((ip) => {
        const block = new Netmask(ip);
        return block.contains(req.ip);
      })
    ) {
      logger.info(`${req.ip} is whitelisted`);
      next();
    } else {
      logger.warn(`${req.ip} is blacklisted`);
      const err = new Error(`Bad IP: ${req.ip}`);
      res.status(401).send({ errors: [{ message: err.message }] });
    }
  } catch (error) {
    logger.error(`${error} is blacklisted`);
    next();
  }
};
