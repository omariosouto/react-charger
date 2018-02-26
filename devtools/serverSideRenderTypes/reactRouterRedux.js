// - fazer com duas rotas e uma sendo lazyLoaded: OK 
// - Fazer rota de 404: OK
// - Fazer teste de redirect pra Home: FALTOU
// - Fazer rota com autenticação que sempre da true (Tweets): FALTOU

// Node Stuff
import path from 'path'
require("require.async")(require);

// React Stuff
import React from 'react'
import { renderToString, renderToStaticMarkup } from 'react-dom/server';

// Router Stuff
import { StaticRouter, Route } from 'react-router-dom'
import Routes from '../../src/routes';

// Redux Stuff
import { configureStore } from '../../src/store'

// SSR Stuff
import htmlTemplate from './commons/htmlTemplate'
import initialDataResolver from './commons/initialDataResolver'

import Home from '../../src/pages/Home'

export default (request, response) => {
    console.log('SSR React com React Router e Redux')

    // Carregar a store no servidor
    const store = configureStore()
    const promises = []
    Home.componentInitialData().forEach((func) => {
        promises.push( Promise.resolve(store.dispatch(func())) )
    })

    Promise.all(promises)
            .then(() => {
                response.json(store.getState())
            })


}
