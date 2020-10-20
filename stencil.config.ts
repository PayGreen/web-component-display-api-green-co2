import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';

export const config: Config = {
    namespace: 'web-component-display-api-green-co2',
    outputTargets: [
        {
            type: 'dist',
            esmLoaderPath: '../loader',
        },
        {    
            type: 'dist-custom-elements-bundle'
        },
        {
            type: 'docs-readme',
        },
        {
            type: 'www',
            serviceWorker: null, // disable service workers
        },
    ],
    plugins: [sass()],
};
