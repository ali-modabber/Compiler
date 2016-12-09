run();

/**
 * run all of needed functions
 * @return {[type]} [description]
 */
function run()
{
	// declare variables
	var userCode = getEditorValue().toLowerCase().trim();
	var myCode   = userCode;
	var jsCode   = "";

	// run needed functions
	myCode = detectComments(myCode);
	myCode = detectFunctions(myCode);

	// set compiled value in specefic aria in editor
	setCompiledValue(myCode);
}


function detector(_code)
{
	var result = [];
	for (i = 1; i < arguments.length; i++)
	{
		var searchResult   = "";
		var searchName     = arguments[i][0];
		var searchStartTxt = arguments[i][1];
		var searchEndTxt   = arguments[i][2];
		var searchStart    = 0;
		var searchStartRaw = 0;
		var searchEnd      = _code.length;
		var searchEndEnd   = searchEnd;
		// if we have start search argument
		if(searchStartTxt)
		{
			var splited = searchStartTxt.split('|');
			$.each(splited, function(index, el)
			{
				searchExist = _code.indexOf(el);
				if(searchExist >= 0)
				{
					searchStartRaw = searchExist;
					searchStart    = searchStartRaw + el.length;
					return false;
				}
			});

		}
		// if we have end search argument
		if(searchEndTxt)
		{
			var splited = searchEndTxt.split('|');
			$.each(splited, function(index, el)
			{
				searchExist = _code.indexOf(el, searchStart);
				if(searchExist >= 0)
				{
					searchEnd    = searchExist;
					searchEndEnd = searchEnd + el.length;
					return false;
				}
			});
		}

		searchResult       		= _code.substring(searchStart, searchEnd);
		if(searchName)
		{
			var findedText      = _code.substring(searchStartRaw, searchEndEnd);
			result['remain']    = _code.replace(findedText, '').trim();
			result[searchName]  = searchResult.trim();
		}
		else
		{
			result = searchResult.trim();
		}
	}

	return result;
}


/**
 * detect number of modules and run generateFuntion for each one
 * @param  {[type]} _rawText [description]
 * @return {[type]}      [description]
 */
function detectFunctions(_rawText)
{
	var result               = "";
	var rawCode              = _rawText;
	var fnExist              = true;
	var myFunctions          = [];
	var myConvertedFunctions = [];

	// detect string of each module and push raw text to array
	while(fnExist)
	{
		var currentFn = extractFunctions(rawCode);

		if(currentFn === null)
		{
			fnExist = false;
		}
		else
		{
			myFunctions.push(currentFn);
			rawCode = rawCode.replace(currentFn, '');
		}
	}

	// run for each function detected
	for (var i = 0; i < myFunctions.length; i++)
	{
		var currentConvertedFn = generateFunction(myFunctions[i]);
		if(currentConvertedFn)
		{
			myConvertedFunctions.push(currentConvertedFn);
		}
	}

	// for each success converted functition
	var seperator = "\n\n// function ...\n";
	result = myConvertedFunctions.join(seperator);

	return result;
}


/**
 * extract text of each function
 * @param  {[type]} _txt [description]
 * @return {[type]}      [description]
 */
function extractFunctions(_txt)
{
	var result  = _txt;
	var f_start = result.indexOf('module');
	var f_begin = result.indexOf('begin');
	var f_end   = result.indexOf('end');
	// if we have module then return it
	if(f_start > 0 && f_begin > 5 && f_end > 9)
	{
		result = result.substring(f_start, f_end+3);
		result = result.trim();
	}
	else
	{
		result = null;
	}

	return result;
}


/**
 * detect all part of module and convert to js valid function
 * @param  {[type]} _txt [description]
 * @return {[type]}      [description]
 */
