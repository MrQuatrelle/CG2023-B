# CG2023-B

### Setup
make sure you have npm pre-installed.
```bash
npm install three
npm install --save-dev vite
```

### Run (dev mode)
This will watch the project. Everytime you change a file, it reloads the webapp
automagically.
```bash
npx vite
```

### Acktxual developing
https://faq.wincacademy.nl/multiple-javascript-files/

Para conseguirmos trabalhar todos ao mesmo tempo, vamos dividir as cenas em
ficheiros separados. E.g. um ficheiro para a perna esquerda, um para o tronco,
etc.

E depois exportamos como um módulo (como no link).
###### EDIT: não sigam o link...
Façam isto:
imaginem que têm uma variável x e um função f que querem passar para outro
ficheiro. Fazem:
```js
// mod.js
export default {
    varx: x,
    fnf: f,
}
```
no ficheiro ondem querem usar fazem:

```js
// main.js
import mod from "mod.js";
```
o que passaram como export passam a ser atributos da "class" mod:

```js
// main.js
console.log(mod.varx);
mod.fnf(mod.varx);
```

A alternativa seria sincronizar tudo pelo html... but gud luck with that.

E no main chamamos as classes / modules de outros ficheiros para construir o
robot. Have fun :)

## PLEASE PLEASE PLEASE USE BRANCHES!!!
