import { useProvider, useContractWrite } from "wagmi";
import useAccounts from "../../useAccount";
import Address from "../../../constants/Address.json";
import Market_ABI from "../../../constants/MarketABI.json";

const useBuy = (recipient, item, quantity) => {
  const { address: userAddress } = useAccounts();
  const provider = useProvider();
  const signer = provider.getSigner(userAddress);

  const { data, isError, isLoading, write } = useContractWrite(
    {
      addressOrName: Address.MARKET,
      contractInterface: Market_ABI,
      signerOrProvider: signer,
    },
    "purchase",
    {
      args: [recipient, item, quantity],
    }
  );

  return { data, isError, isLoading, handleBuy: write };
};

export default useBuy;
