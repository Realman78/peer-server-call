
const cb = document.getElementById('cb')
const ab = document.getElementById('ab')
const inp = document.getElementById('in')
cb.addEventListener('click', ()=>{
    const peer = new Peer('1', {
      host: 'peer-server-md.herokuapp.com',
      port: 443,
      secure:true
      });
      navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    navigator.getUserMedia({video: true, audio: true}, function(stream) {
      var call = peer.call(inp.value, stream);
      call.on('stream', function(remoteStream) {
        document.getElementById('ok').srcObject = remoteStream
      });
    }, function(err) {
      console.log('Failed to get local stream' ,err);
    });
})
ab.addEventListener('click', ()=>{
    const peer = new Peer('2', {
        host: 'peer-server-md.herokuapp.com',
        port: 443,
        secure:true
      });
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    peer.on('call', function(call) {
    navigator.getUserMedia({video: true, audio: true}, function(stream) {
        call.answer(stream); // Answer the call with an A/V stream.
        call.on('stream', function(remoteStream) {
            document.getElementById('ok').srcObject = remoteStream
        });
    }, function(err) {
        console.log('Failed to get local stream' ,err);
    });
    });

})