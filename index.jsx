
import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import QRCode from 'react-qr-code';
import './style.css';

const menu = {
  Mancare: [
    { name: 'Pastrana Oaie', price: 35 },
    { name: 'Pastrama Porc', price: 30 },
    { name: 'Pastrama Pui', price: 30 },
    { name: 'Carnati de plescoi', price: 25 },
    { name: 'Mici cu mustar', price: 6 },
    { name: 'Meniu stripsuri', price: 22 },
    { name: 'Ceafa de Porc', price: 22 },
    { name: 'Cartofi prajiti', price: 8 },
    { name: 'Cartofi prajiti cu branza rasa', price: 12 },
    { name: 'Legume la gratar', price: 15 },
    { name: 'Mujdei de usturoi', price: 3 },
    { name: 'Salata de muraturi', price: 8 },
    { name: 'Sos Ketchup/Mustar', price: 3 },
    { name: 'Paine/Chifla', price: 3 },
    { name: 'Mamaliga', price: 5 },
    { name: 'Platou de 2 persoane', price: 100 },
    { name: 'Platou de 4 persoane', price: 200 }
  ],
  Bauturi: [
    { name: 'Apa plata', price: 6 },
    { name: 'Apa minerala', price: 6 },
    { name: 'Cola', price: 10 },
    { name: 'Cola 0', price: 10 },
    { name: 'Fanta', price: 10 },
    { name: 'Nestea', price: 10 },
    { name: 'Limonada', price: 10 },
    { name: 'Birra Moretti 0.5', price: 9 },
    { name: 'Birra Moretti 0,33 0 alcool', price: 9 },
    { name: 'Heineken 0.4', price: 11 },
    { name: 'Heineken 0.33 0 alcool', price: 12 },
    { name: 'Ciuc premium', price: 8 },
    { name: 'Desperados', price: 12 },
    { name: 'Cidru de mere 0.33', price: 10 },
    { name: 'Cafea simpla/cu lapte', price: 7 },
    { name: 'Ceai', price: 7 },
    { name: 'Ciocolata calda', price: 7 }
  ],
  Deserturi: [
    { name: 'Inghetata 100gr div. sort.', price: 10 },
    { name: 'Ecler Vanilie/Ciocolata/Caramel', price: 12 }
  ]
};

function App() {
  const [masa, setMasa] = useState(null);
  const [comanda, setComanda] = useState([]);

  const adaugaProdus = (produs) => {
    setComanda([...comanda, produs]);
  };

  const total = comanda.reduce((sum, item) => sum + item.price, 0);
  const notaText = comanda.map(p => `- ${p.name}: ${p.price} LEI`).join('\n') + `\nTotal: ${total} LEI`;

  return (
    <div className="app">
      <h1>Păstrămăria - Comandă</h1>
      {!masa && (
        <div className="mese">
          {[...Array(8)].map((_, i) => (
            <button key={i} onClick={() => setMasa(i + 1)}>Masa {i + 1}</button>
          ))}
        </div>
      )}

      {masa && (
        <>
          <h2>Masa {masa}</h2>
          {Object.entries(menu).map(([cat, items]) => (
            <div key={cat}>
              <h3>{cat}</h3>
              {items.map((item, idx) => (
                <button key={idx} onClick={() => adaugaProdus(item)}>
                  {item.name} - {item.price} LEI
                </button>
              ))}
            </div>
          ))}
          <div>
            <h3>Comandă:</h3>
            <ul>
              {comanda.map((item, i) => <li key={i}>{item.name} - {item.price} LEI</li>)}
            </ul>
            <p><strong>Total: {total} LEI</strong></p>
          </div>
          {comanda.length > 0 && (
            <div style={{ background: 'white', padding: '16px', display: 'inline-block' }}>
              <QRCode value={notaText} />
            </div>
          )}
        </>
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
