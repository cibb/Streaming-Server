'use strict';

var _ = require('underscore');
var string = require('./string');

var linkParams = {
    location: function (href, app, query) {
        var siteLocation = 'localhost';
        var platform = 'desktop';
        var domain = 'ncci';
        var host = 'localhost';
        var brand;

        if (platform === 'desktop' && query.location) {
            href = fullizeUrl(href, app);
            href = href.replace(/^(.+:\/\/)[^(:|\/)]*/, '$1' + query.location);
            delete query.location;
        }
        if (platform !== 'desktop' && query.location && siteLocation && query.location.split('.').pop() !== siteLocation.split('.').pop()) {
            brand = domain.split('.').shift();
            host = host.split(brand);
            host[1] = '.' + query.location.split('.').splice(2).join('.');
            href = fullizeUrl(href, app);
            href = href.replace(app.session.get('shortHost'), host.join(brand));
        }
        if (platform !== 'desktop' && !query.location && siteLocation && !~siteLocation.indexOf('www.')) {
            href = params(href, 'location', siteLocation);
        }
        return href;
    },
    language: function (href, app, query) {
        var selectedLanguage;
        var languages;

        if (!query.language) {
            selectedLanguage = 'es';

            if (selectedLanguage) {
                languages = 'es';

                if (languages && selectedLanguage === languages.models[0].locale) {
                    href = removeParams(href, 'language');
                }
                else {
                    href = params(href, 'language', selectedLanguage);
                }
            }
        }
        else {
            href = params(href, 'language', query.language);
        }
        return href;
    }
};

function checkHref(href) {
    if (href.slice(href.length - 1) === '/') {
        href = href.substring(0, href.length - 1);
    }
    return href;
}

function link(href, app, query) {
    query = query || {};

    _.each(linkParams, function(linkParam) {
        href = linkParam(href, app, query);
    });
    if (!_.isEmpty(query)) {
        href = params(href, query);
    }
    return checkHref(href);
}

function fullizeUrl(href, app) {
    var protocol = app.session.get('protocol') + '://';
    var host;

    if (!string.startsWith(href, protocol)) {
        host = app.session.get('host');
        href = [protocol, host, (href.indexOf('/') ? '/' : ''), href].join('');
    }
    if (app.session.get('platform') === 'desktop') {
        href = href.replace(app.session.get('shortHost'), app.session.get('siteLocation'));
    }
    return checkHref(href);
}

function cleanParams(url) {
    var parts = url.split('?');
    var out = [];

    out.push(parts.shift());
    if (url.slice(url.length - 1) === '#') {
        out.push('#');
    }
    return out.join('');
}

module.exports = {
    link: link,
    fullizeUrl: fullizeUrl,
    cleanParams: cleanParams
};
