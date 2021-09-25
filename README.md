### About
o solid node script é um biblioteca que tem o intuito de sugerir uma estrua baseada em principios do solid. Com ela você conseguirá gerar seus arquivos de forma rápida e objetiva

### Installation

`npm install solid-node-structure --save-dev`

then, you need to create a ** solid.config.json ** file at the root of your project, telling the library where to start the useCases structure. example:

src /
------ modules /
README.md
.gitignore
package.json
tsconfig.json
    ** solid.config.json ** <==

```json
{
	"defaultPaths": "src / modules /"
}
```

Then create a script in your package.json to start the solid-node structure from the terminal. Example:

```json
"scripts": {
	"name-of-your-script": "solid node structure",
}
```

If you prefer, use the alias ** sns ** like this:

```json
"scripts": {
	"name-of-your-script": "sns",
}
```
Now all you need to do is run:

`yarn sns --module = myModule --usecase = myuseCase`