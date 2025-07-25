import Client from "./client";
import { Suspense } from 'react';

export default () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Client />
    </Suspense>
  );
}