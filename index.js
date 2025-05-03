
const produse = {'Mancare': [{'name': 'Pastrana Oaie', 'price': 35}, {'name': 'Pastrama Porc', 'price': 30}, {'name': 'Pastrama Pui', 'price': 30}, {'name': 'Carnati de plescoi', 'price': 25}, {'name': 'Mici cu mustar', 'price': 6}, {'name': 'Meniu stripsuri', 'price': 22}, {'name': 'Ceafa de Porc', 'price': 22}, {'name': 'Cartofi prajiti', 'price': 8}, {'name': 'Cartofi prajiti cu branza rasa', 'price': 12}, {'name': 'Legume la gratar', 'price': 15}, {'name': 'Mujdei de usturoi', 'price': 3}, {'name': 'Salata de muraturi', 'price': 8}, {'name': 'Sos Ketchup/Mustar', 'price': 3}, {'name': 'Paine/Chifla', 'price': 3}, {'name': 'Mamaliga', 'price': 5}, {'name': 'Platou de 2 persoane', 'price': 100}, {'name': 'Platou de 4 persoane', 'price': 200}], 'Bauturi': [{'name': 'Apa plata', 'price': 6}, {'name': 'Apa minerala', 'price': 6}, {'name': 'Cola', 'price': 10}, {'name': 'Cola 0', 'price': 10}, {'name': 'Fanta', 'price': 10}, {'name': 'Nestea', 'price': 10}, {'name': 'Limonada', 'price': 10}, {'name': 'Birra Moretti 0.5', 'price': 9}, {'name': 'Birra Moretti 0,33 0 alcool', 'price': 9}, {'name': 'Heineken 0.4', 'price': 11}, {'name': 'Heineken 0.33 0 alcool', 'price': 12}, {'name': 'Ciuc premium', 'price': 8}, {'name': 'Desperados', 'price': 12}, {'name': 'Cidru de mere 0.33', 'price': 10}, {'name': 'Cafea simpla/cu lapte', 'price': 7}, {'name': 'Ceai', 'price': 7}, {'name': 'Ciocolata calda', 'price': 7}], 'Deserturi': [{'name': 'Inghetata 100gr div. sort.', 'price': 10}, {'name': 'Ecler Vanilie/Ciocolata/Caramel', 'price': 12}]};

const app = document.getElementById("app");

let masa = null;
let comanda = [];

function render() {
  app.innerHTML = "";

  if (!masa) {
    const title = document.createElement("h2");
    title.textContent = "Alege masa:";
    app.appendChild(title);

    for (let i = 1; i <= 8; i++) {
      const btn = document.createElement("button");
      btn.textContent = "Masa " + i;
      btn.style.margin = "5px";
      btn.onclick = () => {
        masa = i;
        loadComanda();
        render();
      };
      app.appendChild(btn);
    }
    return;
  }

  const h2 = document.createElement("h2");
  h2.textContent = "Masa " + masa;
  app.appendChild(h2);

  const changeBtn = document.createElement("button");
  changeBtn.textContent = "Schimbă masa";
  changeBtn.onclick = () => {
    saveComanda();
    masa = null;
    render();
  };
  changeBtn.style.marginBottom = "10px";
  app.appendChild(changeBtn);

  Object.entries(produse).forEach(([categorie, lista]) => {
    const h3 = document.createElement("h3");
    h3.textContent = categorie;
    app.appendChild(h3);
    lista.forEach(p => {
      const btn = document.createElement("button");
      btn.textContent = `${p.name} - ${p.price} LEI`;
      btn.style.margin = "4px";
      btn.onclick = () => {
        comanda.push(p);
        saveComanda();
        render();
      };
      app.appendChild(btn);
    });
  });

  const list = document.createElement("ul");
  let total = 0;
  comanda.forEach((item, i) => {
    total += item.price;
    const li = document.createElement("li");
    li.textContent = `${item.name} - ${item.price} LEI`;
    const delBtn = document.createElement("button");
    delBtn.textContent = "✕";
    delBtn.style.marginLeft = "10px";
    delBtn.onclick = () => {
      comanda.splice(i, 1);
      saveComanda();
      render();
    };
    li.appendChild(delBtn);
    list.appendChild(li);
  });
  app.appendChild(list);

  const totalP = document.createElement("p");
  totalP.innerHTML = "<strong>Total: " + total + " LEI</strong>";
  app.appendChild(totalP);

  if (comanda.length > 0) {
    const notaBtn = document.createElement("button");
    notaBtn.textContent = "Generează nota de plată";
    notaBtn.onclick = () => window.location.href = "nota.html";
    notaBtn.style.marginTop = "10px";
    app.appendChild(notaBtn);
  }

  const resetBtn = document.createElement("button");
  resetBtn.textContent = "Resetează masa";
  resetBtn.onclick = () => {
    if (confirm("Ești sigur că vrei să resetezi această masă?")) {
      comanda = [];
      saveComanda();
      render();
    }
  };
  resetBtn.style.marginTop = "10px";
  resetBtn.style.marginLeft = "10px";
  app.appendChild(resetBtn);
}

function saveComanda() {
  localStorage.setItem("comanda" + masa, JSON.stringify(comanda));
}

function loadComanda() {
  const salvata = localStorage.getItem("comanda" + masa);
  comanda = salvata ? JSON.parse(salvata) : [];
}

render();
