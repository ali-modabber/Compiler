<?php

function print_token()
{
	$my_tokens = '';
	if ($_SERVER["REQUEST_METHOD"] == "POST")
	{
		if (isset($_POST['user_code']))
		{
			$string = $_POST['user_code'];
			$string = trim(preg_replace('/\s\s+/', ' ', $string));

			$my_words = explode(" ",$string);
			$syntax = ["while","if","begin","end","then","bool","real","string","write","read","true","false","module","input","output","id"];
			foreach ($my_words as $key => $value)
			{
				$counter = 0;
				foreach ($syntax as $key => $syntax_value)
				{
					if ($value == $syntax_value)
					{
						$counter++;

						$my_tokens .= "<span class='red'>".$value."</span>";
					}
				}

			}
		}
	}
return $my_tokens;
}


function fapla_code()
{
	$code_str = '';
	if ($_SERVER["REQUEST_METHOD"] == "POST")
	{
		if (isset($_POST['user_code']))
		{
			$code_str = $_POST['user_code'];
			$code_str = trim(preg_replace('/\s\s+/', ' ', $code_str));
		}
			return $code_str;
	}
}



	if ($_SERVER["REQUEST_METHOD"] == "POST")
	{
		if (isset($_POST['user_code']))
		{
			$string = $_POST['user_code'];
		}
	}
$stringi = "i'm going there. x=22;";
$x = strlen($stringi);

for ($i=0; $i < $x; $i++) {
	// echo($stringi[$i]);
	if ($stringi[$i] == " ") {
		// echo " (space) ";
	}

}

?>
