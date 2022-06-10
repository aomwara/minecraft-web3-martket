import { useProvider, useContractWrite } from "wagmi";
import useAccounts from "./useAccount";
import ERC20_ABI from "../constants/ERC20ABI.json";

const useToken = (tokenAddress, methods, args) => {
  const { address: userAddress } = useAccounts();
  const provider = useProvider();
  const signer = provider.getSigner(userAddress);

  const { data, isError, isLoading, write } = useContractWrite(
    {
      addressOrName: tokenAddress,
      contractInterface: ERC20_ABI,
      signerOrProvider: signer,
    },
    methods,
    {
      args: args,
    }
  );

  return { data, isError, isLoading, write };
};

export default useToken;
