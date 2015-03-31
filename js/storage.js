//Almacenamiento
var almacenamiento = {
    createReg: function(nom, id){
        window.localStorage.setItem('name',nom);
        window.localStorage.setItem('uuid',id);
    },
    isRegistered: function(){
        if(window.localStorage.getItem('uuid') != undefined && window.localStorage.getItem('uuid') != '')
            return true;
        else
            return false;
    },
    db: window.openDatabase("hotelApp", "1.0", "HotalApp", 200000),
    reservar: function(th,ha,pr,di){
        function populateDB(tx) {
            tx.executeSql('CREATE TABLE IF NOT EXISTS reservas (id, th, ha, pr, di)');
            tx.executeSql('INSERT INTO reservas (th, ha, pr ,di) VALUES ("'+th+'","'+ha+'","'+pr+'","'+di+'")');
        }

        function errorCB(err) {
            alert("Error processing SQL: "+err);
        }

        function successCB() {
            window.location.href = "#home";
            navigator.notification.alert('Reserva Guardada en espera de sincronización',null,'Guardado','Aceptar');
        }
        almacenamiento.db.transaction(populateDB, errorCB, successCB);
    },
    leerReservas: function(){
        function populateDB(tx){
            tx.executeSql("SELECT * FROM reservas",[],function(tx2,r){
                alert(r.rows.length);
            },function(err){
                alert('Error: '+err.code);
            });
        }
        function errorCB(err){
            alert('Error: '+err.code);
        }
        function successCB(){
            //Función en caso de que sea satisfactorio
            var x = null;
        }
        almacenamiento.db.transaction(populateDB,errorCB,successCB);
    }
};