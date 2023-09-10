// import { plugins } from './plugin';

// for (let index = 0; index < plugins.length; index++) {
//   const plugin = plugins[index];
//   window.vfplugin = Object.assign(window.vfplugin ?? {}, {
//     [plugin.name]: plugin,
//   });
// }
import React, { useState } from "react";

const Uploader = () => {
  const [count, setCount] = useState(0);
  const increment = () => {
    setCount(count + 1);
  };
  return (
    <button onClick={increment}>
      {count}
    </button>
  );
};
const TetrisComponent = () => (
  <div>
    <iframe height="100%" width="100%" title="tetris" src="https://tetris.com/" />
  </div>
);
window.vfplugin = Object.assign(window.vfplugin ?? {}, {
  ['uploader']: { name: 'uploader', Message: Uploader },
  ['tetris']: { name: 'tetris', Message: TetrisComponent },
});