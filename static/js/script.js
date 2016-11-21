var VARIABLES = {};
var TOKENS    =
{
  // ---------- while
  "_while"          : 'while',
  // ---------- if
  "_if"             : 'if',
  // "if "             : 'if',
  // "if\n"            : 'if',
  // " then "          : 'then',
  // "\tthen "         : 'then',
  // "\nthen "         : 'then',
  // "\tthen "         : 'then',
  // "\nthen\n"        : 'then',
  // "\tthen\n"        : 'then',
  // "then\n"          : 'then',
  "_else"              : 'else',
  // "else\n"          : 'else',
  // "\nelse"          : 'else',
  // "\telse"          : 'else',
  // "\nelse\n"        : 'else',
  // "\telse\n"        : 'else',

  // ---------- read write
  "_write"          : 'write',
  "_read"           : 'read',

  // ---------- module
  // "for"             : 'for',
  "_begin"         : 'begin',
  // "\nbegin"         : 'begin',
  // "\tbegin"         : 'begin',
  // "\nbegin\n"       : 'begin',
  // "\tbegin\n"       : 'begin',
  "_end"           : 'end',
  // "\nend"           : 'end',
  // "\tend"           : 'end',
  // "\nend\n"         : 'end',
  // "\tend\n"         : 'end',
  // ":bool"           : 'bool',
  // ":real"           : 'real',
  // ":string"         : 'string',
  // "true"            : 'true',
  // "false"           : 'false',
  "_module"         : 'module',

  "_input"          : 'input',
  // "input: "         : 'input',
  // " input: "        : 'input',

  "_output"         : 'output',
  //"output: "        : 'output',
  // "output "        : 'output',
  // " output: "       : 'output',

  "_return"            : 'return',
  // "\nreturn "       : 'return',
  // "\treturn "       : 'return',
  // " return("        : 'return',
  // "\nreturn("       : 'return',
  // "\treturn("       : 'return',

  // ---------- comments
  "_!..comment..!"   : 'comment',
  "_!.comment.!"     : 'comment',
  "_variable"        : 'variable',
  "_variableValue"   : 'valid-variable',
  // "variable"      : 'variable',
  // "variable\n"      : 'variable',
  // " variable"       : 'variable',
  // "variable "       : 'variable',

  // ---------- comments

};




///////////////////////////////////////////////// selsectable Cards \ check class, add or remove

function add_class(_this , _class)
{
  get_class(_this);
  if (has_class(_this, _class) == -1)
    {
      classnames_arr.push(_class);
    }

  _this.setAttribute('class', classnames_arr.join(' '));
}

function remove_class(_this , _class){

  var classnames = _this.getAttribute('class');

  var classnames_arr = classnames.split(" ");
  var has = has_class(_this, _class);
  if(has >= 0)
  {
    classnames_arr.splice(has, 1);
  }
    var x = classnames_arr.join(' ');
    _this.setAttribute('class', classnames_arr.join(' '));
}


function has_class(_this , _class){
  var has_spin = -1;
  classnames_arr = get_class(_this);
  for (var j = 0; j < classnames_arr.length; j++) {
    if (classnames_arr[j] ==  _class)
      {
        has_spin = j;
        break;
      }
  }
  return has_spin;
}

function get_class(_this){
  var classnames = _this.getAttribute('class');
  return classnames.split(" ");
}


////////////////////////////////////// - Noel Delgado | hover cards effect

var inputs = document.querySelectorAll( '#file' );
Array.prototype.forEach.call( inputs, function( input )
{
  var label  = input.nextElementSibling,
    labelVal = label.innerHTML;

  input.addEventListener( 'change', function( e )
  {
    var fileName = '';

    fileName = e.target.value.split( '\\' ).pop();

    if( fileName )
    {
      label.querySelector( 'strong' ).innerHTML = fileName;
      var my_label = document.querySelectorAll("#file+label");
     // add_class(my_label, 'successful');

    }
    else
      label.innerHTML = labelVal;
  });
});





( function ( $ ) {
  // Add click event handler to button
  $("#file").change(function ()
  {
    if ( ! window.FileReader )
    {
      return alert( 'FileReader API is not supported by your browser.' );
    }
    var $i = $( '#file' ), // Put file input ID here
      input = $i[0]; // Getting the element from jQuery
    if ( input.files && input.files[0] )
    {
      file = input.files[0]; // The file

      fr = new FileReader(); // FileReader instance
      fr.onload = function ()
      {
        // Do stuff on onload, use fr.result for contents of file
        $("#newCode").val(fr.result);
        detectKeywords();
        console.log($("#newCode").val(fr.result));

      };
      var a = fr.readAsText( file );
      // fr.readAsDataURL( file );

    }
    else
    {
      // Handle errors here
      alert( "File not selected or browser incompatible." )
    }
  } );
} )( jQuery );


