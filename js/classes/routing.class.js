var Routing = {
    area: null,
    action: null,
    hash: null,
    on_location_change: function () {
        if (location.hash.substring(0, 2) == '#!') {
            Routing.hash = location.hash.substring(2);
            var hash_split = Routing.hash.split('/');
            if (hash_split.length == 1) {
                Routing.area = hash_split[0];
                Routing.action = null;
            } else {
                Routing.area = hash_split[0];
                Routing.action = hash_split[1];
            }
        } else {
            Routing.hash = null;
            Routing.area = null;
            Routing.action = null;
        }
    },
    goto: function(location_hash) {
        location.hash = '#!' + location_hash;
    }
};
setTimeout(function () {
    window.addEventListener('hashchange', Routing.on_location_change, false);
    Routing.on_location_change.call();
}, 1);