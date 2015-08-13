
'use strict'

var path = require( 'path' )

var through = require( 'through' )


function throughSkip( ) {

	return through( )

}


function throughMap( callback ) {

	var buffer = ''

	return through(

		function write( data ) {

			buffer += data

		},

		function end( ) {

			try {

				this.queue( callback( buffer ) )
				this.queue( null )

			} catch ( e ) {

				this.emit( 'error', e )

			}

		}

	)

}


function extend( destObject, sourceObject ) {

	for (var o in sourceObject) {

		if ( !( o in destObject ) ) {

			destObject[ o ] = sourceObject[ o ]

		}

	}

}


module.exports = function compilify( compiler, defaultOptions ) {

	defaultOptions = defaultOptions || { }


	return function transform( filepath, options ) {

		options = options || { }

		extend( options, defaultOptions )


		function shouldCompile( ) {

			var should = true
			var pathext = path.extname( filepath )

			if ( options.extensions instanceof Array ) {

				should = options.extensions.indexOf( pathext ) !== -1

			}

			if ( options.excludeExtensions instanceof Array ) {

				should = options.excludeExtensions.indexOf( pathext ) === -1

			}

			return should

		}


		if ( shouldCompile( ) ) {

			return throughMap( function ( file ) {

				return 'module.exports=' + JSON.stringify( compiler( file, options ) )

			} )

		} else {

			return throughSkip( )

		}


	}


}