/**
 * [detectKeywords description]
 * @return {[type]} [description]
 */
function detectKeywords()
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


function filter_comments(_str)
{
  // remove multi line comments
  _str = _str.replace(/%%%(?:(?!%%%)[\s\S\n])*%%%/gim, '_!..comment..!');
  // remove one line comments
  _str = _str.replace(/%%.*/gi, '_!.comment.!');
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

function detect_variables_value(_str)
{
  // work with VARIABLES
    if (_str)
    {
      if(_str != /^[\t\s]*output[\t\s]*:[\t\s]*(real|bool|string)[\t\s]*[;][\t\s]*$/gim)
      {
        _str = _str.replace(/^[\t\s]*[a-z]+[\t\s]*[=][\t\s]*(\"[a-z0-9]+\"|[0-9]*)[\t\s]*[;][\t\s]*$/gim, '_variableValue');
      }
    }
        return _str;
}

function detect_output(_str)
{
  // work with VARIABLES
  _str = _str.replace(/^[\t\s]*output[\s\t]*:[\s\t\n]*(real|bool|string)[\s\t]*[;][\s\t]*$/gim,'_output');
  return _str;
}

function detect_input(_str)
{
  // work with VARIABLES
  _str = _str.replace(/[\t\s]*input[\s\t]*:[\s\t]*$/gim,'_input');
  return _str;
}

function detect_return(_str)
{
  // work with VARIABLES
  _str = _str.replace(/^[\t\s]*return[\s\t]+(.*)[\s\t]*;[\s\t]*$/gim, '_return');
  return _str;
}

function detect_module(_str)
{
  // work with VARIABLES
  _str = _str.replace(/^[\t\s]*module[\s]+.+[\s\t]*$/gim,'_module');
  return _str;
}

function detect_write(_str)
{
  // work with VARIABLES
  _str = _str.replace(/^[\s\t]*write[\s\t]+[\".*\"][;][\s\t]*$/gim,'_write');
  return _str;
}

function detect_read(_str)
{
  // work with VARIABLES
  _str = _str.replace(/^[\t\s]*read[\s]+.*[;]$/gim,'_read');
  return _str;
}

function detect_if(_str)
{
  // work with VARIABLES
  _str = _str.replace(/^[\t\s]*if[\s\t]+(.+)[\s\t]+then[\s\t]*$/gim,'_if');
  return _str;
}

function detect_begin(_str)
{
  // work with VARIABLES
  _str = _str.replace(/^[\t\s]*begin[\s\t]*$/gim,'_begin');
  return _str;
}

function detect_end(_str)
{
  // work with VARIABLES
  _str = _str.replace(/^[\t\s]*end[\t\s]*$/gim,'_end');
  return _str;
}

function detect_else(_str)
{
  // work with VARIABLES
  _str = _str.replace(/^[\s\t]*else[\s\t\n]*$/gim,'_else '); //fgggggggggggggggggggggggggggggggggggggg
  return _str;
}

function filter_while(_str)
{
  // work with VARIABLES
  _str = _str.replace(/^[\s\t]*while[\s\t]+.*[\s\t]*$/gim,'_while ');
  return _str;
}


/**
 * [checkSyntax description]
 * @param  {[type]} _input [description]
 * @return {[type]}        [description]
 */
function checkSyntax(_input)
{
  var hasError = false;
  var myCode   = _input;

  // foreach token, find this token is used
  $.each(TOKENS, function( token, value )
  {
    if(myCode)
    {
      var count   = myCode.split(token).length - 1;

      // token = $.trim(token);
      myCode      = strReplaceAll(myCode, token, '');
    }
  });

  // console.log(myCode);
  // console.log("myErrors: "+myCode+"\t");


  // find code number above this line
  myCode = $.trim(myCode);


  // show code errors
  myErrors = myCode;
  var showErrors = document.querySelectorAll("#compiledCode code");
  showErrors[0].innerHTML = myErrors;
  console.log(myErrors);


  // if something remain then we have error on code
  if(myCode.length)
  {
    hasError = true;
  }

  // change status of codes
  if(hasError)
  {
    $('#editor').addClass('fault');
  }
  else
  {
    $('#editor').removeClass('fault');
  }

}

function strReplaceAll(string, Find, Replace) {
    try {
        return string.replace( new RegExp(Find, "gi"), Replace );
    } catch(ex) {
        return string;
    }
}



$(document).ready(function()
{
    $('#newCode').keyup(function()
    {
       detectKeywords();
    });

});
