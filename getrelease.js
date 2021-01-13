window.onload=(()=>{
let query = location.search;
let url = "";
let pre = 0;
if(query != "")
{
	query = query.slice(1);
	let param = query.split('&');
	for(let i=0;i<param.length;i++)
	{
		let element = param[ i ].split( '=' );

		let paramName = decodeURIComponent( element[ 0 ] );
		let paramValue = decodeURIComponent( element[ 1 ] );
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
	let request = new XMLHttpRequest();
	request.open('GET', url);
	request.onreadystatechange = function () {
		if (request.readyState != 4) {
		} else if (request.status != 200) {
			document.getElementById("warning").innerHTML="<h1>Failed.</h1>"
		} else {
			let isexist=false;
			let obj=JSON.parse(request.responseText);
			for(let i=0;i<obj.length;i++)
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