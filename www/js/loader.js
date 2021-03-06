
T.loadResources = function() {

    T.createModel('de_dust2');

    T.createModel('african_head');
    T.createModel('ausfb');
    T.createModel('land');

    return Promise.all([
        T.loadModel('maps/de_dust2/de_dust2.obj.json', 'de_dust2'),
        //T.loadTexture('models/land/uv_test.jpg', 'de_dust2', 'diffuse', 'de_dust2'),

        T.loadModel('models/african_head/african_head.obj.json', 'african_head'),
        T.loadTexture('models/african_head/african_head_diffuse.png', 'african_head', 'diffuse', 'default'),

        T.loadModel('models/ausfb/ausfb.obj.json', 'ausfb', {
            link: {
                Body_2: {
                    Turret_2: null
                }
            }
        }),
        T.loadTexture('models/ausfb/Turret.png', 'ausfb', 'diffuse', 'Turret'),
        T.loadTexture('models/ausfb/Turret_2.png', 'ausfb', 'diffuse', 'Turret_2'),
        T.loadTexture('models/ausfb/Track.png', 'ausfb', 'diffuse', 'Track'),
        T.loadTexture('models/ausfb/Body_1.png', 'ausfb', 'diffuse', 'Body_1'),
        T.loadTexture('models/ausfb/Body_2.png', 'ausfb', 'diffuse', 'Body_2'),

        T.loadTexture('models/land/uv_test.jpg', 'land', 'diffuse', 'land')
    ]);
};

T.createModel = function(name) {
    T.modelsData[name] = {
        json: null,
        images: {},
        textures: {},
        parts: [],
        params: {}
    };
};

T.loadModel = function(path, name, params) {
    return new Promise(function(resolve) {
        $.getJSON(path).then(function(model) {
            T.modelsData[name].json = model;

            if (params) {
                $.extend(T.modelsData[name].params, params);
            }

            resolve();
        });
    });
};

T.loadTexture = function(path, modelName, type, name) {
    return new Promise(function(resolve) {
        var img = new Image();

        img.onload = function() {
            var images = T.modelsData[modelName].images;

            images[type] = images[type] || {};

            images[type][name] = img;

            resolve();
        };

        img.src = path;
    });
};
