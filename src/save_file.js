
var mulitasoft = mulitasoft || {};

mulitasoft.SaveFile = cc.Class.extend({
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

	cargar:function(data) {
	    for (var i = 0; i < this._view.byteLength; i++)
	        this._view.setUint8(i, data[i]);
	},

    setFuturo:function(futuro) {
    	this._view.setUint8(0, futuro);
    },

    getFuturo:function() {
        return this._view.getUint8(0);
    },

    setNumero:function(idx, value) {
    	this._view.setInt16(1 + idx * 2, value, true);
    },

    getNumero:function(idx) {
    	return this._view.getInt16(1 + idx * 2, true);
    },

    setSwitch:function(idx, enabled) {
    	this._view.setUint8(13 + idx, (enabled ? 1 : 0));
    },

    getSwitch:function(idx) {
    	return (this._view.getUint8(13 + idx) === 1);
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

});
