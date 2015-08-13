
/* global describe it */
/* eslint no-unused-expressions: 0 */

'use strict'

var stream = require( 'stream' )

var expect = require( 'chai' ).expect
var browserify = require( 'browserify' )

var compilify = require( '../index' )


function compiler( file, options ) {

	var replacement = ( options && options.replacement ) || 'orange'

	return file.replace( 'fuchsia', replacement )

}

function errorCompiler( ) {

	throw { type: 'CompilerError' }

}


describe( 'Compilify', function ( ) {

	it( 'should compile input files', function ( done ) {

		var s = new stream.Readable( )
		s.push( 'fuchsia' )
		s.push( null )

		var b = browserify( s )
		b.transform( compilify( compiler ) )
		b.bundle( function ( err, result ) {

			expect( err ).to.not.exist
			expect( result ).to.contain( 'orange' )
			done( )

		} )

	} )

	it( 'should only compile specified files with default extensions set', function ( done ) {

		var s1 = new stream.Readable( )
		s1.push( 'fuchsia one' )
		s1.push( null )
		s1.path = 'fileOne.html'

		var s2 = new stream.Readable( )
		s2.push( '"fuchsia two"' )
		s2.push( null )
		s2.path = 'fileTwo.js'

		var b = browserify( [ s1, s2 ] )
		b.transform( compilify( compiler, { extensions: [ '.html' ] } ) )
		b.bundle( function ( err, result ) {

			expect( err ).to.not.exist
			expect( result ).to.contain( 'orange one' )
			expect( result ).to.contain( 'fuchsia two' )
			done( )

		} )

	} )

	it( 'should only compile specified files with instance extensions set', function ( done ) {

		var s1 = new stream.Readable( )
		s1.push( 'fuchsia one' )
		s1.push( null )
		s1.path = 'fileOne.html'

		var s2 = new stream.Readable( )
		s2.push( '"fuchsia two"' )
		s2.push( null )
		s2.path = 'fileTwo.js'

		var b = browserify( [ s1, s2 ] )
		b.transform( { extensions: [ '.html' ] }, compilify( compiler ) )
		b.bundle( function ( err, result ) {

			expect( err ).to.not.exist
			expect( result ).to.contain( 'orange one' )
			expect( result ).to.contain( 'fuchsia two' )
			done( )

		} )

	} )

	it( 'should prefer instance extensions to default extensions', function ( done ) {

		var s1 = new stream.Readable( )
		s1.push( 'fuchsia one' )
		s1.push( null )
		s1.path = 'fileOne.html'

		var s2 = new stream.Readable( )
		s2.push( '"fuchsia two"' )
		s2.push( null )
		s2.path = 'fileTwo.js'

		var b = browserify( [ s1, s2 ] )
		b.transform( { extensions: [ '.html' ] }, compilify( compiler, { extensions: [ '.js' ] } ) )
		b.bundle( function ( err, result ) {

			expect( err ).to.not.exist
			expect( result ).to.contain( 'orange one' )
			expect( result ).to.contain( 'fuchsia two' )
			done( )

		} )

	} )

	it( 'should skip compiling files with default excludeExtensions set', function ( done ) {

		var s1 = new stream.Readable( )
		s1.push( 'fuchsia one' )
		s1.push( null )
		s1.path = 'fileOne.html'

		var s2 = new stream.Readable( )
		s2.push( '"fuchsia two"' )
		s2.push( null )
		s2.path = 'fileTwo.js'

		var b = browserify( [ s1, s2 ] )
		b.transform( compilify( compiler, { excludeExtensions: [ '.js' ] } ) )
		b.bundle( function ( err, result ) {

			expect( err ).to.not.exist
			expect( result ).to.contain( 'orange one' )
			expect( result ).to.contain( 'fuchsia two' )
			done( )

		} )

	} )

	it( 'should skip compiling files with instance excludeExtensions set', function ( done ) {

		var s1 = new stream.Readable( )
		s1.push( 'fuchsia one' )
		s1.push( null )
		s1.path = 'fileOne.html'

		var s2 = new stream.Readable( )
		s2.push( '"fuchsia two"' )
		s2.push( null )
		s2.path = 'fileTwo.js'

		var b = browserify( [ s1, s2 ] )
		b.transform( { excludeExtensions: [ '.js' ] }, compilify( compiler ) )
		b.bundle( function ( err, result ) {

			expect( err ).to.not.exist
			expect( result ).to.contain( 'orange one' )
			expect( result ).to.contain( 'fuchsia two' )
			done( )

		} )

	} )

	it( 'should prefer instance excludeExtensions to default excludeExtensions', function ( done ) {

		var s1 = new stream.Readable( )
		s1.push( 'fuchsia one' )
		s1.push( null )
		s1.path = 'fileOne.html'

		var s2 = new stream.Readable( )
		s2.push( '"fuchsia two"' )
		s2.push( null )
		s2.path = 'fileTwo.js'

		var b = browserify( [ s1, s2 ] )
		b.transform( { excludeExtensions: [ '.js' ] }, compilify( compiler, { excludeExtensions: [ '.html' ] } ) )
		b.bundle( function ( err, result ) {

			expect( err ).to.not.exist
			expect( result ).to.contain( 'orange one' )
			expect( result ).to.contain( 'fuchsia two' )
			done( )

		} )

	} )

	it( 'should prefer excludeExtensions option to extensions option', function ( done ) {

		var s1 = new stream.Readable( )
		s1.push( 'fuchsia one' )
		s1.push( null )
		s1.path = 'fileOne.html'

		var s2 = new stream.Readable( )
		s2.push( '"fuchsia two"' )
		s2.push( null )
		s2.path = 'fileTwo.js'

		var b = browserify( [ s1, s2 ] )
		b.transform( compilify( compiler, { extensions: [ '.html', '.js' ], excludeExtensions: [ '.js' ] } ) )
		b.bundle( function ( err, result ) {

			expect( err ).to.not.exist
			expect( result ).to.contain( 'orange one' )
			expect( result ).to.contain( 'fuchsia two' )
			done( )

		} )

	} )

	it( 'should prefer excludeExtensions option to extensions option', function ( done ) {

		var s1 = new stream.Readable( )
		s1.push( 'fuchsia one' )
		s1.push( null )
		s1.path = 'fileOne.html'

		var s2 = new stream.Readable( )
		s2.push( '"fuchsia two"' )
		s2.push( null )
		s2.path = 'fileTwo.js'

		var b = browserify( [ s1, s2 ] )
		b.transform( compilify( compiler, { extensions: [ '.html', '.js' ], excludeExtensions: [ '.js' ] } ) )
		b.bundle( function ( err, result ) {

			expect( err ).to.not.exist
			expect( result ).to.contain( 'orange one' )
			expect( result ).to.contain( 'fuchsia two' )
			done( )

		} )

	} )

	it( 'should pass default options to compiler', function ( done ) {

		var s = new stream.Readable( )
		s.push( 'fuchsia one' )
		s.push( null )

		var b = browserify( s )
		b.transform( compilify( compiler, { replacement: 'cyan' } ) )
		b.bundle( function ( err, result ) {

			expect( err ).to.not.exist
			expect( result ).to.contain( 'cyan one' )
			done( )

		} )

	} )

	it( 'should pass instance options to compiler', function ( done ) {

		var s = new stream.Readable( )
		s.push( 'fuchsia one' )
		s.push( null )

		var b = browserify( s )
		b.transform( { replacement: 'cyan' }, compilify( compiler ) )
		b.bundle( function ( err, result ) {

			expect( err ).to.not.exist
			expect( result ).to.contain( 'cyan one' )
			done( )

		} )

	} )

	it( 'should pass compiler errors to Browserify', function ( done ) {

		var s = new stream.Readable( )
		s.push( 'fuchsia one' )
		s.push( null )

		var b = browserify( s )
		b.transform( compilify( errorCompiler ) )
		b.bundle( function ( err ) {

			expect( err ).to.exist
			expect( err.type ).to.equal( 'CompilerError' )
			done( )

		} )

	} )

} )
