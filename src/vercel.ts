// vercel.ts
import { ServerResponse, IncomingMessage } from 'http';
import express from 'express';

export const handler = (app: express.Application) => {
  return (req: IncomingMessage, res: ServerResponse) => {
    const server = require('http').createServer(app);
    server.emit('request', req, res);
  };
};
