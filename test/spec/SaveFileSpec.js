
describe("SaveFile", function() {
  var saveFile;

  beforeEach(function() {
    saveFile = new SaveFile();
  });

  it("header: futuro", function() {
    expect(saveFile.getFuturo()).toBeFalsy();

    saveFile.setFuturo(true);
    expect(saveFile.getFuturo()).toBeTruthy();

    saveFile.setFuturo(false);
    expect(saveFile.getFuturo()).toBeFalsy();
  });

  it("header: numeros", function() {
    [-32000, 42, 20000].forEach(function(expected) {
        saveFile.reset();
        for (var i = 0; i < 6; i++) {
            expect(saveFile.getNumero(i)).not.toBe(expected);

            saveFile.setNumero(i, expected);
            expect(saveFile.getNumero(i)).toBe(expected);
        }
    });
  });

  it("header: switchs", function() {
    for (var i = 0; i < 6; i++) {
        saveFile.reset();
        expect(saveFile.getSwitch(i)).toBeFalsy();

        saveFile.setSwitch(i, true);
        expect(saveFile.getSwitch(i)).toBeTruthy();

        saveFile.setSwitch(i, false);
        expect(saveFile.getSwitch(i)).toBeFalsy();
    }
  });

  it("header: nombre", function() {
    expect(saveFile.getNombre()).toBe('');

    var expected = 'xrm0';
    saveFile.setNombre(expected);
    expect(saveFile.getNombre()).toBe(expected);
  });

  it("header: data", function() {
    var expected = [];
    for (var i = 0; i < 256; i++)
        expected[i] = i;
    saveFile.setData(expected);

    var data = saveFile.getData();
    expect(data).not.toBeNull();
    expect(data.length).toBe(256);
    expect(data).toEqual(expected);
  });

  it("test file 1", function() {
    var testData1 = [1, 47, 251, 53, 251, 95, 251, 133, 252, 143, 4, 213, 60, 1, 0, 1, 0, 1, 0, 50, 98, 97, 109, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250, 251, 252, 253, 254, 255];
    var data = new ArrayBuffer(35 + 256);
    expect(testData1.length).toEqual(testData1.length);
    var view = new DataView(data);
    for (var i = 0; i < view.byteLength; i++)
        view.setUint8(i, testData1[i]);
    saveFile.cargar(data);

    expect(saveFile.getFuturo()).toBeTruthy();

    var numeros = [-1233, -1227, -1185, -891, 1167, 15573];
    numeros.forEach(function(n, i) {
        expect(saveFile.getNumero(i)).toBe(n);
    });

    var switchs = [1, 0, 1, 0, 1, 0];
    switchs.forEach(function(n, i) {
        var expected = (n == 1);
        expect(saveFile.getSwitch(i)).toBe(expected);
    });

    expect(saveFile.getNombre()).toBe('2bam');

    var data = saveFile.getData();
    for (var i = 0; i < 256; i++)
        expect(data[i]).toBe(i);
  });

});
