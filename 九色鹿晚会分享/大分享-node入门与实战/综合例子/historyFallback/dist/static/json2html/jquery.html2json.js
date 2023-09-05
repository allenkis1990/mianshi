
//Convert obj or array to transform
function toTransform(obj) {
  let json;

  if (obj.length > 1) {
    json = [];

    for (let i = 0; i < obj.length; i++)
      json[json.length++] = obj2Transform(obj[i]);
  } else json = obj2Transform(obj);

  return (json);
}

//Convert obj to transform
function obj2Transform(obj) {
  let el = $(obj).get(0);
  let json = { '<>': el.nodeName.toLowerCase() };

  for (let attr, i = 0, attrs = el.attributes, l = attrs.length; i < l; i++) {
    attr = attrs[i];
    json[attr.nodeName] = escapeJSON(attr.value);
  }

  let children = $(obj).children();
  if (children.length === 0){ //纯文本
    let text = escapeJSON($(obj).text());
    if(text.length > 0){
      json['text'] = text;
    }
  }else{
    json['html'] = [];
    for(let i=0; i<el.childNodes.length; i++){
      let child = el.childNodes.item(i);
      if(child.nodeValue){
        json['html'][json['html'].length++] = {'<>': 'font', 'text': child.nodeValue};
      }else{
        json['html'][json['html'].length++] = toTransform(child);
      }
    }
  }

  return (json);
}

//Format JSON (with indents)
function formatJSON(oData, sIndent) {
  if (arguments.length < 2) {
    let sIndent = "";
  }
  let sIndentStyle = "  ";
  let sDataType = RealTypeOf(oData);

  // open object
  if (sDataType == "array") {
    if (oData.length == 0) {
      return "[]";
    }
    let sHTML = "[";
  } else {
    let iCount = 0;
    $.each(oData, function () {
      iCount++;
      return;
    });
    if (iCount == 0) { // object is empty
      return "{}";
    }
    let sHTML = "{";
  }

  // loop through items
  let iCount = 0;
  $.each(oData, function (sKey, vValue) {
    if (iCount > 0) {
      sHTML += ",";
    }
    if (sDataType == "array") {
      sHTML += ("\n" + sIndent + sIndentStyle);
    } else {
      sHTML += ("\"" + sKey + "\"" + ":");
    }

    // display relevant data type
    switch (RealTypeOf(vValue)) {
      case "array":
      case "object":
        sHTML += formatJSON(vValue, (sIndent + sIndentStyle));
        break;
      case "boolean":
      case "number":
        sHTML += vValue.toString();
        break;
      case "null":
        sHTML += "null";
        break;
      case "string":
        sHTML += ("\"" + escapeJSON(vValue) + "\"");
        break;
      default:
        sHTML += ("TYPEOF: " + typeof (vValue));
    }

    // loop
    iCount++;
  });

  // close object
  if (sDataType == "array") {
    sHTML += ("\n" + sIndent + "]");
  } else {
    sHTML += ("}");
  }

  // return
  return sHTML;
}

//Get the type of the obj (can replace by jquery type)
function RealTypeOf(v) {
  if (typeof (v) == "object") {
    if (v === null) return "null";
    if (v.constructor == (new Array).constructor) return "array";
    if (v.constructor == (new Date).constructor) return "date";
    if (v.constructor == (new RegExp).constructor) return "regex";
    return "object";
  }
  return typeof (v);
}

function escapeJSON(str) {
  return str.replace(/[\n\r]/g, "\\n")
    .replace(/\\'/g, "\\'")
    .replace(/\\"/g, '\\"')
    .replace(/\\&/g, "\\&")
    .replace(/\\r/g, "\\r")
    .replace(/\\t/g, "\\t")
    .replace(/\\b/g, "\\b")
    .replace(/\\f/g, "\\f");

}


(function ($) {
  $.html2json = function (html) {
    return toTransform($(html));
  };

  $.fn.html2json = function (html, _options) {
    let options = {
        'append':true,
        'replace':false,
        'prepend':false,
        'eventData':{}
    };

    if( _options !== undefined ) $.extend(options, _options);
    
    options.events = true;
    
    return this.each(function(){ 
        let $result = toTransform(html);
        if (options.replace) $.fn.replaceWith.call($(this),$result);
        else if (options.prepend) $.fn.prepend.call($(this),$result);
        else $.fn.append.call($(this),$result);
    });
  };
})(jQuery);