import { useContractRead } from "wagmi";
import useSigner from "../../useSigner";
import Address from "../../../constants/Address.json";
import ERC20_ABI from "../../../constants/ERC20ABI.json";

const useBalance = (address) => {
  const signer = useSigner();
  const {
    data: JUSDBalance,
    isError,
    isLoading,
  } = useContractRead(
    {
      addressOrName: Address.JUSD,
      contractInterface: ERC20_ABI,
    },
    "balanceOf",
    {
      args: address,
    }
  );

  return { JUSDBalance, isError, isLoading };
};

export default useBalance;
