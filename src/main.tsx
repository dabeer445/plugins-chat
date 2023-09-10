import { ChatConfig, Listeners, PostMessage } from '@voiceflow/react-chat';
import { createRoot } from 'react-dom/client';

import { App } from './App';


const VOICEFLOW_ID = 'voiceflow-chat-l0st';

const rootEl = document.createElement('div');
rootEl.id = VOICEFLOW_ID;
document.body.appendChild(rootEl);

const root = createRoot(rootEl);

window.voiceflow ??= {} as any;
window.voiceflow.chat ??= {} as any;
window.voiceflow.div ??= {} as any;

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {};
window.voiceflow.div.id ??= VOICEFLOW_ID;
window.voiceflow.chat.open ??= noop;
window.voiceflow.chat.close ??= noop;
window.voiceflow.chat.show ??= noop;
window.voiceflow.chat.hide ??= noop;
window.voiceflow.chat.interact ??= noop;

window.voiceflow.chat.load =  (loadConfig: Partial<ChatConfig>) => {
//   const config = sanitizeConfig(loadConfig);
  const config = loadConfig;

  root.render(<App {...config} />);

  // return new Promise<void>((resolve) => {
  //   Listeners.context.listeners.push({ type: PostMessage.Type.SESSION, action: resolve });
  // });
};
