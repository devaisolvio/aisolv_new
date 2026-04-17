import { useEffect } from 'react';
import WarmStudioDraftV2 from '../WarmStudioDraftV2';

export default function HomeGate() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return <WarmStudioDraftV2 />;
}
