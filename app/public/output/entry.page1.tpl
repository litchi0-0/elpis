<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>{{name}}</title>
</head>

<body>
<h1>page1</h1>
<input id="env" value="{{env}}">
<input id="options" value="{{options}}">
</body>
<script type="text/javascript">
try{
    window.env=document.getElementById('env').value;
    const options = document.getElementById('options').value;
    window.options = JSON.parse(options);

}catch(e){
 console.log(e);
}

</script>



</html>