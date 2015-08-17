(function (global) {
    // Globals
    function generatewidget(chartid, apiurl, datanode, imagetag, headtag, pricetagval, logotag, sourcetag) {


        if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp = new XMLHttpRequest();
        }
        else {// code for IE6, IE5
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                urldata = JSON.parse(xmlhttp.responseText);
                if (urldata != undefined) {

                    apidata = urldata[datanode];
                    var maindiv = document.getElementById(chartid);
                    maindiv.style.overflowY = 'auto';
                    var widgetlength = apidata.length > 10 ? 10 : apidata.length;
                    for (i = 0; i < widgetlength; i++) {

                        var tempdiv = document.createElement('div');
                        tempdiv.style.cssText = 'clear:both;border-bottom: 1px solid lightgrey;margin-left:10px;margin-right:10px';
                        var imageelement = document.createElement('img');
                        imageelement.style.cssText = 'width:50px;height:50px;float:left;margin-left:10px;';
                        imageelement.src = apidata[i][imagetag];
                        var titletag = document.createElement('p');
                        titletag.innerHTML = apidata[i][headtag];
                        titletag.style.cssText = 'margin-left:10px;margin-top:5px;font-weight:700;color:lightgrey;font-size:15px;position:relative;left:10px';
                        var pricetag = document.createElement('p');
                        pricetag.innerHTML = '&#8377;' + apidata[i][pricetagval];
                        pricetag.style.cssText = 'margin-left:10px;margin-bottom:5px;font-weight:700;color:blue;font-size:15px;position:relative;left:10px';
                        var linktag = document.createElement('a');
                        linktag.href = apidata[i][logotag];
                        linktag.innerHTML = apidata[i][sourcetag].toUpperCase();
                        linktag.target = '_blank';
                        linktag.style.cssText = 'color:blue;font-size:10px;float:right;text-decoration:none;position:relative;top:-18px';
                        tempdiv.appendChild(imageelement);
                        tempdiv.appendChild(titletag);
                        tempdiv.appendChild(pricetag);
                        tempdiv.appendChild(linktag);
                        maindiv.appendChild(tempdiv);

                    }

                    var copyright = document.createElement('div');
                    copyright.style.width = document.getElementById(chartid).style.width;
                    var copyrightptag = document.createElement('a');
                    copyrightptag.innerHTML = 'POWERED BY DW';
                    copyrightptag.target = '_blank';
                    copyrightptag.href = 'http://www.dataweave.co/'
                    copyrightptag.style.cssText = 'float: right;margin-top: 0px;font-size: 10px;color: lightgrey;text-decoration:none';
                    copyright.appendChild(copyrightptag);
                    maindiv.parentNode.insertBefore(copyright, maindiv.nextSibling);

                }
            }
        }
        xmlhttp.open("GET", apiurl, true);
        xmlhttp.send();

    }
    var scripts = document.getElementsByClassName('widgetscript');
    for (j = 0; j < scripts.length; j++) {
        var myScript = scripts[j];
        var apiurl = myScript.getAttribute('data-url');
        var datanode = myScript.getAttribute('data-node');
        var generatetableid = myScript.getAttribute('data-id');
        var image = myScript.getAttribute('data-image');
        var logourl = myScript.getAttribute('data-link');
        var mrp = myScript.getAttribute('data-price');
        var head = myScript.getAttribute('data-head');
        var source = myScript.getAttribute('data-source');
        generatewidget(generatetableid, apiurl, datanode, image, head, mrp, logourl, source);
    }
} ());