var Elements = {
    create: function(tagname, attributes) {
        var tag = document.createElement(tagname), attr_name, attr_value;
        for(attr_name in attributes) {
            attr_value = attributes[attr_name];
            tag.setAttribute(attr_name, attr_value);
        }
        return tag;
    }
};