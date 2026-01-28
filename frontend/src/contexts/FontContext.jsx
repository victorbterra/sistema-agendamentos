import { createContext, useState, useContext, useEffect } from 'react';

const FontContext = createContext();

export function FontProvider({ children }) {
  // Usaremos porcentagem (100% = padrão normal do navegador)
  const [zoom, setZoom] = useState(100);

  const aumentarFonte = () => {
    // Limite máximo de 150% para não quebrar o layout
    if (zoom < 150) setZoom(zoom + 10);
  };

  const diminuirFonte = () => {
    // Limite mínimo de 70%
    if (zoom > 70) setZoom(zoom - 10);
  };

  // Aqui está a mágica: atualizamos a tag HTML principal
  useEffect(() => {
    document.documentElement.style.fontSize = `${zoom}%`;
  }, [zoom]);

  return (
    <FontContext.Provider value={{ zoom, aumentarFonte, diminuirFonte }}>
      {children}
    </FontContext.Provider>
  );
}

export const useFonte = () => useContext(FontContext);