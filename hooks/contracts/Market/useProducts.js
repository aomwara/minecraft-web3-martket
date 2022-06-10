import { useContractRead } from "wagmi";
import Address from "../../../constants/Address.json";
import Market_ABI from "../../../constants/MarketABI.json";

const useProducts = (address) => {
  const {
    data: Products,
    isError,
    isLoading,
  } = useContractRead(
    {
      addressOrName: Address.MARKET,
      contractInterface: Market_ABI,
    },
    "getItems",
    {
      args: [],
    }
  );
  return { Products, isError, isLoading };
};

export default useProducts;
