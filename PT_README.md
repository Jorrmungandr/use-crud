Language: [English](README.md) | [Português](PT_README.md) 

# TSDX React Guia do usuário

Parabéns! Você acabou de economizar horas de trabalho inicializando este projeto com TSDX. Vamos orientar você sobre o que está aqui e como usá-lo.

> Esta configuração TSDX destina-se ao desenvolvimento de bibliotecas de componentes React (não aplicativos!) Que podem ser publicadas no NPM. Se você está procurando construir um aplicativo baseado em React, você deve usar `create-react-app`, `razzle`, `nextjs`, `gatsby`, ou `react-static`.

> Se você é novo no TypeScript e no React, confira [esta folha de cheats acessível](https://github.com/sw-yx/react-typescript-cheatsheet/)

## Comandos

TSDX andaime sua nova biblioteca dentro `/src`, e também configura um [Baseado em encomendas](https://parceljs.org) playground para dentro `/example`.

O fluxo de trabalho recomendado é executar TSDX em um terminal:

```bash
npm start # or yarn start
```

Isso constrói para `/dist` e executa o projeto no modo de observação para que qualquer edição que você salve dentro `src` causa uma reconstrução para `/dist`.

Em seguida, execute o exemplo dentro de outro:

```bash
cd example
npm i # or yarn to install dependencies
npm start # or yarn start
```

O exemplo padrão importa e recarrega tudo o que está em `/dist`, portanto, se você estiver vendo um componente desatualizado, certifique-se de que o TSDX esteja executando no modo de relógio, como recomendamos acima. **No symlinking required**, nós usamos [Aliasing de Parcel](https://parceljs.org/module_resolution.html#aliases).

Para fazer uma construção única, use `npm run build` or `yarn build`.

Para executar testes, use `npm test` ou `yarn test`.

## Configurações

A qualidade do código é configurada para você com `mais bonito`,` husky` e `lint-staged`. Ajuste os respectivos campos em `package.json` de acordo.

### Jest

Os testes de Jest são configurados para serem executados com `npm test` ou` yarn test`.

### Análise de pacote

Calcula o custo real de sua biblioteca usando [size-limit] (https://github.com/ai/size-limit) com `npm run size` e visualiza-o com` npm run analyze`.

#### Arquivos de configuração

Esta é a estrutura de pastas que configuramos para você:

```txt
/example
  index.html
  index.tsx       # teste seus componentes no demo app
  package.json
  tsconfig.json
/src
  index.tsx       # EDITE ISSO
/test
  blah.test.tsx   # EDITE ISSO
.gitignore
package.json
README.md         # EDITE ISSO
tsconfig.json
```

#### Biblioteca de teste do React

Ainda não configuramos a `react-testing-library` para você, agradecemos contribuições e documentação sobre isso.

### Rolar

TSDX usa [Rollup] (https://rollupjs.org) como um bundler e gera várias configurações de rollup para vários formatos de módulo e configurações de compilação. Consulte [Otimizações] (# otimizações) para obter detalhes.

### TypeScript

`tsconfig.json` é configurado para interpretar os tipos` dom` e ʻesnext`, bem como `react` para` jsx`. Ajuste de acordo com suas necessidades.

## Integração contínua

### GitHub Actions

Duas ações são adicionadas por padrão:

- `main` que instala deps com cache, lints, testa e constrói em todos os empurra contra uma matriz de Nó e SO
- `size` que comenta a comparação de custo de sua biblioteca em cada solicitação pull usando [` size-limit`] (https://github.com/ai/size-limit)

## Otimizações

Por favor, consulte os principais `tsdx` [documentos de otimizações] (https://github.com/palmerhq/tsdx#optimizations). Em particular, saiba que você pode aproveitar as vantagens das otimizações apenas para desenvolvimento:

```js
// ./types/index.d.ts
declare var __DEV__: boolean;

// inside your code...
if (__DEV__) {
  console.log('foo');
}
```

Você também pode escolher instalar e usar as funções [invariante] (https://github.com/palmerhq/tsdx#invariant) e [aviso] (https://github.com/palmerhq/tsdx#warning).

## Formatos de Módulo

Os formatos de módulo CJS, ESModules e UMD são suportados.

Os caminhos apropriados são configurados em `package.json` e` dist / index.js` de acordo. Por favor, relate se algum problema for encontrado.

## Implantando o Playground de exemplo

O Playground é apenas um aplicativo [Parcel] (https://parceljs.org) simples, você pode implantá-lo em qualquer lugar em que normalmente o implantaria. Aqui estão algumas diretrizes para implantação ** manualmente ** com o CLI Netlify (`npm i -g netlify-cli`):

```bash
cd example # if not already in the example folder
npm run build # builds to dist
netlify deploy # deploy the dist folder
```

Como alternativa, se você já tem um repo git conectado, pode configurar a implantação contínua com o Netlify:

```bash
netlify init
# build command: yarn build && cd example && yarn && yarn build
# directory to deploy: example/dist
# pick yes for netlify.toml
```

## Exportações Nomeadas

De acordo com as diretrizes do Palmer Group, [sempre use exportações nomeadas.] (Https://github.com/palmerhq/typescript#exports) Código dividido dentro de seu aplicativo React em vez de sua biblioteca React.

## Incluindo Estilos

Existem muitas maneiras de enviar estilos, incluindo CSS-in-JS. TSDX não tem opinião sobre isso, configure como quiser.

Para o CSS vanilla, você pode incluí-lo no diretório raiz e adicioná-lo à seção `files` em seu` package.json`, para que possa ser importado separadamente por seus usuários e executado através do carregador de bundler.

## Publicando para NPM

Recomendamos usar [np] (https://github.com/sindresorhus/np).

## Uso com Lerna

Ao criar um novo pacote com TSDX dentro de um projeto configurado com Lerna, você pode encontrar um erro `Não é possível resolver a dependência` ao tentar executar o projeto ʻexample`. Para consertar isso, você precisará fazer alterações no arquivo `package.json` _dentro do diretório ʻexample`_.

O problema é que devido à natureza de como as dependências são instaladas nos projetos Lerna, os apelidos no `package.json` do projeto de exemplo podem não apontar para o lugar certo, já que essas dependências podem ter sido instaladas na raiz do seu projeto Lerna .

Mude o ʻalias` para apontar para onde esses pacotes estão realmente instalados. Isso depende da estrutura de diretório do seu projeto Lerna, então o caminho real pode ser diferente do diff abaixo.

```diff
   "alias": {
-    "react": "../node_modules/react",
-    "react-dom": "../node_modules/react-dom"
+    "react": "../../../node_modules/react",
+    "react-dom": "../../../node_modules/react-dom"
   },
```

Uma alternativa para corrigir esse problema seria remover todos os aliases e definir as dependências referenciadas como aliases como dependências de desenvolvimento. [No entanto, isso pode causar outros problemas.] (Https://github.com/palmerhq/tsdx/issues/64)
