var J42 = {
    start: function () {
        console.log(J42.config);

        J42.processes.create_head();
        document.body.innerText = 'öäüß';
    },
    //Processes
    processes: {
        create_head: function () {
            var E_charset = Elements.create('meta', {
                charset: J42.config.charset.toUpperCase()
            });
            document.head.appendChild(E_charset);
        }
    }
};

//
window.onload = function () {
    setTimeout(J42.start, 10);
};