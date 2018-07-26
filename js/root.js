var J42 = {
    config: {
        main: {},
        pages: {}
    },
    elements: {
        wrap: null,
        main: null,
        header: null,
        content: null,
        footer: null,
    },
    start: function () {
        J42.init_elements();
        document.body.appendChild(J42.elements.wrap);
        J42.elements.wrap.appendChild(J42.elements.header);
        J42.elements.wrap.appendChild(J42.elements.main);
        J42.elements.wrap.appendChild(J42.elements.footer);
        J42.elements.main.appendChild(J42.elements.content);
        //
        J42.goto();
    },
    init_elements: function () {
        J42.elements.wrap = Elements.create('div', {
            id: 'j42_wrap'
        });
        J42.elements.header = Elements.create('header', {
            id: 'j42_header'
        });
        J42.elements.main = Elements.create('main', {
            id: 'j42_main'
        });
        J42.elements.content = Elements.create('article', {
            id: 'j42_content'
        });
        J42.elements.footer = Elements.create('footer', {
            id: 'j42_footer'
        });
    },
    goto: function (page_key) {
        if (typeof page_key != 'string') {
            page_key = Routing.area;
        }
        if (Pages_collection[page_key]) {
            var PageClass = Pages_collection[page_key];
            if (typeof PageClass.startup == 'function') {
                PageClass.startup();
            }
        } else if (Routing.area != '404') {
            Routing.goto('404/' + page_key);
        }
    }
};

//
window.onload = function () {
    setTimeout(J42.start, 10);
};
window.addEventListener('hashchange', function () {
    setTimeout(J42.goto, 50);
}, false);