//network information
var connection = {
    isConnected: function(){
        if(navigator.connection.type != Connection.NONE)
            return true;
        else
            return false;
    }
};