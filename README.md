# Angular: Testes automatizados com Jasmine e Karma

Curso da plataforma Alura

Instrutor: **Flavio Henrique de Souza Almeida**

Nesse curso serão apresentados os fundamentos de teste automatizado.

## 🛠️ Abrir e rodar o projeto

- Clone o projeto
- Rode o comando `npm start`  a aplicação
- Rode o comando `npm run test` para rodar os testes

## ✔️ Técnicas e tecnologias utilizadas

### Aula 1

- A função **describe** recebe dois parâmetros. O primeiro é uma descrição do artefato que queremos testar e o segundo é uma função.
- **Jasmine** recomenda a estrutura `"Should... when..."` na descrição dos testes com a função `it`.
- A função `expect` recebe como primeiro parâmetro o valor que desejamos comparar com o valor esperado.
- Criar um arquivo de teste com o mesmo nome do componente que será testado.
- Estrutura

```jsx
describe('O artefato que queremos testar', () => {
  it('Primeira condição que queremos testar', () => {

  });

  it('Segunda condição que queremos testar', () => {

  });
});
```

- Rodar os testes com **Karma**

    ```
    npm run test
    ```

- Blindar o código contra alguma refatoração

    ```tsx
    describe(UniqueIdService.name, () => {
      it(`#${UniqueIdService.prototype.generateUniqueIdWithPrefix.name} should generate id when called with prefix`, () => {
        const service = new UniqueIdService();
        const id = service.generateUniqueIdWithPrefix('app');
        expect(id).toContain('app-');
      });
    });

    ```

### Aula 2

- Karma executa os testes de forma aleatória
- Ao invés de criar uma instância em cada teste, podemos usar a função `beforeEach` que será executada a cada teste.  `beforeEach` tem como papel principal garantir que cada chamada à função it tenha seu próprio conjunto de dados de testes.

    ```tsx
    let service: UniqueIdService;
      beforeEach(() => {
        service = new UniqueIdService();
      });
    ```

- `withContext` a função que nos permite definir um contexto para nossas expectativas. Usado quando testamos valores em loop e queremos saber qual  desses valores falhou

```tsx
expect(true).toBeTrue(); -> Só testa se o valor é verdadeiro, o valor tem que ser literal, não aceita objeto

expect(true).toBe(true); -> Compara se um valor é igual ao outro. Se compara um valor literal com um objeto eles são diferentes

expect(new Boolean()).toBe(new Boolean()); -> são diferentes, pois a referência é diferente, eles estão apontando para diferente endereço de memória.

expect(true).toBeTruthy(); -> é o mais genérico
```

### Aula 3

- O atributo `aria-live` é utilizado quando mudamos o conteúdo de algum elemento dinamicamente e queremos que o novo valor seja anunciado através de **screen readers**.
- Já o atributo `aria-atomic` indica para o **screen reader** se ele deve anunciar apenas o conteúdo que mudou dinamicamente de uma **live area** ou se deve anunciar todo o conteúdo.
- Permitir que o elemento seja descrito pelo elemento cujo o ID foi atribuído à propriedade `aria-describedby`.

### Aula 4

- `TestBed` : É uma ferramenta criada pela equipe do Angular para criar módulos de testes nos quais o componente que queremos testar deve fazer parte.
- O método `TestBed.createComponent` retorna uma instância de `ComponentFixture`.
- O método `TestBed.createComponent` recebe como parâmetro a classe do componente que desejamos instanciar.
- `TestBed.configureTestingModule` podemos importar apenas o módulo do componente que estamos testando.
    - Test First

    ```jsx
    await TestBed.configureTestingModule({
          imports: [FontAwesomeModule],
          declarations: [ LikeWidgetComponent ],
          providers: [UniqueIdService]
        })
    ```

    - Outra abordagem

    ```jsx
    await TestBed.configureTestingModule({
          imports: [LikeWidgetModule]
        })
    ```

- É possível tornar a detecção de mudanças automática em nossos testes, apenas da equipe do Angular não recomendá-la.
- Por padrão, a detecção de mudanças de um componente não é disparada automaticamente ao executarmos nossos testes. É preciso que o desenvolvedor faça essa detecção manualmente.

    ```jsx
    providers: [{provide:ComponentFixtureAutoDetect, useValue: true}]

    ou chamar manualmente

    fixture.detectChanges();
    ```

- Se for passado o `detectChanges` no `beforeEach` não teremos chance de alterar alguma input property para realizar o teste.
- A função `it`, quando recebe um parâmetro geralmente chamado `done`, este parâmetro é uma referência para uma função que sinaliza para o teste que ele terminou. É importante que o desenvolvedor chame a função `done` no momento em que achar adequado, caso contrário o teste nunca terminará e um erro de timeout será disparado.

```jsx
it(`#${LikeWidgetComponent.prototype.like.name}
    should trigger emission when called`, done => {
      fixture.detectChanges();
      component.liked.subscribe(() => {
        expect(true).toBeTrue();
        done();
      });
      component.like();
  });
