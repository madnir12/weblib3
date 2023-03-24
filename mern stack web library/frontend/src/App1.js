import "./styles.scss";
import $ from "jquery";
import { useState } from "react";

export default function App() {
  const [html, setHtml] = useState("");
  function wrapText(elementID, openTag, closeTag) {
    var textArea = $("#" + elementID);
    var len = textArea.val().length;
    var start = textArea[0].selectionStart;
    var end = textArea[0].selectionEnd;
    var selectedText = textArea.val().substring(start, end);
    var replacement = openTag + selectedText + closeTag;
    if (end !== start) {
      textArea.val(
        textArea.val().substring(0, start) +
          replacement +
          textArea.val().substring(end, len)
      );
      setHtml(textArea.val());
    }
  }

  function onContextMenu(event) {
    event.preventDefault();
    var menu = $("#contextMenu");
    menu.css({
      top: event.pageY + "px",
      left: event.pageX + "px",
    });
    menu.show();
  }

  return (
    <div className="App">
      <textarea
        className="rtl"
        id="myTa"
        onContextMenu={onContextMenu}
      ></textarea>
      <div id="contextMenu" className="context-menu">
        <button
          id="underline"
          onClick={() =>
            wrapText("myTa", "<span class='quran-marker' >", "</span>")
          }
        >
          قرآن
        </button>

        <button
          id="underline"
          onClick={() =>
            wrapText("myTa", "<span class='hadees-marker' >", "</span>")
          }
        >
          حدیث
        </button>

        <button
          id="bold"
          onClick={() =>
            wrapText("myTa", "<span class='urdu-marker' >", "</span>")
          }
        >
          اردو
        </button>
        <button id="italic" onClick={() => wrapText("myTa", "<em>", "</em>")}>
          i
        </button>

        <button
          id="underline"
          onClick={() =>
            wrapText("myTa", "<span class='ref-arabic-marker ' >", "</span>")
          }
        >
          عربی حوالہ
        </button>
        <button
          id="underline"
          onClick={() =>
            wrapText("myTa", "<span class='english-marker ' >", "</span>")
          }
        >
          English
        </button>
        <button
          id="code"
          onClick={() => wrapText("myTa", "<strong>", "</strong>")}
        >
          {}
        </button>
        <button
          id="underline"
          onClick={() =>
            wrapText("myTa", "<span class='heading1-marker ' >", "</span>")
          }
        >
          ھیڈنگ 1
        </button>
      </div>
      <div
        className="rtl"
        dangerouslySetInnerHTML={{
          __html: html,
        }}
      ></div>
    </div>
  );
}
