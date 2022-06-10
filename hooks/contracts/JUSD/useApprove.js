import { useContractWrite } from "wagmi";
import useSigner from "../../useSigner";
import Address from "../../../constants/Address.json";
import ERC20_ABI from "../../../constants/ERC20ABI.json";

const useApprove = (spender, amount) => {
  const signer = useSigner();
  const { data, isError, isLoading, write } = useContractWrite(
    {
      addressOrName: Address.JUSD,
      contractInterface: ERC20_ABI,
      signerOrProvider: signer,
    },
    "approve",
    {
      args: [spender, amount],
    }
  );

  return { data, isError, isLoading, handleApprove: write };
};

export default useApprove;
