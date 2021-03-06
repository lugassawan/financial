const express = require('express');
const router = express.Router();
const { basePath } = require('../helpers');
const fs = require('fs');
// config
const config = require('config');
const localDevMode = config.get('localDevMode');
const debug = config.get('debug');

router.get('/', (req, res) => {
    const data = {
        csrfToken: req.csrfToken ? req.csrfToken() : '',
        debug,
        localDevMode,
        assetHost: config.get('devServer.enable')
            ? config.get('devServer.hostname')
            : '',
    };
    const legacy = req.query.hasOwnProperty('legacy');

    if (!legacy) {
        res.render('responsive', data);
    } else {
        fs.readFile(
            basePath(
                `${
                    localDevMode ? 'sources/desktop' : 'public'
                }/microloader.html`,
            ),
            (err, microloader) => {
                res.render(
                    'desktop',
                    Object.assign(
                        {
                            theme: 'triton',
                            bootstrapScript: String(microloader),
                        },
                        data,
                    ),
                );
            },
        );
    }
});

module.exports = router;
