// useStore.ts
import { useState, useEffect } from "react";

const useStore = <T, F>(
  store: (callback: (state: T) => unknown) => unknown,
  callback: (state: T) => F
) => {
  const result = store(callback) as F;
  const [data, setData] = useState<F>();

  useEffect(() => {
    setData(result);
  }, [result]);

  return data;
};

export default useStore;

/**Usage in Next.js
NextJS uses Server Side Rendering, and it will compare the rendered component on the server with the one rendered on client. But since you are using data from browser to change your component, the two renders will differ and Next will throw a warning at you.

The errors usually are:

Text content does not match server-rendered HTML
Hydration failed because the initial UI does not match what was rendered on the server
There was an error while hydrating. Because the error happened outside of a Suspense boundary, the entire root will switch to client rendering
To solve these errors, create a custom hook so that Zustand waits a little before changing your components.

Create this file 

// yourComponent.tsx

import useStore from './useStore'
import { useBearStore } from './stores/useBearStore'

const bears = useStore(useBearStore, (state) => state.bears)


*/
