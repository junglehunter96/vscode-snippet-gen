export interface Icontent {
  name: string;
  prefix: string;
  body: string;
}

function replaceTab(v: string): string {
  var result = v;
  var tab = "";
  for (var i = 0; i < v.length; i++) {
    var t = v.charAt(i);
    if (t != "  " && t != "	" && t != "    ") {
      break;
    } else {
      tab += "\\t";
      result = result.substring(1);
    }
  }
  return tab + result;
}
// 把s里面的p全部替换为q，存在则替换，不存在则直接返回s
function replaceAllSR(s: string, p: string, q: string): string {
  if (s.indexOf(p) >= 0) {
    var re_w = new RegExp(p, "g");
    s = s.replace(re_w, q);
  }
  return s;
}

// 实时生成snippet
export function generatorCodeSnippet({ name, prefix, body }: Icontent) {
  let snippet = "";

  if (body != "") {
    let line_arr: Array<string> = body.split("\n");

    if (line_arr.length) {
      line_arr.forEach((line, index) => {
        if (line.indexOf('"') >= 0) {
          line = replaceAllSR(line, '"', '\\"');
        }
        if (line.indexOf("$") >= 0) {
          line = line.replace(/[$]/g, "\\\\$");
        }
        line = replaceTab(line);
        snippet += '\t\t"' + line + '"';
        snippet += index === line_arr.length - 1 ? "\n" : ",\n";
      });
    }
  }
  let result =
    ',\n"' +
    name +
    '": {\n' +
    '\t"prefix": "' +
    prefix +
    '",\n' +
    '\t"body": [\n' +
    snippet +
    // '\t\t""\n'+
    "\t],\n" +
    '\t"description": "' +
    name +
    '"\n' +
    "}";
  return result;
}

// 在光标处插入字符串
// myField    文本框对象
// myValue 要插入的值
export function insertAtCursor(myField: HTMLTextAreaElement, myValue: string) {
  //MOZILLA/NETSCAPE support
  if (myField.selectionStart || myField.selectionStart == 0) {
    var startPos = myField.selectionStart;
    var endPos = myField.selectionEnd;
    // save scrollTop before insert
    var restoreTop = myField.scrollTop;
    myField.value =
      myField.value.substring(0, startPos) +
      myValue +
      myField.value.substring(endPos, myField.value.length);
    if (restoreTop > 0) {
      // restore previous scrollTop
      myField.scrollTop = restoreTop;
    }
    myField.focus();
    myField.selectionStart = startPos + myValue.length;
    myField.selectionEnd = startPos + myValue.length;
  } else {
    myField.value += myValue;
    myField.focus();
  }
}
