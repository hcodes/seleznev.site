// Text photo generator v1.0 for PhotoShop
// © 2009 Denis Seleznev, info@webfilin.ru, http://webfilin.ru

#target photoshop
// $.level = 2;

if (!app.documents.length) {
    alert('Пожалуйста, перед запуском скрипта загрузите фотографию в Photoshop.');
}
else {
    var docRef = app.activeDocument;
    var text = '';
    var html = '';
    docRef.suspendHistory('Text photo', 'generateTextPhoto()');
    dialogSave(textPhotoData.formatData);
    docRef = null;
}

function generateTextPhoto() {

    html = "<!DOCTYPE html>\n<html>\n<head>\n<meta charset=\"utf-8\" />\n<title>Текстовая фотография</title>\n" +
        "<style>\nhtml, body {\nmargin:0; padding:0; background-color:#" + textPhotoData.backgroundColor + ";\n}\n\n" +
        "#text-photo {\nwhite-space:nowrap;\nfont-family:" + textPhotoData.fontFamily + ";\n" +
        "font-size:" + textPhotoData.fontSize + "px;\n" +
        "overflow:hidden;\n" +
        "line-height:" + textPhotoData.lineHeight + "px;\n" +
        "height:" + textPhotoData.height + "px;\n" +
        "width:" + textPhotoData.width + "px;\n}\n</style>\n" +
        "</head>\n<body>\n<div id=\"text-photo\">\n";
    text = 'var textPhotoData={width:' + textPhotoData.width +
                    ', height:' + textPhotoData.height +
                    ', backgroundColor:"' + textPhotoData.backgroundColor +
                    '", fontSize:' + textPhotoData.fontSize +
                    ', fontFamily:"' + textPhotoData.fontFamily.replace(/&quot;/g, '"') +
                    '", lineHeight:' + textPhotoData.lineHeight + ', data:[';

    var cs = docRef.colorSamplers.add(Array(0,0));
    var obj = textPhotoData.data;
    var width = textPhotoData.width;
    var height = textPhotoData.height;

    if (docRef.width < width)    width = docRef.width;
    if (docRef.height < height)    height = docRef.height;

    for (var i = 0; i < obj.length; i++) {
        var x = obj[i].left;
        var y = obj[i].top;
        var w = obj[i].width;
        var h = obj[i].height;

        if (obj[i].br) {
            text += ",{br:true}\n";
            html += "<br />\n";
            continue;
        }

        if ((x + w) < width && (y + h) < height && w > 0 && h > 0 && x >= 0 && y >= 0) {
            docRef.selection.select(new Array (new Array(x, y),new Array(x + w, y), new Array(x + w, y + h), new Array(x, y + h)), SelectionType.REPLACE, 0, false);
            docRef.activeLayer.applyAverage();
            cs.move(Array(x, y));

            if (i)    text += ",";
            if (!w || !h) {
                text += '{l:" ", r:0, g:0, b:0}';
                html +='<span style="color:rgb(0,0,0);"> </span>';
            }
            else {
                text += '{l:"' + obj[i].letter + '",r:' + Math.floor(cs.color.rgb.red) + ',g:' + Math.floor(cs.color.rgb.green) + ',b:' + Math.floor(cs.color.rgb.blue) + '}';
                html += '<span style="color:rgb(' + Math.floor(cs.color.rgb.red) + ',' + Math.floor(cs.color.rgb.green) + ',' + Math.floor(cs.color.rgb.blue) + ');">' + obj[i].letter + '</span>';
            }
        }
    }

    text += ']};';

    html += "\n</div>\n</body>\n</html>";
}

function writeFile(msg, saveFile) {
    try {
        saveFile.open("w");
        saveFile.encoding = "UTF8";

        //Unicode marker
        saveFile.write("\uFEFF");

        saveFile.write(msg);
        saveFile.close();
    }
    catch (e) {
        alert(e);
    }
    finally {
    }

    return;
}

function dialogSave(formatData) {
    if (formatData == 'html') {
        var saveFile = File.saveDialog("Сохранить файл", "Веб-страница: *.html");
    }
    else {
        var saveFile = File.saveDialog("Сохранить файл", "JavaScript: *.js");
    }

    if (saveFile == null) return;
    if (saveFile.exists) {
         if(!confirm(saveFile.fsName + " уже существует.\rПерезаписать?")) return;
    }

    if (formatData == 'html') {
        writeFile(html, saveFile);
    }
    else {
        writeFile(text, saveFile);
    }
}
