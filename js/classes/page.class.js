var Page = function (page_key) {
    var _this = this;
    this.key = page_key
    console.log('Page started: ' + this.key);
    //
    Pages_collection[page_key] = this;
};
var Pages_collection = {}