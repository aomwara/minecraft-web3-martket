import { useProvider, useAccount } from "wagmi";

const useSigner = () => {
  const { data: account } = useAccount();
  const provider = useProvider();
  const signer = provider.getSigner(account?.address);

  return signer;
};

export default useSigner;
