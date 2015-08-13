'use strict';

var Base = require('../../bases/view');
var template = require('../../../../templates/partials/play.html');

module.exports = Base.extend({
    id: 'play',
    tagName: 'section',
    template: template,
    events: {
        'click #viewer': onStartViewer
    }
});

function onStartViewer() {
    event.preventDefault();

    if (!webRtcPeer) {
        showSpinner(video);

        var options = {
            remoteVideo: video,
            onicecandidate : onIceCandidate
        }

        webRtcPeer = kurentoUtils.WebRtcPeer.WebRtcPeerRecvonly(options, function(error) {
            if(error) return onError(error);

            this.generateOffer(onOfferViewer);
        });
    }
}