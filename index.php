<?php require_once "function.php"; ?>
<!DOCTYPE html>
<html>
<head>
  <title>Ali's Compiler</title>
  <link rel="stylesheet" href="static/css/ermile.css">
  <link rel="stylesheet" href="static/css/style.css">
</head>

<body>
  <form method="post" class="row compiler">
    <div class="span9">
      <div class="row" id='editor'>
        <div class="span10">
          <textarea id="newCode" name="user_code" placeholder="Write your code here..."></textarea>
          <input type="file" name="file" id="file" accept=".fapla" />
          <label class="custom-file-upload" for="file"><strong>upload File</strong></label>
          <input type="submit" class="run_btn" value="Run" />
        </div>
        <div class="span2" id='keywords'><?php echo print_token(); ?></div>
      </div>
      <pre id="compiledCode">
        <code class="php"><?php echo(fapla_code()); ?></code>
      </pre>
    </div>

    <div class="span3 result"></div>
  </form>

  <!-- <script src="static/js/common.js"></script> -->
  <script src="static/js/jquery-3.1.1.min.js"></script>
  <script src="static/js/script.js"></script>
  <script src="static/js/highlight.pack.js"></script>
  <script>hljs.initHighlightingOnLoad();</script>
</body>
</html>