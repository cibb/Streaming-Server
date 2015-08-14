/*
 * (C) Copyright 2014-2015 Kurento (http://kurento.org/)
 *
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the GNU Lesser General Public License
 * (LGPL) version 2.1 which accompanies this distribution, and is available at
 * http://www.gnu.org/licenses/lgpl-2.1.html
 *
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
 * Lesser General Public License for more details.
 *
 */

var ws = new WebSocket('ws://91.235.41.166:8080/one2many');
var video;
var webRtcPeer;

window.onload = function() {
    video = document.getElementById('videoPlayer');


    document.getElementById('play').addEventListener('click', function() { viewer(); } );
    document.getElementById('stop').addEventListener('click', function() { stop(); } );
}

window.onbeforeunload = function() {
    ws.close();
}

ws.onmessage = function(message) {
    var parsedMessage = JSON.parse(message.data);

    switch (parsedMessage.id) {
    case 'viewerResponse':
        viewerResponse(parsedMessage);
        break;
    case 'stopCommunication':
        dispose();
        break;
    case 'iceCandidate':
        webRtcPeer.addIceCandidate(parsedMessage.candidate)
        break;
    default:
    }
}

function viewerResponse(message) {
    if (message.response != 'accepted') {
        var errorMsg = message.message ? message.message : 'Unknow error';
        dispose();
    } else {
        webRtcPeer.processAnswer(message.sdpAnswer);
    }
}

function onOfferViewer(error, offerSdp) {
    if (error) return onError(error)

    var message = {
        id : 'viewer',
        sdpOffer : offerSdp
    }
    sendMessage(message);
}

function viewer() {
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


function onIceCandidate(candidate) {
       console.log('Local candidate' + JSON.stringify(candidate));

       var message = {
          id : 'onIceCandidate',
          candidate : candidate
       }
       sendMessage(message);
}

function stop() {
    if (webRtcPeer) {
        var message = {
                id : 'stop'
        }
        sendMessage(message);
        dispose();
    }
}

function dispose() {
    if (webRtcPeer) {
        webRtcPeer.dispose();
        webRtcPeer = null;
    }
    hideSpinner(video);
}

function sendMessage(message) {
    var jsonMessage = JSON.stringify(message);
    console.log('Senging message: ' + jsonMessage);
    ws.send(jsonMessage);
}

function showSpinner() {
    for (var i = 0; i < arguments.length; i++) {
        // arguments[i].style.background = 'center transparent url("./img/spinner.gif") no-repeat';
    }
}

function hideSpinner() {
    for (var i = 0; i < arguments.length; i++) {
        // arguments[i].src = '';
        // arguments[i].style.background = '';
    }
}
