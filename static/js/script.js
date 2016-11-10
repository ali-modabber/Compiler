var VARIABLES = {};
var TOKENS    =
{
  // ---------- while
  "while "          : 'while',
  // ---------- if
  "if "             : 'if',
  "if("             : 'if',
  "if\n"            : 'if',
  " then "          : 'then',
  "\tthen "         : 'then',
  "\nthen "         : 'then',
  "\tthen "         : 'then',
  "\nthen\n"        : 'then',
  "\tthen\n"        : 'then',
  "then\n"          : 'then',
  "else "           : 'else',
  "else\n"          : 'else',
  "\nelse"          : 'else',
  "\telse"          : 'else',
  "\nelse\n"        : 'else',
  "\telse\n"        : 'else',

  // ---------- read write
  "write "          : 'write',
  "read "           : 'read',

  // ---------- module
  "for"             : 'for',
  " begin "         : 'begin',
  "\nbegin"         : 'begin',
  "\tbegin"         : 'begin',
  "\nbegin\n"       : 'begin',
  "\tbegin\n"       : 'begin',
  " end "           : 'end',
  "\nend"           : 'end',
  "\tend"           : 'end',
  "\nend\n"         : 'end',
  "\tend\n"         : 'end',
  ":bool"           : 'bool',
  ":real"           : 'real',
  ":string"         : 'string',
  "true"            : 'true',
  "false"           : 'false',
  "module "         : 'module ',

  "input:"          : 'input',
  "input: "         : 'input',
  " input: "        : 'input',

  "output:"         : 'output',
  "output: "        : 'output',
  " output: "       : 'output',

  " return "        : 'return',
  "\nreturn "       : 'return',
  "\treturn "       : 'return',
  " return("        : 'return',
  "\nreturn("       : 'return',
  "\treturn("       : 'return',

  // ---------- comments
  "!..comment..!"   : 'comment',
  "!.comment.!"     : 'comment',

  // ---------- comments
  "variable"        : 'variable',

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
  // detect variables
  detect_variables(myCode);
  // run filter of while
  myCode = filter_while(myCode);


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
  _str = _str.replace(/%%%(?:(?!%%%)[\s\S\n])*%%%/gim, '!..comment..!');
  // remove one line comments
  _str = _str.replace(/%%.*/gi, '!.comment.!');
  return _str;
}

function detect_variables(_str)
{
  // work with VARIABLES
  // console.log(_str);
  var remove_variables = _str.match(/^(([^:])+:|([^=]+)=)(real|bool|string)$/)
  if (remove_variables)
  {
    myVariables = remove_variables[0];
    if (_str == myVariables)
    {
      // console.log('variable');
      myVariables = myVariables.replace(/^(([^:])+:|([^=]+)=)(real|bool|string)$/, 'variable');
      console.log(myVariables);
    }
  }
}

function filter_while(_str)
{
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


  // find code number above this line
  myCode = $.trim(myCode);

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
