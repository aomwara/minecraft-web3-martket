import { useProvider, useContractWrite } from "wagmi";
import useAccounts from "./useAccount";
import Address from "../constants/Address.json";
import BANK_ABI from "../constants/BankABI.json";

const useDeposit = (amount) => {
  const { address: userAddress } = useAccounts();
  const provider = useProvider();
  const signer = provider.getSigner(userAddress);

  const { data, isError, isLoading, write } = useContractWrite(
    {
      addressOrName: Address.Bank,
      contractInterface: BANK_ABI,
      signerOrProvider: signer,
    },
    methods,
    {
      args: [amount],
    }
  );

  return { data, isError, isLoading, handleDeposit: write };
};

export default useDeposit;
