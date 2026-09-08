import { Code2 } from 'lucide-react';
import { AppPage } from '@/components/app-page';

export const metadata = { title: 'App template · Meltyheart' };

export default function TemplatePage() {
  return (
    <AppPage
      title="A space for your next idea."
      description="One familiar home for every little app."
    >
      <div className="workspace-toolbar">
        <span>
          <span className="tiny-dot" /> App template
        </span>
        <span>Preview</span>
      </div>
      <div className="workspace-placeholder">
        <span className="template-icon">
          <Code2 size={32} />
        </span>
        <span className="eyebrow">MAKE SOMETHING HERE</span>
        <h2>Your app goes here.</h2>
        <p>
          A converter, a chat room, or something unexpected.
          <br />
          There’s room for whatever comes next.
        </p>
        <span className="template-label">Content area</span>
      </div>
    </AppPage>
  );
}
