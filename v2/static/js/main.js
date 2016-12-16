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

// function detect_module_while(_text)
// {
// 	var str 	  =  _text;
// 	var end  	  =  detector(_text, [null , 'while' , '\n']);
// 	var so 	  	  =  detector(_text, [null , 'while' , '\n']);
// 	var _while;

// 		// var myVars = detector(str, [null, 'then', 'end']);
// 		if (so && end)
// 		{
// 			 _while ="while" + " " + "(" + so + ")" + '\n' +"{";
// 			// return while;
// 			// console.log(while);
// 		// console.log(_while);
// 		}
// 		else
// 		{
// 			str = '';
// 		}
// 		return _while;
// 	}
