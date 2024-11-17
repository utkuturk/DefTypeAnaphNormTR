PennController.ResetPrefix(null);
SetCounter("setcounter");
// PreloadZip("https://files.lab.florianschwarz.net/ibexfiles/StimulusArchive/DefTypAnaph.zip");

DebugOff();

var progressBarText = "Deney Süreci";
const PROGRESS_SIZE = { w: 300, h: 20 };

var pageCss = {
  overflow: "auto",
  padding: "1em",
  "box-shadow": "4px 4px 2px #cacfd2",
  border: "1px solid #cacfd2",
  "border-radius": "2em",
};

var textCss = {
  "text-align": "center",
  margin: "0 auto",
  // "width": "50em"
};

var buttonCss = {
  "background-color": "#E03A3E",
  color: "white",
  "font-size": "1.25em",
  padding: "0.5em",
  "border-radius": "0.25em",
  // "width": "4em",
  margin: "0 auto",
  "text-align": "center",
  border: "none", // Remove default button border
  display: "block", // To center the button
};

Header().log("PROLIFIC_ID", GetURLParameter("id")),
// void
  Sequence(
    "setcounter",
    "consent",
    "instructions",
    "exp-start",
    randomize("ratings"),
    SendResults(),
    "end"
  ),
  newTrial(
    "consent",
    newText(
      "consent-body",
      "<center><b>Deney Onay Formu</b></center>" +
        "<p>Lütfen <a target='_blank' rel='noopener noreferrer' href='https://utkuturk.com/files/web_consent.pdf'>bu linke</a> tıklayarak onay formunu indirip inceleyiniz. Bu onay formunu okuyup bu çalışmaya katılmayı kabul ediyorsanız, aşağıdaki 'Kabul Ediyorum' butonuna tıklayın. Bu çalışmaya katılmayı kabul etmiyorsanız, sekmeyi kapatarak bu çalışmadan çıkabilirsiniz. Deney sırasında istediğiniz zaman sekmeyi kapatarak deneyden çıkabilirsiniz. Eğer deneyi tamamlamadan çıkarsanız, zamanınız için herhangi bir ödeme yapılmayacaktır. Herhangi bir sorunla karşılaşırsanız, lütfen bizimle e-posta yoluyla iletişime geçmekten çekinmeyin." +
        "<br><br><b> Araştırmacılar:</b> <br>Yağmur Sağ, University of Rutgers <i> (yagmursag@gmail.com)</i> ,<br>Utku Turk, University of Maryland, College Park <i> (utkuturk@umd.edu)</i>"
    ),
    newCanvas("consent-page", 600, 400)
      .add(100, 20, newImage("rutgers.jpg").size("60%", "auto"))
      .add(0, 150, getText("consent-body"))
      .cssContainer(pageCss)
      .print(),
    newText("<p>").print(),
    newButton("agree", "Kabul Ediyorum").bold().css(buttonCss).print().wait()
  ),
  newTrial(
    "instructions",
    newText(
      "instr-body",
      "Merhaba!" +
        "<p> Bu deneyde sizden gösterilen nesnelerin ne kadar tipik olduğunu değerlendirmeniz istenmektedir.</p>" +
        "<p> Örneğin, aşağıdaki resim size gösterildikten sonra bir lamba için ne kadar tipik olduğu sorulabilir:</p>"
    ),
    newImage("lamp", "lamp.jpeg").size(200, 200).center(),
    newScale("scale", "1", "2", "3", "4", "5", "6", "7")
      .labelsPosition("top")
      .keys()
      .before(
        newText("scale_left", "hiç tipik değil")
          .css("margin-left", "1em")
          .css("margin-top", "2.5em")
      )
      .after(
        newText("scale_right", "fazlasıyla tipik")
          .css("margin-right", "1em")
          .css("margin-top", "2.5em")
      )
      .center()
      .bold()
      .css("margin", "10pt")
      .cssContainer("border", "solid 1px black")
      .log()
      .print(),
    newCanvas("instr-page", 600, 600)
      .add(100, 20, newImage("rutgers.jpg").size("60%", "auto"))
      .add(0, 150, getText("instr-body"))
      .add(180, 300, getImage("lamp"))
      .add(20, 500, getScale("scale"))
      .cssContainer(pageCss)
      .print(),
    newText("<p>").print(),
    newButton("agree", "Devam etmek için Tıklayınız")
      .bold()
      .css(buttonCss)
      .print()
      .wait()
  ),
  newTrial(
    "exp-start",
    fullscreen(),
    newText("exp-start-title", "Deneye Başlamak İçin Hazır Mısınız?").bold(),
    newText(
      "exp-start-body",
      "<p>Devam etmeden önce, lütfen çok gürültü olmayan ve dikkatinizi toparlayabileceğiniz bir ortamda olduğunuzdan emin olun." +
        "<p>Hazır olduğunuzda deneye başlayabilirsiniz."
    ),
    newCanvas("start-page", 1500, 300)
      .add(100, 20, newImage("rutgers.jpg").size("60%", "auto"))
      .add(0, 150, getText("exp-start-title"))
      .add(0, 180, getText("exp-start-body"))
      .cssContainer(pageCss)
      .print(),
    newText("<p>").print(),
    newButton("Deneye başlamak için Tıklayınız")
      .bold()
      .css(buttonCss)
      .print()
      .wait()
  ),
  // Experimental trial
  Template("NormingDataSource.csv", (row) =>
    newTrial(
      "ratings",

      defaultText.center(),
      newImage("Image", row.Image1)
        .center()
        .size((row.width / row.height) * 200, 200),
      newText(
        "Question",
        "Resimdeki " +
          row.Noun_TR +
          " bir " +
          row.Noun_TR +
          " için ne kadar tipik?"
      )
        .center()
        .css("font-size", "14pt")
        .css("margin", "1.5em"),
      newText("scale_left", "hiç tipik değil")
        .css("margin-left", "1em")
        .css("margin-top", "2.5em"),
      newText("scale_right", "fazlasıyla tipik")
        .css("margin-right", "1em")
        .css("margin-top", "2.5em"),
      newScale("scale", "1", "2", "3", "4", "5", "6", "7")
        .labelsPosition("top")
        .keys()
        .before(getText("scale_left"))
        .after(getText("scale_right"))
        .center()
        .bold()
        .css("margin", "10pt")
        .cssContainer("border", "solid 1px black")
        .log()
        .print(),
      newCanvas("Rating", 800, 500)
        .add("center at 50%", "middle at 0%", getImage("Image"))
        .add("center at 50%", "middle at 30%", getText("Question"))
        .add("center at 50%", "middle at 45%", getScale("scale"))
        .print("center at 50vw", "middle at 50vh"),
      getScale("scale").wait(),

      clear(),
      newTimer("wait500", 500).start().wait()
    )
      .log("Item", row.Item)
      .log("Noun", row.Noun_TR)
      .log("Condition", row.Condition)
  ),
  // Final screen
  newTrial(
    "end",
    exitFullscreen(),
    newText("Katıldığınız için teşekkür ederiz!").center().print(),
    newText(
      "<p><a href='https://google.com' target='_blank'>Katılımınızı Prolific'te onaylamak için buraya tıklayın!</a></p>"
    )
      .center()
      .print(),
    newText(
      "<p>Bu bağlantı yeni bir pencere açar ve sizi Prolific'e geri yönlendirir. Katılımınız Prolific'te onaylandıktan sonra, bu pencereyi kapatabilirsiniz.</p>"
    )
      .center()
      .print(),
    newButton().wait()
  );
