
SaveFile = cc.Class.extend({
	_data:null,
	_view:null,

    ctor:function() {
        this._data = new ArrayBuffer(35 + 256);
        this._view = new DataView(this._data);
    },

	reset:function() {
	    for (var i = 0; i < this._view.byteLength; i++)
	        this._view.setUint8(i, 0);
	},

	// se queda con una referencia, no hace una copia
	cargar:function(data) {
		var dataView = new DataView(data);
	    for (var i = 0; i < this._view.byteLength; i++)
	        this._view.setUint8(i, dataView.getUint8(i));
	},

	guardar:function(filename) {
	    // var pom = document.createElement('a');
	    var a = document.createElement('a');
	    var blob = new Blob([this._data], {'type': 'application/octect-stream'});
        a.href = window.URL.createObjectURL(blob);
        a.download = filename || 'savefile.bin';
        document.body.appendChild(a);
        a.click();
         document.body.removeChild(a);
	    // pom.setAttribute('href', 'data:application/octet-stream,' +
	    // 	encodeURIComponent(this._dump()));
	    // pom.setAttribute('download', 'savefile.bin');
	    // pom.click();
	},

    setFuturo:function(futuro) {
    	this._setBool(0, futuro);
    },

    getFuturo:function() {
        return this._getBool(0);
    },

    setNumero:function(idx, value) {
    	this._view.setInt16(1 + idx * 2, value, true);
    },

    getNumero:function(idx) {
    	return this._view.getInt16(1 + idx * 2, true);
    },

    setSwitch:function(idx, enabled) {
    	this._setBool(13 + idx, enabled);
    },

    getSwitch:function(idx) {
    	return this._getBool(13 + idx);
    },

    setNombre:function(name) {
    	for (var i = 0; i < 16; i++) {
    		var value;
    		if (i >= name.length)
    			value = 0;
    		else
    			value = name.charCodeAt(i);
    		this._view.setUint8(19 + i, value);
    	}
    },

    getNombre:function() {
    	var result = '';
    	for (var i = 0; i < 16; i++) {
    		var value = this._view.getUint8(19 + i);
    		if (value == 0)
    			break;
    		result += String.fromCharCode(value);
    	}
    	return result;
    },

    setData:function(data) {
    	for (var i = 0; i < 256; i++) {
    		var value;
    		if (i >= data.length)
    			value = 0;
    		else
    			value = data[i];
    		this._view.setUint8(35 + i, value);
    	}
    },

    getData:function() {
    	var result = [];
    	for (var i = 0; i < 256; i++)
    		result.push(this._view.getUint8(35 + i));
    	return result;
    },

    _setBool:function(idx, value) {
		this._view.setUint8(idx, value);
    },

    _getBool:function(idx) {
    	return (this._view.getUint8(idx) == 1);
	 },

});
