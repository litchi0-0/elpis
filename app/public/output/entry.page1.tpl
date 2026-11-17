<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>{{name}}</title>
    <link href="/static/normalize.css" rel="stylesheet">
    <link href="/static/logo.png" rel="icon" type="image/x-icon">

</head>

<body style="color:blue;">
<h1>page1</h1>
<input id="env" value="{{env}}" style="display:none">
<input id="options" value="{{options}}" style="display:none">
<button onclick= "handleClick()">发送请求</button>
</body>
<script src="https://unpkg.com/axios@1.6.7/dist/axios.min.js"></script>
<script src=" https://cdn.jsdelivr.net/npm/js-md5@0.9.2/src/md5.min.js"></script>
<script type="text/javascript">
try{
    window.env=document.getElementById('env').value;
    const options = document.getElementById('options').value;
    window.options = JSON.parse(options);

}catch(e){
 console.log(e);
}
const handleClick=() =>{
    const signKey = 'fdsafdsafaeadfaeghaogh';
    const st = Date.now();
    axios.request({
        method:'get',
        url:'/api/project/list',
        data:{a:1,b:2,c:3},
        headers:{
            s_t:st,
            s_sign:md5(`${signKey}_${st}`)
        }
    })
}
</script>



</html>