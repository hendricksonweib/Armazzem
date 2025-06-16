import { PDVHeader } from '@/components/pdv/header';
import { QuestionPanel } from '@/components/pdv/question-panel';
import { ActionPanel } from '@/components/pdv/action-panel';

export default function PDV() {
  return (
    <div className="min-h-screen bg-mateus-gray">
      <PDVHeader />
      <main className="container mx-auto px-6 py-6">
        <div className="grid grid-cols-5 gap-6 min-h-[80vh]">
          <QuestionPanel />
          <ActionPanel />
        </div>
      </main>
    </div>
  );
}
