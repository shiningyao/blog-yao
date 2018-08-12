import { readFileSync } from 'fs';
import * as http from 'http';
import * as path from 'path';
import 'zone.js/dist/zone-node';
import 'reflect-metadata';

// server & middleware
import * as express from 'express';
import * as session from 'express-session';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import * as csrf from 'csurf';
const csrfProtection = csrf({ cookie: true });
import * as proxy from 'http-proxy-middleware';

// logging
import * as morgan from 'morgan';
import logger from './config/logging';

// angular & angular universal
import { enableProdMode } from '@angular/core';
import { ngExpressEngine } from '@nguniversal/express-engine';
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';

// universal app entry point & routes
const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('./dist-server/main');
const apiRoutes = require('./routes/article.js');

enableProdMode();

const app = express();
const port = 3000;

const logo = readFileSync(path.join(__dirname, '/src/banner.txt'));
const logoText = logo.toString();

let xsrfToken = '';

console.log(`%c${logoText}`, `color: #ff7a40`);

const apiProxy = proxy({
    target: 'http://localhost:8080',
    changeOrigin: true,
    cookieDomainRewrite: 'localhost',
    pathRewrite: {
        '^/api' : '/api'
    }
});

app.use(compression());
app.use(morgan('dev'));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    cookie: { secure: true },
    saveUninitialized: true
}));

const indexHtml = readFileSync(__dirname + '/dist/index.html', 'UTF-8');
const distFolder = __dirname + '/dist';

app.engine('html', ngExpressEngine({
    bootstrap: AppServerModuleNgFactory,
    providers: [provideModuleMap(LAZY_MODULE_MAP)]
}));

app.set('view engine', 'html');
app.set('views', distFolder);

app.get('*.*', express.static(distFolder, {
    maxAge: '1y'
}));

app.use('/api', apiProxy);
app.use('/api', apiRoutes);

app.get('*', (req, res) => {
    res.cookie('XSRF-TOKEN', xsrfToken);
    res.render('index', {req});
});

app.listen(port, () => {
    logger.info('Get csrfToken from api server.');
    const req = http.request({
        protocol: 'http:',
        hostname: 'localhost',
        port: 8080,
        path: '/api/query',
        method: 'HEAD',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }, (res) => {
        xsrfToken = res.headers['set-cookie'][0].split(';')[0].split('=')[1];
        logger.info(`Recieved CSRF token: ${xsrfToken}`);
    });
    req.end();
    console.log(`Server is stated on port ${port}.`);
});
