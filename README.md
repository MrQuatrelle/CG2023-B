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

A alternativa seria sincronizar tudo pelo html... but gud luck with that.

E no main chamamos as classes / modules de outros ficheiros para construir o
robot. Have fun :)
