window.onload=(()=>{
var query = location.search;
var url = "";
var pre = 0;
if(param != "")
{
	query = query.slice(1);
	var param = query.split('&');
	for(var i=0;i<param.length;i++)
	{
		var element = param[ i ].split( '=' );

		var paramName = decodeURIComponent( element[ 0 ] );
		var paramValue = decodeURIComponent( element[ 1 ] );
		if(paramName == "url")
		{
			url=paramValue;
		}
		else if(paramName == "pre")
		{
			pre=paramValue;
		}
	}
	if(url.startsWith("https://api.github.com/repos/"))
	{
		getrelease(url,pre);
	}
}
})

function getrelease(url,pre)
{
	var request = new XMLHttpRequest();
	request.open('GET', url);
	request.onreadystatechange = function () {
		if (request.readyState != 4) {
		} else if (request.status != 200) {
			document.getElementById("warning").innerHTML="<h1>Failed.</h1>"
		} else {
			var isexist=false;
			var obj=JSON.parse(request.responseText);
			for(var i=0;i<obj.length;i++)
			{
				if(obj[i].prerelease==pre)
				{
					if(obj[i].assets[0]!=null){
						location.href=obj[i].assets[0].browser_download_url
						isexist=true;
					}
					break;
				}
				
			}
			if(!isexist)
			{
				document.getElementById("warning").innerHTML="<h1>Asset files does not exist.</h1>"
			}
			else
			{
				document.getElementById("warning").innerHTML="<h1>Success!</h1>"
			}
		}
	};
	request.send(null);
}