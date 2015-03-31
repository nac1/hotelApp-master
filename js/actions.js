var fn = {
    ready: function(){
        document.addEventListener('deviceready',fn.init,false);
    },
    init: function(){
        if(!almacenamiento.isRegistered())
            window.location.href = "#registro";
        $('#registro a:eq(0)').tap(capture.takePhoto);
        $('#registro a:eq(1)').tap(fn.registrar);
        fn.crearReserva();
    },
    registrar: function(){
        var nom = $('#registro input:eq(0)').val();
        var mail = $('#registro input:eq(1)').val();
        var tel = $('#registro input:eq(2)').val();
        var img = $('#registro a:eq(0)').attr('rel');
        
        if(nom != '' && mail != '' && tel != '' && img != '' && img != undefined)
            server.sendData(nom,mail,tel,img);
        else
            navigator.notification.alert('Todos los campos son requeridos', null, 'Error de Datos','Aceptar');
    },
    crearReserva: function(){
        var reserva = {
            selecTH: function(){
                if($(this).index() > 0){
                    $('#nr1').attr('th',$(this).index());
                    $('#nr1 ul:eq(0) li a').css('background','#f6f6f6');
                    $(this).find('a').css('background','#00dd00');
                }
            },
            siguiente: function(){
                var th = $('#nr1').attr('th');
                if(th != undefined && th != '')
                    window.location.href = '#nr2';
            },
            reservar: function(){
                var th = $('#nr1').attr('th');
                var ha = $('#nr2 select:eq(0)').val();
                var pr = $('#nr2 select:eq(1)').val();
                var di = $('#nr2 select:eq(2)').val();
                if(connection.isConnected())
                    alert(th + ' - ' + ha + ' - ' + pr + ' - ' + di);
                else
                    almacenamiento.reservar(th,ha,pr,di);
            }
        };
        $('#nr1 ul:eq(0) li').tap(reserva.selecTH);
        $('#nr1 ul:eq(1) li:eq(1)').tap(reserva.siguiente);
        $('#nr2 ul:eq(1) li:eq(1)').tap(reserva.reservar);
        $('#historial').tap(almacenamiento.leerReservas);
    }
};
$(fn.ready);