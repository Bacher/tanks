
T.initCanvas = function() {
    var $body = $('BODY');
    var $canvas = $('#game');

    var canvas = T.canvas = $canvas[0];

    window.gl = canvas.getContext('webgl');

    $body.on('resize', T.resizeViewPort);

    T.resizeViewPort();
};

T.resizeViewPort = function() {
    var $body = $('BODY');

    T.viewPortWidth = T.canvas.width = $body.width();
    T.viewPortHeight = T.canvas.height = $body.height();
};

T.getShaderText = function(id) {
    return $('#' + id).text();
};

T.extractPolygonsFromJSON = function(model) {
    var facesCount = model.metadata.faces;
    var materialsCount = model.metadata.materials;

    var valuesPerFace = model.faces.length / model.metadata.faces;

    var includeNormals = !!model.metadata.normals;

    var data = {
        parts: []
    };

    for (var m = 0; m < materialsCount; ++m) {
        data.parts.push({
            polygons: [],
            normals: [],
            uvs: []
        });
    }

    for (var i = 0; i < facesCount; i++) {
        var offset = i * valuesPerFace;

        var matId = model.faces[offset + 4];
        var vertices = [model.faces[offset + 1], model.faces[offset + 2], model.faces[offset + 3]];
        var uvs = [model.faces[offset + 5], model.faces[offset + 6], model.faces[offset + 7]];

        if (includeNormals) {
            var normalsIds = [model.faces[offset + 8], model.faces[offset + 9], model.faces[offset + 10]];
        }

        var part = data.parts[matId];

        for (var j = 0; j < 3; j++) {
            var vOffset = vertices[j] * 3;

            if (!part) {
                debugger
            }

            part.polygons.push(
                model.vertices[vOffset],
                model.vertices[vOffset + 1],
                model.vertices[vOffset + 2]
            );

            var uvOffset = uvs[j] * 2;

            part.uvs.push(
                model.uvs[0][uvOffset],
                model.uvs[0][uvOffset + 1]
            );

            if (includeNormals) {
                var nOffset = normalsIds[j] * 3;

                part.normals.push(
                    model.normals[nOffset],
                    model.normals[nOffset + 1],
                    model.normals[nOffset + 2]
                );
            } else {
                part.normals.push(0, 0, 0);
            }
        }
    }

    return data;
};
