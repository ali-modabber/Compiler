run();
/**
 * run all of needed functions
 * @return {[type]} [description]
 */
function run()
{
	// declare variables
	var userCode = getEditorValue();
	var myCode   = userCode;
	var jsCode   = "";

	// run needed functions
	myCode = detect_comments(myCode);
	// myCode = generateFunction(myCode);

	// set compiled value in specefic aria in editor
	setCompiledValue(myCode);
}

function generateFunction(_txt)
{
	var result  = "";
	var name    = detect_module_name(_txt);
	var inputs  = detect_module_input(_txt);
	var output = detect_module_output(_txt);
	var content = detect_module_content(_txt);
	console.log(name);

	result = 'function ' + name + '(' + inputs + ')' + "\n";
	result += '{' + "\n";
	result += content;
	if(output)
	{
		result += "\n" + 'return ' + output ;
	}
	result += "\n" +'}';

	// return generated result
	return result;
}

/**
 * detect and remove comments
 * @param  {[type]} _txt [description]
 * @return {[type]}      [description]
 */
function detect_comments(_txt)
{
	result = _txt;
	// remove multi line comments
	result = result.replace(/%%%(?:(?!%%%)[\s\S\n])*%%%/gim, '/* comment */');
	// remove one line comments
	result = result.replace(/%%.*/gi, '// comment');

	return result;
}




/**
 * [detect_module_name get module and replace with function]
 * @param  {[type]} _text
 * @return {[type]}
 */

function detect_module_name(_text)
{
	str = _text;
	// var str = _text.replace(/^[\n\s\t]*module[\s\t]+([a-z_]+)/gim, function(_content, _name){
	// 	return _name;
	// });
	return str;
}

function detect_module_input(_text)
{
	var str = _text;
	str = str.match(/[\n\s\t]*input[\t\s]*:((?!output).)+([\n\t\s]*output)/gim);
	// console.log();
	return str;
}

function detect_module_output(_text)
{
	var str = _text;
	str = str.match(/^[\n\s\t]*output[\t\s]*:[\t\s]*(real|bool|string)[\t\s]*;{1}[\n\s\t]*(begin)/gim);
	return ;
}

function detect_module_content(_text){
	var str = _text;
	str = str.match(/^[\n\s\t]*begin\n([\s\t\n]*(.*))\n[\n\s\t]*end/gmi);
	return str;
}










function detect_keywords(_text)
{
	var str = _text;
	return str;
}



function detect_write(_text)
{
	var str = _text;
	str = str + a;
	return str;
}

function detect_real(_text)
{
	var str = _text;
	return str;
}

function detect_if(_text)
{
	var str = _text;
	return str;
}

function detect_while(_text)
{
	var str = _text;
	return str;
}

function new_code(_text)
{
	var str = _text;
	str = str
	return str;
}

function js_code(_text)
{
	var str = _text;
	return str;
}

function my_code(_text)
{
	var str = _text;
	return str;
}

function my_function(_text)
{
	var str = _text;
	return str;
}

function my_variables(_text)
{
	var str = _text;
	return str;
}

function lang_keywords(_text)
{
	var str = _text;
	return str;
}