```

- Uma outra abordagem para testar se o método foi chamado ou não.
    - O `spy` vai possuir  um método, por exemplo o `emit`, mas pra quando o `emit` for chamado, quem vai ser chamado é o `spy` e o `spy` por debaixo dos panos vai guardar uma referência por um `emit` original.
    - Então entre a chamada do `spy` que agora é o meu `emit` e o `emit` verdadeiro, tem um meio de campo que o `spy` vai avisar o Jasmine, vai levantar uma flag dizendo que esse método foi o que? Foi chamado.

    ```jsx
    it(`#${LikeWidgetComponent.prototype.like.name}
        should trigger emission when called`, () => {
          spyOn(component.liked, 'emit');
          fixture.detectChanges();
          component.like();
          expect(component.liked.emit).toHaveBeenCalled();
      });
    ```

### Aula 5

- Instalar a dependência no ambiente dev

```jsx
npm install -D karma-firefox-launcher@1.3.0
```

- Configuração do `karma.conf.js`

```jsx
plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-firefox-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],

browsers: ['Chrome', 'Firefox'],
```

- Criando um script para rodar os testes em browser desejados.

```jsx
"scripts": {
    "ng": "ng",
    "start": "ng serve",
    "build": "ng build",
    "test": "ng test",
    "test-common": "ng test --browsers Chrome,Firefox",
    "lint": "ng lint",
    "e2e": "ng e2e"
  },
```

- *browsers* rodem na sua versão *headless →* É uma versão que roda em memória sem a parte gráfica, que o usuário interage.

```jsx
"scripts": {
    "ng": "ng",
    "start": "ng serve",
    "build": "ng build",
    "test": "ng test",
    "test-common": "ng test --browsers Chrome,Firefox",
    "test-ci": "ng test --watch=false --browsers ChromeHeadless",
    "lint": "ng lint",
    "e2e": "ng e2e"
  },
```

- Criando um Custom Launcher

```jsx
karma.conf.js
customLaunchers:{
      FirefoxSemCabeca:{
        base:'Firefox',
        flags:['-headless']
      }

    }

package.json
"scripts": {
    "ng": "ng",
    "start": "ng serve",
    "build": "ng build",
    "test": "ng test",
    "test-common": "ng test --browsers Chrome,Firefox",
    "test-ci": "ng test --watch=false --browsers ChromeHeadless,FirefoxSemCabeca",
    "lint": "ng lint",
    "e2e": "ng e2e"
  },
```

- Gerar relatório para integração contínua

```jsx
npm install -D karma-junit-reporter@2.0.1
```

```jsx
plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-firefox-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-junit-reporter'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
```

```jsx
"scripts": {
    "ng": "ng",
    "start": "ng serve",
    "build": "ng build",
    "test": "ng test",
    "test-common": "ng test --browsers Chrome,Firefox",
    "test-ci": "ng test --watch=false --reporters junit --browsers ChromeHeadless,FirefoxSemCabeca",
    "lint": "ng lint",
    "e2e": "ng e2e"
  },
```

- Teste de cobertura de testes

```jsx
"scripts": {
    "ng": "ng",
    "start": "ng serve",
    "build": "ng build",
    "test": "ng test",
    "test-common": "ng test --browsers Chrome,Firefox",
    "test-ci": "ng test --watch=false --reporters junit --browsers ChromeHeadless,FirefoxSemCabeca",
    "test-coverage": "ng test --watch=false --sourceMap=true --codeCoverage=true --browsers ChromeHeadless",
    "lint": "ng lint",
    "e2e": "ng e2e"
  },
```
