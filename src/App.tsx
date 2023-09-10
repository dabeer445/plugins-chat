import { Chat, ChatWindow, useRuntime, Launcher, RuntimeAPIProvider, SessionStatus, Message, SystemResponse, TurnType, UserResponse } from '@voiceflow/react-chat';
import React, { useEffect, useState } from 'react';
import { match } from 'ts-pattern';
import { CustomMessage, PREFIX } from './constants';
import './App.css'
import { AppContainer } from './styled';
// import Button from "remoteApp/Button";

import { Authentication, AuthenticationProps } from './components/Authentication';

export function App({ ...config }) {
  const [open, setOpen] = useState(false);
  const [authenticated, setAuthenticated] = useState<AuthenticationProps['authenticated']>({ isUser: false, plugins: [] });
  const [close, setClose] = useState(false);

  const runtime = useRuntime(config);
  const IMAGE = 'https://levelfeed.ai/shaz/alan/logo.jpeg';
  const AVATAR = 'https://levelfeed.ai/shaz/alan/logo.jpeg';

  useEffect(() => {
    runtime.register({
      canHandle: ({ type }) => String(type).startsWith(PREFIX),
      handle: ({ context }, trace) => {
        const name = String(trace.type).slice(PREFIX.length);

        const plugin = window.vfplugin?.[name];

        if (plugin?.Message) {
          const payload = { 
            PluginMessage: plugin.Message, 
            name: name, 
            payload: JSON.parse(trace.payload),
          }
          context.messages.push({ type: CustomMessage.PLUGIN, payload: payload });
        } else {
          context.messages.push({
            type: 'text',
            text: `There is no plugin registered with the name "${name}". Make sure to run "yarn build" in the "./plugin" folder.`,
          });
        }

        return context;
      },
    });
    authenticateBot();
    window.voiceflow.chat = runtime
  }, []);

  useEffect(() => {
    if (close) {
      runtime.setStatus(SessionStatus.ENDED);
      setClose(false);
    }
  }, [close]);

  const handleLaunch = async () => {
    setOpen(true);
    await runtime.launch();
  };

  const authenticateBot = async () => {
    if (config.verify.projectID) {
      fetch(
        `https://enp3q3qaudrlq.x.pipedream.net/authenticate?key=${config.verify.projectID}`
      ).then((response) => {
        if (response.ok) {
          //   setAuthenticated(true);
          setAuthenticated({isUser: true, plugins:['calendar','stripe','uploader']});
        }
      });
    }
  };

  const handleEnd = () => {
    setOpen(false);
    runtime.setStatus(SessionStatus.ENDED);
  };

  const handleSend = (message: string) => {
    runtime.reply(message);
  };


  if (!open) {
    return (
      <span
        style={{
          position: 'fixed',
          right: '2rem',
          bottom: '2rem',
        }}
      >
        <Launcher onClick={handleLaunch} />
      </span>
    );
  }

  return (
    <AppContainer>
      <RuntimeAPIProvider {...runtime}>
        <ChatWindow.Container>
          <Chat
            title="L0st"
            description="Welcome to our AI assistant"
            image={IMAGE}
            avatar={AVATAR}
            withWatermark={false}
            startTime={runtime.session.startTime}
            hasEnded={runtime.isStatus(SessionStatus.ENDED)}
            isLoading={!runtime.session.turns.length}
            onStart={runtime.launch}
            onEnd={handleEnd}
            onSend={handleSend}
            onMinimize={handleEnd}
          >
            {runtime.session.turns.map((turn: any, turnIndex: number) => match(turn)
              .with({ type: TurnType.USER }, ({ id, type: _, ...rest }) => <UserResponse {...rest} key={id} />)
              .with({ type: TurnType.SYSTEM }, ({ id, type: _, ...rest }) => <SystemResponse
                {...rest}
                key={id}
                Message={({ message, ...props }) => {
                  return match(message)
                    .with({ type: CustomMessage.PLUGIN }, ({ payload: { PluginMessage, payload, name } }) => (
                      <SystemResponse.SystemMessage {...props}>
                        <Message from="system">
                          <Authentication authenticated={authenticated} plugin_name={name}>
                            <PluginMessage {...payload}/>
                          </Authentication>
                        </Message>
                      </SystemResponse.SystemMessage>
                    ))
                    .otherwise(() => <SystemResponse.SystemMessage {...props} message={message} />);
                } }
                avatar={AVATAR}
                isLast={turnIndex === runtime.session.turns.length - 1} />
              ).exhaustive()

            )}
            {runtime.indicator && <SystemResponse.Indicator avatar={AVATAR} />}
          </Chat>
        </ChatWindow.Container>
      </RuntimeAPIProvider>
    </AppContainer>
  );
}
