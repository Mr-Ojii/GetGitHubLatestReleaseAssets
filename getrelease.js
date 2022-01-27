window.onload = (() => {
    let query = location.search;
    let url = "";
    let pre = 0;
    let search = "";
    if (query != "") {
        query = query.slice(1);
        let param = query.split('&');
        for (let i = 0; i < param.length; i++) {
            let element = param[i].split('=');

            let paramName = decodeURIComponent(element[0]);
            let paramValue = decodeURIComponent(element[1]);
            if (paramName == "url") {
                url = paramValue;
            }
            else if (paramName == "pre") {
                pre = paramValue;
            }
            else if (paramName == "search") {
                search = paramValue
            }
        }
        if (url.startsWith("https://api.github.com/repos/")) {
            getrelease(url, pre, search);
        }
    }
})

function getrelease(url, pre, search) {
    let request = new XMLHttpRequest();
    request.open('GET', url);
    request.onreadystatechange = function () {
        if (request.readyState != 4) {
        } else if (request.status != 200) {
            document.getElementById("warning").innerHTML = "Failed."
        } else {
            let isexist = false;
            let searchsuccess = true;
            let obj = JSON.parse(request.responseText);
            for (let i = 0; i < obj.length; i++) {
                if (obj[i].prerelease == pre && obj[i].assets.length != 0) {
                    if (search != "") {
                        for (let j = 0; j < obj[i].assets.length; j++) {
                            if (obj[i].assets[j].name.includes(search)) {
                                location.href = obj[i].assets[j].browser_download_url
                                isexist = true;
                                break;
                            }
                        }
                        if (!isexist) {
                            location.href = obj[i].assets[0].browser_download_url
                            isexist = true;
                            searchsuccess = false;
                        }
                    }
                    else {
                        location.href = obj[i].assets[0].browser_download_url
                        isexist = true;
                    }
                    break;
                }

            }
            if (!isexist) {
                document.getElementById("warning").innerHTML = "Asset files does not exist."
            }
            else if(!searchsuccess) {
                document.getElementById("warning").innerHTML = "Success to get asset file! But, search failed."
            }
            else {
                document.getElementById("warning").innerHTML = "Success!"
            }
        }
    };
    request.send(null);
    document.getElementById("warning").innerHTML = "Searching."
}