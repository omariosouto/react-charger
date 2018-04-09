# React Charger

# [DEPRECATED]
- Yse omariosouto/react-charger-razzle instead: https://github.com/omariosouto/react-charger-razzle

Fazer SSR é uma tarefa normalmente meio sofrida, cada lib que voc adiciona na sua app, pode precisar de uma configuração bizonha. Uma das ideias dessa ferramenta, é que seja possível não ter mais tanta dor de cabeça com isso, oferecendo soluções prontas que podem ser usadas dado alguns exemplos de estrutura da sua app (Usando React ou React com React Router e afins).
É uma solução de SSR (Server Side Render) criada como um adicional em cima do create-react-app.

A ideia é você precisar do mínimo de configuração possível para ter uma aplicação que faz Server Side Render.

# E como isso tudo funciona?
Este projeto inclui inicialmente 3 formas de Server Side Render sendo elas:

- react
- reactRouter
- reactRouterRedux

# E como usar?
Atualmente o projeto não possui uma forma sofisticada para ser utilizado (por isso eu preciso que pessoas testem e me deem feedbacks de como seria mais legal, atualmente imagino que uma CLI ajudaria bastante)

## Passo a passo
- Você deve iniciar sua aplicação com o **create-react-app** normalmente;
- Feito isso, você deve clonar este projeto `git clone https://github.com/omariosouto/react-charger.git` ou **fazer download de um zip em uma pasta separada do seu projeto**;
- Após ter feito o download você deve copiar os seguintes arquivos/pastas:
  * .babelrc (Lembre-se que este arquivo pode estar oculto);
  * package.json (Sim, por enquanto copia e cola ele, se tiver um projeto em andamento toma cuidado);
  * ./devtools (É uma pasta, pode copiar ela inteira);

- Depois de pegar esses 3 caras, cole-os na raíz do projeto iniciado com o create-react-app
- O último passo é adicionar essa linha no seu **`src/index.js`** assim:
```js
window.__initialData__ = window.__initialData__ || {} 
```
- (Se você quiser suporte para Router ou Redux, será necessário se basear no arquivo index de uma das opções da sessão "Escolhendo o modelo de server render")
    </Provider>
- Qualquer problema que você tiver no processo, abre uma issue que a gente resolve :) 


## Escolhendo o modelo de server render:
A ideia é ter o minimo de configuração possível, para ajudar nisso o projeto já conta com 3 modelos de pasta `/src` que você pode usar para testar como fazer o SSR, sendo elas:

- [React Puro](https://github.com/omariosouto/react-charger/tree/master/src_react): (Deixe o valor ssr do package.json assim:  `"ssr":"react"`)
- [React com Router](https://github.com/omariosouto/react-charger/tree/master/src_reactRouter): (Deixe o valor ssr do package.json assim:  `"ssr":"reactRouter"`)
- [React com Router e Redux](https://github.com/omariosouto/react-charger/tree/master/src): (Deixe o valor ssr do package.json assim:  `"ssr":"reactRouterRedux"`)


## Comandos para rodar o projeto

- `npm run dev`: É equivalente ao npm start do create-react-app, em localhost roda na porta **3000**
- `npm run start`: É o comando para colocar o projeto em produção, em localhost roda na porta **4600** (SEMPRE ANTES DELE DEVE SER RODADO UM `npm run build`)
- `npm run start:dev`: É o comando para testar alguma coisa que você queira alterar na configuração do SSR que fica dentro da pasta `devtools/serverSideRenderTypes` (SEMPRE ANTES DELE DEVE SER RODADO UM `npm run build`)




