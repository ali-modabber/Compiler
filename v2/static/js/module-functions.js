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
	// console.log(myContent);
	// result = detect_while(result);
	result = detect_if(result);
	// detect_block();
	//
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
		// var check 	 = false;
		// var ifelse    = detector(str, ['body','if', 'else']);
		if(ifcond['cond'] && ifblockstart['block'] && ifblockend['block'])
		{
			var ifbodyblock = detector(str, ['body','{', '}']);

			// we have if with block of code
			str = ifblockend['remain'];
			var iffinded = '\tif ('+ ifcond.cond + ")\n\t{\n\t\t" + ifbodyblock.body + "\n\t}";
			result.push(iffinded);
			check = true;
		}
			// console.log(str);
		else if(ifcond['cond'] && iftotal['total'] && ifbody['body'])
		{
			// we have a new if
			// remove string with new one without totalif
			str = iftotal['remain'];
			// console.log(iftotal['remain'])
			if(seperatorNotExist(ifcond['cond']))
			{
				// current if is true create text of if in js
				var iffinded = '\tif ('+ ifcond.cond + ")\n\t{\n\t\t" + ifbody.body + ";\n\t}";
				result.push(iffinded);
				// console.log(result);
				// var rem = str.indexOf(result[iffinded]);
				// var len = result.length;
				// console.log(result[iffinded]);
				check = true;
			}
			else
			{
				hasError = true;
			}
		}
		else
		{
			// console.log('end');
			str = '';
		}
	}
//get remain of code

	if(check == true)
	{
		console.log("ffffffffff");
	}

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

function detect_while(_text)
{
	var str          = _text;
	var result       = [];
	var hasError     = false;

	while(str)
	{
		var whiletotal      = detector(str, ['total','while', ';']);
		var whilecond       = detector(str, ['cond','while', 'then']);
		var whilebody       = detector(str, ['body','then', ';']);

		var whileblockstart = detector(str, ['block','while', '{']);
		var whileblockend   = detector(str, ['block','while', '}']);

		// var whileelse    = detector(str, ['body','while', 'else']);

		if(whilecond['cond'] && whileblockstart['block'] && whileblockend['block'])
		{
			var whilebodyblock = detector(str, ['body','{', '}']);
			// we have while with block of code
			str = whileblockend['remain'];

			var whilefinded = '\twhile ('+ whilecond.cond + ")\n\t{\n\t\t" + whilebodyblock.body + "\n\t}";
			result.push(whilefinded);

		}
		else if(whilecond['cond'] && whiletotal['total'] && whilebody['body'])
		{
			// we have a new while
			// remove string with new one without totalwhile
			str = whiletotal['remain'];
			if(seperatorNotExist(whilecond['cond']))
			{
				// current while is true create text of while in js
				var whilefinded = '\twhile ('+ whilecond.cond + ")\n\t{\n\t\t" + whilebody.body + ";\n\t}";
				result.push(whilefinded);
			}
			else
			{
				hasError = true;
			}
		}
		else
		{
			// console.log('end');
			str = '';
		}
	}
	// console.log(result);
	if(hasError)
	{
		window.errorExist['while'] = true;
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