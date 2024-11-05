
PennController.ResetPrefix(null)

PreloadZip("https://files.lab.florianschwarz.net/ibexfiles/StimulusArchive/DefTypAnaph.zip");

DebugOff()

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

Header(
// void
)
.log( "PROLIFIC_ID" , GetURLParameter("id") )
,

Sequence("consent", "instructions", randomize("ratings"), SendResults(), "end")

,

newTrial(
    "consent",
    newText(
        "consent-body",
        "<center><b>Deney Onay Formu</b></center>" +
        "<p>Lütfen <a target='_blank' rel='noopener noreferrer' href='https://utkuturk.com/files/web_consent.pdf'>Bu linke</a> tıklayarak onay formunu indirip inceleyiniz. Bu onay formunu okuyup bu çalışmaya katılmayı kabul ediyorsanız, aşağıdaki 'Kabul Ediyorum' butonuna tıklayın. Bu çalışmaya katılmayı kabul etmiyorsanız, sekmeyi kapatarak bu çalışmadan çıkabilirsiniz. Deney sırasında istediğiniz zaman sekmeyi kapatarak deneyden çıkabilirsiniz. Eğer deneyi tamamlamadan çıkarsanız, zamanınız için herhangi bir ödeme yapılmayacaktır. Herhangi bir sorunla karşılaşırsanız, lütfen bizimle e-posta yoluyla iletişime geçmekten çekinmeyin." +
        "<br><br><b> Araştırmacılar:</b> <br>Yağmur Sağ<br>University of Rutgers <i> (yagmursag@gmail.com)</i> ,<br>Utku Turk, University of Maryland, College Park <i> (utkuturk@umd.edu)</i>"
    ),
    newCanvas("consent-page", 1500, 400)
        .add(100, 20, newImage("rutgers.jpg").size("60%", "auto"))
        .add(0, 120, getText("consent-body"))
        .cssContainer(pageCss)
        .print(),
    newText("<p>").print(),
    newButton("agree", "Kabul Ediyorum").bold().css(buttonCss).print().wait()
)

,

newTrial(
    "instructions",
    newText("instr-body",
        "Merhaba!" +
        "<p> Bu deneyde sizden gösterilen nesnelerin ne kadar tipik olduğunu değerlendirmeniz istenmektedir.</p>" +
        "<p> Örneğin, aşağıdaki resim size gösterildikten sonra bir lamba için ne kadar tipik olduğu sorulabilir:</p>"
    ),
    newImage('lamp',"lamp.jpeg").size(200,200).center(),
    newScale("scale", "0", "1", "2", "3", "4", "5", "6", "7")
        .labelsPosition("top")
        .before(newText("tipik değil"))
        .after(newText("gayet tipik"))
        .print()
        .center(),
    newCanvas("instr-page", 1500, 400)
        .add(100, 20, newImage("rutgers.jpg").size("60%", "auto"))
        .add(0, 120, getText("instr-body"))
        .add(0, 250, getImage('lamp'))
        .add(0, 450, getScale("scale"))
        .cssContainer(pageCss)
        .print(),
    newText("<p>").print(),
    newButton("agree", "Deneye Başlamak için Tıklayınız").bold().css(buttonCss).print().wait()
)


// Experimental trial
Template("NormingDataSource.csv", (row) =>
    newTrial(
        "ratings",

        defaultText.center(),
        newImage("Image", row.Image1)
            .center()
            .size((row.width / row.height) * 200, 200),
        //.print()
        newText("Question", "Bu, " + row.Noun_DE + " için ne kadar tipik?"),
        //.print()

        newScale("scale", "0", "1", "2", "3", "4", "5", "6", "7")
            .labelsPosition("top")
            .before(newText("tipik değil"))
            .after(newText("gayet tipik"))
            .center()
            .log(),
        //.print()
        //.wait()

        newCanvas("Rating", 800, 500)
            .add("center at 50%", "middle at 0%", getImage("Image"))
            .add("center at 50%", "middle at 30%", getText("Question"))
            .add("center at 50%", "middle at 40%", getScale("scale"))
            .print("center at 50vw", "middle at 50vh"),

        getScale("scale").wait(),

        clear(),
        newTimer("wait500", 500).start().wait()
    )
    .log("Item", row.Item)
    .log("Noun", row.Noun_DE)
    .log("Condition", row.Condition)
)
,
  // Final screen
newTrial(
    "end",
    newText("Katıldığınız için teşekkür ederiz!!").center().print(),
    // Bu bağlantı bir yer tutucudur: Katılımcı havuzlama platformunuz tarafından sağlanan URL ile değiştirin
    newText(
        "<p><a href='https://app.prolific.co/submissions/complete?cc=15DEE77B' target='_blank'>Katılımınızı Prolific'te onaylamak için buraya tıklayın!</a></p>"
    )
        .center()
        .print(),
    newText(
        "<p>Bu bağlantı yeni bir pencere açar ve sizi Prolific'e geri yönlendirir. Katılımınız Prolific'te onaylandıktan sonra, bu pencereyi kapatabilirsiniz.</p>"
    )
        .center()
        .print(),

    // Hile: bu denemede sonsuza kadar kalın (sekme kapatılana kadar)
    newButton().wait()
);