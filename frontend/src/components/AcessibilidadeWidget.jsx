import { useFonte } from '../contexts/FontContext';

export default function AcessibilidadeWidget() {
  // Agora pegamos 'zoom' em vez de 'tamanhoFonte'
  const { aumentarFonte, diminuirFonte, zoom } = useFonte();

  return (
    <div className="fixed bottom-4 right-4 bg-white p-3 rounded-full shadow-xl border border-slate-200 flex items-center gap-3 z-50 animate-bounce-in">
      
      <button 
        onClick={diminuirFonte}
        className="w-8 h-8 flex items-center justify-center bg-slate-100 hover:bg-slate-200 rounded-full font-bold text-slate-600 transition-colors"
        title="Diminuir"
      >
        A-
      </button>

      <span className="text-xs font-bold text-slate-500 w-10 text-center">
        {zoom}%
      </span>

      <button 
        onClick={aumentarFonte}
        className="w-8 h-8 flex items-center justify-center bg-teal-600 hover:bg-teal-700 text-white rounded-full font-bold transition-colors shadow-sm"
        title="Aumentar"
      >
        A+
      </button>
    </div>
  );
}