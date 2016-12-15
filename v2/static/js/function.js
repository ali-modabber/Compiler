window.errorExist = [];
run();


/**
 * [seperatorNotExist description]
 * @param  {[type]} _text [description]
 * @return {[type]}       [description]
 */
function seperatorNotExist(_text)
{
	var result     = true;
	var seperators = [' ', "\n", "\t"];

	seperators.forEach(function(el)
	{
		if(_text.indexOf(el) >=0)
		{
			result = false;
			return false;
		}
	});

	return result;
}


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

	if(Object.keys(window.errorExist).length)
	{
		// add class
		$('.error').fadeIn();
	}
	else
	{
		$('.error').fadeOut();
	}

}


/**
 * detect inout string and return needed if find it
 * @param  {[type]} _code [description]
 * @return {[type]}       [description]
 */
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
		var searchEnd      = null;
		var searchEndEnd   = null;
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

		if(searchEnd)
		{
			searchResult = _code.substring(searchStart, searchEnd);
			searchResult = searchResult.trim()

			if(searchName)
			{
				var findedText      = _code.substring(searchStartRaw, searchEndEnd);
				result['remain']    = _code.replace(findedText, '').trim();
				result[searchName]  = searchResult;
			}
			else
			{
				result = searchResult;
			}
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
	var result    = "";
	var str       = _txt;
	var name      = detect_module_name(str);
	var inputs    = detect_module_input(str);
	var output    = detect_module_output(str);
	var content   = detect_module_content(str);

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

function detect_module_name(_text)
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
	var str      = _text;
	var result   = [];
	var hasError = false;
	// console.log(str);
	while(str)
	{
		var myVars = detector(str, ['var', null ,':real;|:bool;|:string;']);

		if(myVars['var'])
		{
			str = myVars['remain'];

			// console.log(myVars['remain']);
			if(seperatorNotExist(myVars['var']))
			{
				result.push(myVars['var']);
			}
			else
			{
				hasError = true;
			}
		}
		else
		{
			if($.isArray(myVars))
			{
				hasError = true;
			}
			str = '';
		}
	}


	if(hasError)
	{
		window.errorExist['input'] = true;
		// window.errorExist.push('input');
		result = '#ERROR#';
	}
	else
	{
		delete window.errorExist.input;

		if(_string)
		{
					// console.log(myVars['remain']);
			result = result.join(', ');
		}
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

	return result;
}


/**
 * [detect_module_content description]
 * @param  {[type]} _text [description]
 * @return {[type]}       [description]
 */
function detect_module_content(_text)
{
	// detect input part from module
	var str       = _text;
	var myContent = detector(str, [null, 'begin', 'end']);
	var result    = myContent;
	console.log(myContent);


	result = detect_if(result);




	// detect input name and return string of variable names
	// var contentsNames = detect_content(myContent, true);
	// return result
	return result;
	// console.log(mycondition);
}


function detect_if(_text)
{
	var str          = _text;
	var result       = [];
	var hasError     = false;

	while(str)
	{
		var iftotal      = detector(str, ['total','if', ';']);
		var ifcond       = detector(str, ['cond','if', 'then']);
		var ifbody       = detector(str, ['body','then', ';']);

		var ifblockstart = detector(str, ['block','if', '{']);
		var ifblockend   = detector(str, ['block','if', '}']);


		// var ifelse    = detector(str, ['body','if', 'else']);

		if(ifcond['cond'] && ifblockstart['block'] && ifblockend['block'])
		{
			var ifbodyblock = detector(str, ['body','{', '}']);
			// we have if with block of code
			str = ifblockend['remain'];

			var iffinded = '\tif ('+ ifcond.cond + ")\n\t{\n\t\t" + ifbodyblock.body + ";\n\t}";
			result.push(iffinded);

		}
		else if(ifcond['cond'] && iftotal['total'] && ifbody['body'])
		{
			// we have a new if
			// remove string with new one without totalif
			str = iftotal['remain'];

			if(seperatorNotExist(ifcond['cond']))
			{
				// current if is true create text of if in js
				var iffinded = '\tif ('+ ifcond.cond + ")\n\t{\n\t\t" + ifbody.body + ";\n\t}";
				result.push(iffinded);
			}
			else
			{
				hasError = true;
			}
		}
		else
		{
			console.log('end.....');
			str = '';
		}


	}



	console.log(result);





	if(hasError)
	{
		window.errorExist['if'] = true;
		// window.errorExist.push('input');
		result = '#ERROR#';
	}
	else
	{
		delete window.errorExist.input;

		// if(_string)
		// {
		// 			// console.log(myVars['remain']);
		// 	result = result.join(', ');
		// }
	}

	return result;




}


function detect_module_while(_text)
{
	var str 	  =  _text;
	var end  	  =  detector(_text, [null , 'while' , '\n']);
	var so 	  	  =  detector(_text, [null , 'while' , '\n']);
	var _while;

		// var myVars = detector(str, [null, 'then', 'end']);
		if (so && end)
		{
			 _while ="while" + " " + "(" + so + ")" + '\n' +"{";
			// return while;
			// console.log(while);
		// console.log(_while);
		}
		else
		{
			str = '';
		}
		return _while;
	}


function detect_keywords(_text)
{
	var str = _text;
		for (var i = 0; i < Things.length; i++)
		{
			Things[i]
		}
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


function lang_keywords(_text)
{
	var str = _text;
	return str;
}