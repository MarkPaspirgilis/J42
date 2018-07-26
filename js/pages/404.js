var Page404 = new Page('404');
Page404.startup = function() {
    console.log($('j42_content'));
    $('j42_content').innerText = '404 - Page not found!';
};