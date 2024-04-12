function handleJsonpResponse(data) {
  // Extrahiere die Seiten-ID aus der Antwort.
  const pageId = Object.keys(data.query.pages)[0];
  // Extrahiere den Text der zufälligen Wikipedia-Seite aus der Antwort.
  let articleText = data.query.pages[pageId].extract
    .replace("–", "-")
    .replace(/\(\*|\(\s\*/g, "geb.")
    .replace(/\)/g, "")
    .replace(/(?:\r\n|\r|\n)/g, "") //Entfernen von Zeilenümbrüchen
    .replace("km²", "Quadratkilometer")
    .replace("’", "'")
    .replace(/\[[^\]]*\]/g, " ")
    .replace(/\.(\w)/g, '. $1') //Punkt ohne Lücke vor nächstem Wort
    .replace(/\u00d6/g, "Ö").replace(/\u00c4/g, "A").replace(/\u00dc/g, "Ü").replace(/\u00f6/g, "ö").replace(/\u00e4/g, "ä").replace(/\u00fc/g, "ü"); //enternen eckiger Klammern und Inhalt


  // Überprüfe, ob der Text nur aus lateinischen Buchstaben und Zahlen besteht.
  const regex = /^[a-zA-Z0-9ßÄÖÜäöü.,\/\-\r\n\s]+$/gm;




  if (!regex.test(articleText) | articleText.length <= 300) {
    // Wenn der Text ungültige Zeichen enthält, rufe getRandomArticle() erneut auf.
    console.log(articleText);
    document.querySelector(`script[id="wiki-api"]`).remove();
    getRandomArticle();
    return;
  }
  document.querySelector(`script[id="wiki-api"]`).remove();
  // Rufe loadLecTest() mit dem Text der Wikipedia-Seite auf.
  loadLecTest(articleText);
  document.getElementById("loader").style.display = "none";
  document.getElementById("cont").style.display = "block";

}



  
  // Definiere eine Funktion, um eine zufällige Wikipedia-Seite zu laden.
  function getRandomArticle() {
    // Erstelle ein <script>-Element.
    const script = document.createElement('script');

    const randomParam = Date.now();
    let url = `https://de.wikipedia.org/w/api.php?action=query&generator=random&grnnamespace=0&prop=extracts&exintro&explaintext&exsectionformat=wiki&exlimit=max&format=json&callback=handleJsonpResponse&randomParam=${randomParam}`;
    script.src = url;

    // Füge die ID "wiki-api" zum Script hinzu.
    script.id = "wiki-api";

    // Setze die Quelle des Scripts auf die URL der Wikipedia-API und füge einen JSONP-Callback hinzu.
    script.src = url;
    // Füge das <script>-Element zum <body> des HTML-Dokuments hinzu.
    document.body.appendChild(script);
  }
  
  
  // Rufe loadLecTest() mit dem Text der Wikipedia-Seite auf.
  function loadLecTest(articleText) {
    const script = document.createElement('script');
    script.src = "lec_test.js";
    // Übergebe texte als Parameter an lec_test.js
    script.setAttribute("data-texte", articleText);
    document.body.appendChild(script);
  }
  