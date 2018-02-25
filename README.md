# React Charger
É uma solução de SSR (Server Side Render) criada como um enhancer do create-react-app.

A ideia é você precisar do mínimo de configuração possível para ter uma aplicação que faz server side render, tanto para propostas.

# E como isso tudo funciona?
Este projeto inclui inicialmente 3 formas de Server Side Render sendo elas:

- react
- reactRouter
- reactRouterRedux

Para alternar entre as formas, tudo o que você precisa fazer é no seu arquivo package.json, alterar o valor da chave `"ssr"` assim:

```js
{
  "ssr": "react|reactRouter|reactRouterRedux",
  ...
}
```

# Como usar?
## Desenvolvimento (porta 3000)
Enquanto estiver desenvolvendo sua aplicação, recomendamos que use:
```js
npm run dev
```
> Este modo de desenvolvimento usa todos os recursos nativos do create-react-app (inclusive o recurso de code-split), caso você queira adicionar outros recursos como o `css-modules`, terá que fazer a sua configuração por conta própria.

## Produção (local porta 4600)
Sempre que for rodar os comandos: `npm start` ou `npm start:dev`, é necessário que o `npm run build` seja rodado previamente.

