import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import InputArea from '../components/InputArea';

interface JournalEntry {
  id: string;
  input: string;
  ai_reflection: string;
  timestamp: string;
  source: 'diario';
}

const JournalPage: React.FC = () => {
  const { theme } = useTheme();
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('myi_journal');
    if (stored) setEntries(JSON.parse(stored));
  }, []);

  const saveJournalEntry = (entry: JournalEntry) => {
    const updated = [...entries, entry];
    setEntries(updated);
    localStorage.setItem('myi_journal', JSON.stringify(updated));
  };

  const handleJournalEntry = async (text: string) => {
    if (!text.trim()) return;
    setLoading(true);

    const prompt = `
Você é meu diário pessoal inteligente. 
Receba o texto abaixo como uma reflexão ou desabafo pessoal e me devolva:

1. Uma análise emocional clara do que eu estou vivendo.
2. Uma reflexão empática e construtiva.
3. Uma pergunta final que me ajude a pensar melhor.

Texto: "${text}"
    `;

    try {
      const res = await fetch('https://3rmsznjnw7.execute-api.us-east-1.amazonaws.com/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: prompt }),
      });

      const { answer } = await res.json();

      const entry: JournalEntry = {
        id: `entry_${Date.now()}`,
        input: text,
        ai_reflection: answer,
        timestamp: new Date().toISOString(),
        source: 'diario',
      };

      saveJournalEntry(entry);
    } catch (err: any) {
      console.error('Erro ao salvar entrada:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`flex-1 px-6 py-8 overflow-y-auto ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Meu Diário – My, I</h1>
        <p className="mb-6 text-lg">Escreva livremente. Esse espaço é só seu.</p>

        <InputArea onSendMessage={handleJournalEntry} />

        {loading && (
          <div className="mt-4 text-blue-500">Refletindo sobre o que você escreveu…</div>
        )}

        <div className="mt-10 space-y-6">
          {entries
            .slice()
            .reverse()
            .map((entry) => (
              <div key={entry.id} className={`p-6 rounded-lg shadow-sm border text-sm whitespace-pre-wrap ${
                theme === 'dark' ? 'bg-gray-900 border-gray-700' : 'bg-gray-50 border-gray-300'
              }`}>
                <p className="text-xs mb-2 opacity-60">{new Date(entry.timestamp).toLocaleString()}</p>
                <p className="mb-3"><strong>Você:</strong> {entry.input}</p>
                <p><strong>Reflexão:</strong> {entry.ai_reflection}</p>
              </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JournalPage;
