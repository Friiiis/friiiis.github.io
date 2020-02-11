async function setSkills() {
  var languages = await fetch("/assets/data/skills/languages.json").then(
    response => {
      return response.json();
    }
  );

  var frameworks = await fetch("/assets/data/skills/frameworks.json").then(
    response => {
      return response.json();
    }
  );

  // Tilføjer alle sprog til div #languages-container
  languages.languages.forEach(s => {
    var container = document.getElementById("languages-container");

    var p = document.createElement("p");
    p.innerText = s;

    container.appendChild(p);
  });

  // Tilføjer alle frameworks til div #frameworks-container
  frameworks.frameworks.forEach(f => {
    var container = document.getElementById("frameworks-container");

    var h4 = document.createElement("h4");
    h4.innerText = f.title;
    container.appendChild(h4);

    f.data.forEach(fw => {
      var p = document.createElement("p");
      p.innerText = fw;
      container.appendChild(p);
    });
  });
}

async function setWorks() {
  var works = await fetch("/assets/data/works/works.json").then(response => {
    return response.json();
  });

  var container = document.getElementById("all-work-container");

  // Test to see if the browser supports the HTML template element by checking
  // for the presence of the template element's content attribute.
  if ("content" in document.createElement("template")) {

    var template = document.getElementById("work-block");

    works.works.forEach(w => {

      // Kloner template
      var clone = template.content.cloneNode(true);

      // Fanger alle elementer der skal ændres
      var collapsible = clone.querySelector(".collapse");
      var button = clone.querySelector("#work-button");
      var image = clone.querySelector("#work-image");
      var title01 = clone.querySelector("#work-title-01");
      var title02 = clone.querySelector("#work-title-02");
      var type = clone.querySelector("#work-type");
      var description = clone.querySelector("#work-description");
      var techs = clone.querySelector("#work-techs");
      var link = clone.querySelector("#work-link");

      // Sørger for at collapse har et unikt id og button peger på denne
      collapsible.id = w.id;
      button.setAttribute("data-target", "#" + w.id);

      // Sætter baggrundsfarven
      button.style.backgroundColor = w.color;

      // Sætter billede
      image.setAttribute("src", w.image);

      // Sætter de to titler, typen og description
      title01.innerText = w.title;
      title01.style.color = w.fontColor;
      title02.innerText = w.title;
      type.innerText = w.type;
      description.innerText = w.description;

      // Sætter alle techs ind i samme div med en prik i mellem
      techs.innerText = "";
      for (let t = 0; t < w.techs.length; t++) {
        if (t != 0) {
          techs.innerText = techs.innerText + " ・ ";
        }
        techs.innerText = techs.innerText + w.techs[t];
      }

      // Sætter linket og styler hover effekten
      link.innerText = w.link.name;
      link.setAttribute("href", w.link.link);
      link.style.backgroundImage = "linear-gradient(to right, transparent 50%, " + w.color + " 50%)";

      container.appendChild(clone);
    });
    
  }
}

setSkills();
setWorks();
