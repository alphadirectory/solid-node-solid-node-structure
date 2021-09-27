### About
solid node script is a library that is intended to suggest a structure based on solid principles. With it you'll be able to generate your files quickly and objectively 

### Installation

`npm install solid-node-structure --save-dev`

then, you need to create a ** solid.config.json ** file at the root of your project, telling the library where to start the useCases structure. Will need contains
```json
{
	"defaultPaths": "src/modules/"
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

## create a module 

module=[moduleName]

exemple:

`npm sns module=feeds`
## create a repositorie

run repository=[moduleName]:[repositoryName] 

exemple:

`npm sns repository=feeds:points`

## create a Model

run model=[moduleName]:[modelName]
exemple

`npm sns model=feeds:points`

## create an UseCase

`npm sns usecase=feeds:points`