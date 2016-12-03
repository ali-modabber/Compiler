/**
 * [detect_module get module and replace with function]
 * @param  {[type]} _text 
 * @return {[type]}       
 */

function detect_module(_text)
{
	var str = _text.replace(/^[\n\s\t]*module[\s\t]+([a-z_]+)/gim, function(_content, _name){
		return 'function ' + _name + '(';
	});
	return str;		
}

function detect_input(_text)
{
	var str = _text;
	str = str.match(/[\n\s\t]*input[\t\s]*:((?!output).)+([\n\t\s]*output)/gim);
	console.log(str);
	return str;	
}

function detect_output(_text)
{
	var str = _text;
	str = str.match(/^[\n\s\t]*output[\t\s]*:[\t\s]*(real|bool|string)[\t\s]*;{1}[\n\s\t]*(begin)/gim);
	return ;	
}

function detect_content(_text){
	var str = _text;
	str = str.match(/^[\n\s\t]*begin\n([\s\t\n]*(.*))\n[\n\s\t]*end/gmi);
	return str;	
}










function detect_keywords(_text)
{
	var str = _text;
	return str;	
}

function detect_module(_text)
{
	var str = _text;
	return str;	
}

function detect_comment(_text)
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