import Head from 'next/head';
import HomePage from '../views/HomePage';

export default function IndexRoute() {
  return (
    <>
      <Head>
        <title>WEBSPACEAI</title>
        <meta name="description" content="WEBSPACEAI homepage" />
      </Head>
      <HomePage />
    </>
  );
}
