<!DOCTYPE html>
<html>
<head>
 <title>Compiler</title>
 <link rel="shortcut icon" href="static/images/favicon.png"/>
 <link rel="apple-touch-icon" href="static/images/favicon.png">
 <link rel="stylesheet" href="static/css/ermile.css">
 <link rel="stylesheet" href="static/css/style.css">
</head>
<body>
<div class="row">
 <div class="span8">
  <div class="row" >
   <div id="input">
    <div id="typecode">
     <span id="svg">
       <input type="file" name="file" id="file" accept=".fapla" />
       <label for="file"><img src='static/images/upload.svg'></label>
     </span>
     <pre id="editor"><?php include("code.php") ?></pre>
    </div>
    <pre id="compiled"></pre>
   </div>
  </div>
 </div>
 <div class="span4" id="output">
  Hello World;
 </div>
</div>
 <script src="static/js/jquery-3.1.1.min.js"></script>
 <script src="static/js/ace/ace.js"></script>
 <script src="static/js/script.js"></script>
 <script src="compailer.js"></script>
</body>
</html>