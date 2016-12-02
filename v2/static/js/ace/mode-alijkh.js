define("ace/mode/gitignore_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"], function(require, exports, module) {
"use strict";

var oop = require("../lib/oop");
var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

var GitignoreHighlightRules = function() {
    this.$rules = {
        "start" : [
            {
                token : "comment",
                regex : /^\s*#.*$/
            }, {
                token : "keyword", // negated patterns
                regex : /^\s*!.*$/
            }
        ]
    };


function detect_module(_str)
{
  var modules = [];
  var _str =(/(module(?:(?!end)[\s\S\n])*end)/igm);
  modules.push(_str);  
  return _str;
}


function detect_variables(_str)
{
  // work with VARIABLES
    if (_str)
    {
      if(_str != /^[\t\s]*output[\s\t]*:[\s\t\n]*(real|bool|string)[\s\t]*[;][\s\t]*$/gim && _str != /^[\t\s]*[a-z]+[\t\s]*[=][\t\s]*(\"[a-z0-9]+\"|[0-9]*)[\t\s]*[;][\t\s]*$/gi)
      {
        _str = _str.replace(/^[\t\s]*[a-z0-9]+[\t\s]*([:])[\t\s]*(real|bool|string)[\t\s]*[;][\t\s]*$/gi, '_variable');
      }
    }
        return _str;
}

function detect_Keywords()
{
  var newCode  = $('#newCode').val();
  var myCode   = newCode;
  var findedKeywords = {};
  // change code to lower case
  myCode = myCode.toLowerCase();
  // run filter of comments
  myCode = filter_comments(myCode);
  // run filter of output
  myCode = detect_output(myCode);
  // detect input
  myCode = detect_input(myCode);
  // run filter of while
  myCode = filter_while(myCode);
  // run filter of return
  myCode = detect_return(myCode);
  // detect variables
  myCode = detect_variables(myCode);
  // detect detect_variables_value
  myCode = detect_variables_value(myCode);
  // detect write
  myCode = detect_write(myCode);
  // detect read
  myCode = detect_read(myCode);
  // detect module
  myCode = detect_module(myCode);
  // detect if
  myCode = detect_if(myCode);
  // detect begin
  myCode = detect_begin(myCode);
  // detect end
  myCode = detect_end(myCode);
  // detect else
  myCode = detect_else(myCode);

  console.log(myCode);

  // foreach token, find this token is used
  $.each(TOKENS, function( token, value )
  {
    var count    = myCode.split(token).length - 1;
    var oldValue = 0;

    // if we can find keyword, add to keywords location
    if(count)
    {
      // save result in new array
      if(findedKeywords[value])
      {
        var oldValue = parseInt(findedKeywords[value]);
      }
      findedKeywords[value] = oldValue + count;
    }
  });

  $('#keywords').html('');
  $.each(findedKeywords, function( key, count )
  {
      // console.log(key + ': '  + count);

      // if exist update count
      if($('#keywords [data-keyword="'+key+'"]').html())
      {
        $('#keywords [data-keyword="'+key+'"] span').html(count);
      }
      // else add new keyword
      else
      {
      // show result to user
      $('#keywords').append("<code data-keyword='" + key +"'>" + key + "<span>" + count +"</span><code>");

      }
  });

  checkSyntax(myCode);
}
