import React, { useEffect, useRef } from 'react';
import { init } from '@waline/client';

function Waline(props) {
  const walineInstanceRef = useRef(null);
  const containerRef = React.createRef();

  useEffect(() => {
    walineInstanceRef.current = init({
      ...props,
      el: containerRef.current,
      serverURL: 'https://emmkg8.deta.dev/',
      lang: 'en',
      path: window?.location.pathname.replace(/\/$/, ''),
    });

    return () => walineInstanceRef.current?.destroy();
  }, []);

  useEffect(() => {
    walineInstanceRef.current?.update(props);
  }, props);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
      }}
    />
  );
}

export default Waline;
