import { Download } from 'lucide-react';
import { AppPage } from '@/components/app-page';
export const metadata = { title: 'Installable apps · Meltyheart' };
export default function Page() {
  return (
    <AppPage
      title="Installable apps"
      description="Projects that feel at home on your device."
    >
      <div className="workspace-placeholder">
        <span className="template-icon">
          <Download size={32} />
        </span>
        <span className="status">Coming soon</span>
        <h2>A little more than a browser tab.</h2>
        <p>
          Desktop and installable apps will appear here.
          <br />
          No downloads are available yet.
        </p>
      </div>
    </AppPage>
  );
}
