import express from 'express';
import compression from 'compression';
import { fileURLToPath } from 'url';
import { dirname, sep } from 'path';

import { router } from './routes/routes.js';

const app = express();

app.use(compression());
app.disable('x-powered-by');

// TODO 1: Add middleware so req.body works for POST forms
app.use(express.urlencoded({ extended: true }));

// Config (so we can serve static files reliably)
const __dirname = dirname(fileURLToPath(import.meta.url)) + sep;
const cfg = {
  port: process.env.PORT || 3000,
  dir: {
    static: __dirname + 'static' + sep,
    views: __dirname + 'views' + sep
  }
};

// EJS setup
app.set('view engine', 'ejs');
app.set('views', cfg.dir.views);

// Static files (CSS)
app.use(express.static(cfg.dir.static));

// Routes
app.use('/', router);

app.listen(cfg.port, () => {
  console.log(`Server running at http://localhost:${cfg.port}`);
});

export default app;