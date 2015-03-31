//media-capture
var capture = {
    imgSuccess: function(mf){//Función en caso de que sea satisfactorio
        var i, path, len;
        for (i = 0, len = mf.length; i < len; i += 1) {
            path = mf[i].fullPath;//Ruta completa del archivo de imagen
        }
        $('#registro div[role=main] a').attr('rel',path);
        $('#registro div[role=main] ul li:eq(4)').html('<img src="' + path + '" style="width:100%;">');
        
    },
    imgError: function(err){//función en caso de que haya un error
        navigator.notification.alert('Error code: ' + err.code, null, 'Capture Error');
    },
    takePhoto: function(){//implementación o llamada de captura de imagen
        navigator.device.capture.captureImage(capture.imgSuccess, capture.imgError, {limit:2});
    }
};