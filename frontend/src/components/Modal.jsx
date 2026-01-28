export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <>
    {/* Overlay do modal */}
    <div className="flex fixed inset-0 bg-black/60 backdrop-blur-sm items-center justify-center z-50">
        {/* Conteúdo do modal */}
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden animate-fade-in-up">
            {/* Cabeçalho do Modal com botão X */}
            <div className="flex items-center justify-center p-4 border-b border-slate-300">
                <h3 className="font-bold text-slate-700 text-lg">Criar novo Agendamento</h3>
                <button
                    onClick={onClose}
                    className="text-slate-500 hover:text-white font-bold text-xl ml-auto rounded-full hover:bg-red-500 border border-slate-300 w-9 h-9 flex items-center justify-center transition-colors"
                    aria-label="Fechar modal"
                >
                x
                </button>
            </div>
            {/* Corpo do Modal */}
            <div className="p-6">
                {children}
            </div>
        </div>
    </div>
    </>
  )}