var Elements = {
    create: function (tagname, attributes) {
        var tag = document.createElement(tagname), attr_name, attr_value;
        for (attr_name in attributes) {
            attr_value = attributes[attr_name];
            tag.setAttribute(attr_name, attr_value);
        }
        return tag;
    },
    append_meta: function (attributes) {
        var E_charset = Elements.create('meta', attributes);
        document.head.appendChild(E_charset);
    }
};
//Helpers
var $ = document.getElementById;