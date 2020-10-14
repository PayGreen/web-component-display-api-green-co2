import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';

export const config: Config = {
    namespace: 'web-component-display-api-green-co2',
    taskQueue: 'async',
    buildEs5:true,
    outputTargets: [
        {
            type: 'dist',
            esmLoaderPath: '../loader',
        },
        {
            type: 'docs-readme',
        },
        {    type: 'dist-custom-elements-bundle'},
        {
            type: 'www',
            serviceWorker: null, // disable service workers
        },
    ],
    plugins: [sass()],
};
