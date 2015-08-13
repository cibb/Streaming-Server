# compilify

This package allows you to easily create a new [Browserify](https://github.com/substack/node-browserify) transform for a compiler, where "compiler" means any tool that takes in a file and transforms it somehow. Compilify will wrap your compiler, passing it the raw file and then packing the compiled result into a Browserify module to be require()'d. This allows you to bypass all the streaming boilerplate when you are using a framework that only operates synchronously on a whole file.

The compiler can take in an options object, and a set of default options can be specified when making the compilify transform. Compilify will handle two options for you, `extensions` and `excludeExtensions`, to restrict or allow the types of files your compiler will act on.


## API

```javascript
var compilify = require( 'compilify' )

compilify( compilerFunction [, defaultOptions ] )
```

`compilerFunction` should be a function of this form:

```javascript
function compilerFunction( file [, options ] ) {
	
	// Perform transformation

	return transformedFile

}
```

`options` will be an object containing options that are passed in when the Browserify transform is invoked. If an option is not set via Browserify, it will be populated from the `defaultOptions` object. If there are no options or default options, `options` will be an empty object.

## Options handled by compilify

```javascript
{
	extensions: [ Array of strings ],
	excludeExtensions: [ Array of strings ]
}
```

If neither of these options are set, your transform will operate on all files. If set, these options will also be passed through to your compiler function.

##### extensions:

Setting this option to an array of file extensions will restrict your transform to operating on files that end with one of those extensions.

##### excludeExtensions:

Setting this option to an array of file extensions will exclude files ending with one of those extensions from being operated on by your transform. If a file extension is set in both extensions and excludeExtensions, excludeExtensions will override.

### Example

```javascript
var compilify = require( 'compilify' )

compilify( myCompiler, { extensions: [ '.html', '.tmpl' ] } )
```

## Usage

### Creating a compiler transform

```javascript
// package 'foobarify'

var compilify = require( 'compilify' )

function foobarCompiler( file ) {

	return file.replace( 'foo', 'bar' )

}

module.exports = compilify( foobarCompiler )
```

### Creating a transform with options

```javascript
// package 'foobarify'

var compilify = require( 'compilify' )

function foobarCompiler( file, options ) {

	return file.replace( 'foo', options.replacement )

}

// Setting default to be 'bar'
module.exports = compilify( foobarCompiler, { replacement: 'bar' } )
```

### Using the transform

#### On the command line 

```shell
$ browserify -t foobarify main.js
```

#### With the Browserify API

```javascript
var foobarify = require( 'foobarify' )

var b = browserify( )
b.add( 'main.js' )
b.transform( foobarify )
b.bundle( ).pipe( process.stdout )
```

#### Passing options

```shell
$ browserify -t [ foobarify --replacement "baz" ] main.js
```

```javascript
var foobarify = require( 'foobarify' )

var b = browserify( )
b.add( 'main.js' )
b.transform( { replacement: 'baz' }, foobarify )
b.bundle( ).pipe( process.stdout )
```
