function teory(_str)
{
	_str = _str.replace(/^[\n\s\t]*module[\s\t]+([a-z_]+)/gim;
		// module_name = _module_name;
		console.log(_module_name);
		_module_name_js = "function "+_module_name+"(";
		console.log(_module_name_js);
		setCompiledValue(_module_name_js);
		return '';
	);
		_str = _str.replace(/[\n\s\t]*input[\t\s]*:\n([\s\t\n]*[a-z]+[\t\s]*:[\t\s]*(real|bool|string)[\t\s]*;)+[\n\s\t]*(output)/gim;
		var values = arguments[0].match(/([a-z]+[\s\t]*:[\s\t]*(bool|real|string))/igm);
		fn_arguments = values;
		input_js = values + ")" + "{";
		console.log(input_js);
		setCompiledValue(input_js);
		return 'output';
	);
	var output_type, _output_type;
		_str = _str.replace(/^[\n\s\t]*output[\t\s]*:[\t\s]*(real|bool|string)[\t\s]*;{1}[\n\s\t]*(begin)/gim, function(_find){
		var output_type = arguments[0].match(/([a-z]+[\s\t]*:[\s\t]*(bool|real|string))/gi);
		// output_type = _output_type;
		output_js = values + ")";
		console.log(input_js);
		return 'begin';
	});
	// 	var Input_Variable,_Input_Variable ;
	// 	_str = _str.replace(/^[\n\s\t]*input[\t\s]*:\n([\s\t\n]*[a-z]+[\t\s]*:[\t\s]*(real|bool|string)[\t\s]*;)+[\n\s\t]*(begin)/gim, function(_find){
	// 	var Input_Variable= arguments[0].match(/([\s\t]*:[\s\t]*(bool|real|string))/gi);
	// 	// Input_Variable = _Input_Variable;
	// 	return 'begin';
	// });
	var code_block, content;
	_str = _str.replace(/^[\n\s\t]*begin\n([\s\t\n]*(.*))\n[\n\s\t]*end/gmi, function(_find){
		var code_block = arguments[0].match(/^[\n\s\t]*begin\n[\s\t\n]*(.*)\n[\n\s\t]*end/gmi);
		// content = code_block;
		code_block = "}";
		console.log(code_block);
		return '';
	});
	var end
	end = /\n[\n\s\t]*end/gmi//;
}
// var str = "module function_one \ninput:\n x:real;\n	y:string;\n	b:bool;\noutput:real;\nbegin\n	return x*y;\nend \n %%%www salsdf fuck fsfdewsd24345erj656y7567ty34u324u324$^ %%%%";
// str += "\nmodule function_two \ninput:\n	r:real;\n	t:string;\n	s:bool;\noutput:real;\nbegin\n	return r*s;\nend \n %%%www salsdf fuck fsfdewsd24345erj656y7567ty34u324u324$^ %%%%";
var str = ($("#editor").text());
// str = str.tostring();
str = str.match(/(module(?:(?!end)[\s\S\n])*end)/gim);
// console.log(str);
// setCompiledValue('var a;');
if(str != null){
	for (var i = 0; i < str.length; i++) {
		teory(str[i]);
	}
}
else
{
	console.log("Error");
}
// function function_one(x, y, b)
// {
// 	var x = parseInt(x);
// 	var y = new String(y);
// 	var b = new Boolean(b);
// 	return paresInt(z*y);
// }

// function main()


