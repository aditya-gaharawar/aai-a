import Head from 'next/head';
import { GetStaticProps } from 'next';
import TrustCenterPage from '../../views/TrustCenterPage';
import { parseAllPolicies } from '../../lib/policyParser';
import { PolicyData } from '../../lib/policyTypes';

interface TrustIndexProps {
  policies: PolicyData[];
}

export const getStaticProps: GetStaticProps<TrustIndexProps> = async () => {
  const policies = parseAllPolicies();
  return {
    props: { policies },
  };
};

export default function TrustRoute({ policies }: TrustIndexProps) {
  return (
    <>
      <Head>
        <title>Trust Center | WEBSPACEAI</title>
        <meta
          name="description"
          content="Explore WEBSPACEAI's complete policy suite — 40 documents covering legal, AI safety, governance, and compliance. Transparency by design."
        />
      </Head>
      <TrustCenterPage policies={policies} />
    </>
  );
}
