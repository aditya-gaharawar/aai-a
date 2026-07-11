import Head from 'next/head';
import SafetyPage from '../views/SafetyPage';

export default function SafetyRoute() {
  return (
    <>
      <Head>
        <title>AI Safety Framework | WEBSPACEAI</title>
        <meta name="description" content="A scalable framework for managing AI safety risks." />
      </Head>
      <SafetyPage />
    </>
  );
}
