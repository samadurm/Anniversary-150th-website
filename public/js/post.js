(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['post'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div id = post-container>\r\n    <div id = author-name-container>\r\n        <p id = author>"
    + alias4(((helper = (helper = helpers.author || (depth0 != null ? depth0.author : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"author","hash":{},"data":data}) : helper)))
    + "</p>\r\n    </div>\r\n    <div id = drawing-container class = drawing-post uid = "
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + ">\r\n        <img src = "
    + alias4(((helper = (helper = helpers.data || (depth0 != null ? depth0.data : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"data","hash":{},"data":data}) : helper)))
    + ">\r\n    </div>\r\n    <div id = info-container>\r\n        <p id = title>"
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "</p>\r\n        <span id = thumbs-container>\r\n            <i class = \"fa fa-thumbs-up\" id = thumbs-up></i>\r\n            <!-- Added by Matthew changed Good/bad functionality  -->\r\n                <span id = like-count>"
    + alias4(((helper = (helper = helpers.goodRating || (depth0 != null ? depth0.goodRating : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"goodRating","hash":{},"data":data}) : helper)))
    + "</span>\r\n            <i class = \"fa fa-thumbs-down\" id = thumbs-down></i>\r\n                <span id = dislike-count>"
    + alias4(((helper = (helper = helpers.badRating || (depth0 != null ? depth0.badRating : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"badRating","hash":{},"data":data}) : helper)))
    + "</span>\r\n        </span>\r\n    </div>\r\n</div>\r\n";
},"useData":true});
})();