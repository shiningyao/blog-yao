import { enableProdMode } from '@angular/core';
import 'zone.js/dist/zone-node';
import 'reflect-metadata';
import { renderModuleFactory } from '@angular/platform-server';
import * as express from 'express';
import { readFileSync } from 'fs';
import { ngExpressEngine } from '@nguniversal/express-engine';
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';
import * as compression from 'compression';

const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('./dist-server/main');
const apiRoutes = require('./routes/article.js');

enableProdMode();

const app = express();
app.use(compression());

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

app.use('/api', apiRoutes);

app.get('*', (req, res) => {
    res.render('index', {req});
});

app.listen(3000, () => {
    console.log(`Server is stated on port 3000.`);
});