function generateFunction(_txt)
{
	var str      = _txt;
	var result   = "";
	var fnDetail =
	{
		module : str.indexOf('module'),
		input  : str.indexOf('input'),
		output : str.indexOf('output'),
		begin  : str.indexOf('begin'),
		end    : str.indexOf('end'),
		if     : str.indexOf('if'),
	};

	var name    	= detect_module_name(str, fnDetail);
	var inputs  	= detect_module_input(str, fnDetail);
	var output  	= detect_module_output(str, fnDetail);
	var content 	= detect_module_content(str, fnDetail);
	var condition   = detect_module_condition(str, fnDetail)

	result = 'function ' + name + '(';


	//input convert
	if(inputs)
	{
		result += inputs;
	}
	result += ')' + "\n";
	result += '{' + "\n";


	//contetn convert
	if(content)
	{
		result += content;
	}


	// output convert
	// if(output)
	// {
	// 	result += "\n" + 'return ' + output ;
	// }
	result += '\n'+'}';
	// return generated result
	return result;


	//condition convert
	if(condition)
	{
		console.log(ffffff);
		result += condition;
	}
	result += "if" + "(" + condition + ")";
	// return generated result
	console.log("fffffffff");
	return result;
}


/**
 * detect and remove comments
 * @param  {[type]} _txt [description]
 * @return {[type]}      [description]
 */

function detectComments(_txt)
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

function detect_module_name(_text, _detail)
{
	var myName = detector(_text, [null, 'module', 'input|output|begin']);
	return myName;
}


/**
 * [detect_module_input description]
 * @param  {[type]} _text [description]
 * @return {[type]}       [description]
 */
function detect_module_input(_text)
{
	// detect input part from module
	var myInputs = detector(_text, [null, 'input:', 'output|begin']);
	// detect input name and return string of variable names
	var inputNames = detect_inputs(myInputs, true);
	// return result
	return inputNames;
}


/**
 * detect input and return array
 * @param  {[type]} _text [description]
 * @return {[type]}       [description]
 */
function detect_inputs(_text, _string)
{
	var str    = _text;
	var result = [];
	while(str)
	{
		var myVars = detector(str, ['var', null,':real;|:bool;|:string;']);
		if(myVars['var'])
		{
			str = myVars['remain'];
			result.push(myVars['var']);
		}
		else
		{
			str = '';
		}
	}
	if(_string)
	{
		result = result.join(', ');
	}
	return result;
}


/**
 * [detect_module_output description]
 * @param  {[type]} _text [description]
 * @return {[type]}       [description]
 */
function detect_module_output(_text)
{
	var str    = _text;
	var result = null;
	str = str.match(/^[\n\s\t]*output[\t\s]*:[\t\s]*(real|bool|string)[\t\s]*;{1}[\n\s\t]*(begin)/gim);
	return result;
}


/**
 * detect content and return array
 * @param  {[type]} _text [description]
 * @return {[type]}       [description]
 */
function detect_content(_text, _string)
{
	var str    = _text;
	var result = [];
	while(str)
	{
		var myVars = detector(str, ['var', null,'end']);
		if(myVars['var'])
		{
			str = myVars['remain'];
			result.push(myVars['var']);
		}
		else
		{
			str = '';
		}
	}
	if(_string)
	{
		result = result.join(', ');
	}

	return result ;
}


/**
 * [detect_module_content description]
 * @param  {[type]} _text [description]
 * @return {[type]}       [description]
 */
function detect_module_content(_text)
{
	// detect input part from module
	var mycontent = detector(_text, [null, 'begin', 'End']);
	// detect input name and return string of variable names
	var contentsNames = detect_content(mycontent, true);
	// return result
	return contentsNames;
}


/////////////////////////////////////////
 function detect_condition(_text, _string)
 {
 	var str    = _text;
 	var result = [];
 	while(str)
 	{
 		var myVars = detector(str, ['var', 'if', 'then']);
 		if(myVars['var'])
 		{
 			str = myVars['remain'];
 			result.push(myVars['var']);
 		}
 		else
 		{
 			str = '';
 		}
 	}
 	if(_string)
 	{
 		result = result.join(', ');
 	}

 	return result ;
 }

function detect_module_condition(_text)
{
	// console.log("fffffffff");
	// detect input part from module
	var mycondition = detector(_text, [null, 'if', 'then']);
	// detect input name and return string of variable names
	var conditionNames = detect_condition(mycondition, true);
	// return result
	return conditionNames;
}
///////////////////////////


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