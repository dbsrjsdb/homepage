import { MessageCircle } from 'lucide-react';
import { AppPage } from '@/components/app-page';
export const metadata = { title: 'Chat · Meltyheart' };
export default function Page() {
  return (
    <AppPage
      title="Chat"
      description="A place for conversations and community."
    >
      <div className="workspace-placeholder">
        <span className="template-icon">
          <MessageCircle size={32} />
        </span>
        <span className="status">Coming soon</span>
        <h2>The conversation starts here.</h2>
        <p>
          Public chat is still in the works.
          <br />
          There are no live rooms or messages yet.
        </p>
      </div>
    </AppPage>
  );
}
