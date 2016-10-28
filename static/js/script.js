var tokens =
{
  // ---------- while
  "while ": 'while',
  // ---------- if
  "if ": 'if',
  "if(": 'if',
  " then": 'then',
  "\nthen ": 'then',
  "\nthen\n": 'then',
  "then\n": 'then',
  "else ": 'else',
  "else\n": 'else',
  "\nelse": 'else',
  "\nelse\n": 'else',

  // ---------- read write
  "write ": 'write',
  "read ": 'read',



  // ---------- module
  "for"         : 'for',
  "begin"       : 'begin',
  "end"         : 'end',
  ":bool"       : 'bool',
  ":real"       : 'real',
  ":string"     : 'string',
  "true"        : 'true',
  "false"       : 'false',
  "module "     : 'module ',
  "input:"      : 'input',
  "output:"     : 'output',
  "id"          : 'id',
  "return "     : 'return ',
  "return("     : 'return',
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



function detectKeywords()
{
  var newCode        = $('#newCode').val();
  var findedKeywords = [];
console.log(tokens);
  $.each(tokens, function( token, value )
  {
    // console.log(value);
    // remove extra char at last of string
    // if(value.substr(-1) === ':' || value.substr(-1) === '(' || value.substr(-1) === ' ' || value.substr(-2) === '\n'
    //   || value.substr(2) === '\n')
    // {
    //   value = value.substr(0 , value.length -1);
    // }

    // var count = (newCode.match(/value/g) || []).length;
    var count = newCode.split(value).length - 1;

    // if we can find keyword, add to keywords location
    if(count)
    {
      // save result in new array
      findedKeywords[value] = count;
    }
    // else
    // {
    //     // $('#keywords [data-keyword="'+value+'"]').html('');
    // }

  });

    console.log(findedKeywords);

  $.each(findedKeywords, function( i, val ) {
  });


  $.each(findedKeywords, function( key, count )
  {
    console.log("1233333");
      $('#keywords').html('');
      console.log(key);
      console.log(key + ': '  + count);
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
}


$(document).ready(function()
{
    $('#newCode').keyup(function()
    {
       detectKeywords();
    });


});














