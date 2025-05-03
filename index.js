
const app = document.getElementById("app");

let masa = null;
let comanda = [];

const produse = [
  { name: "Pastrama Porc", price: 30 },
  { name: "Cartofi prajiti cu branza", price: 12 },
  { name: "Desperados", price: 12 }
];

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

  produse.forEach((p, idx) => {
    const btn = document.createElement("button");
    btn.textContent = `${p.name} - ${p.price} LEI`;
    btn.style.margin = "5px";
    btn.onclick = () => {
      comanda.push(p);
      saveComanda();
      render();
    };
    app.appendChild(btn);
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
      masa = null;
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
