
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
