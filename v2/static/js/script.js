
var editor = ace.edit("editor");
editor.setTheme("ace/theme/twilight");
editor.session.setMode("ace/mode/javascript");


var compiled = ace.edit("compiled");
compiled.setTheme("ace/theme/twilight");
compiled.session.setMode("ace/mode/javascript");
// compiled.setReadOnly(true);
compiled.setOptions({readOnly: true,highlightActiveLine: false,highlightGutterLine: false,showLineNumbers: false});

compiled.renderer.$cursorLayer.element.style.opacity=0;
compiled.textInput.getElement().disabled=true;



function setValueInEditor(_txt)
{
  editor.session.setValue(_txt);
}


function setCompiledValue(_txt)
{
  compiled.session.setValue(_txt);
}


(function($)
{
  // Add click event handler to button
  $("#file").change(function()
  {
    if (!window.FileReader)
    {
      return alert('FileReader API is not supported by your browser.');
    }
    var $i    = $('#file'); // Put file input ID here
    var input = $i[0]; // Getting the element from jQuery
    if(input.files && input.files[0])
    {
      file = input.files[0]; // The file
      fr = new FileReader(); // FileReader instance
      fr.onload = function ()
      {
        // Do stuff on onload, use fr.result for contents of file
        $("#editor ace_text-input").val(fr.result);
        console.log($("#editor ace_text-input").val());
        setValueInEditor(fr.result);
        // detectKeywords();
      };
      fr.readAsText( file );
    }
    else
    {
      // Handle errors here
      alert( "File not selected or browser incompatible." )
    }
  } );
} )( jQuery );



