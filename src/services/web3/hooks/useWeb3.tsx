import React, { createContext, useContext, useEffect, useState } from "react"
import type { FC, ReactNode } from "react"
import { Web3Provider as Web3ProviderEthers } from "@ethersproject/providers"
import { Handler } from "soulswap-limit-orders-lib"

interface Web3State {
  library: Web3ProviderEthers | undefined;
  account: string | undefined | null;
  chainId: number | undefined;
  handler?: Handler;
  toggleWalletModal?: () => void;
}

interface Web3ProviderProps {
  children: ReactNode;
  library: Web3ProviderEthers | undefined;
  account: string | undefined | null;
  chainId: number | undefined;
  handler?: Handler;
  toggleWalletModal?: () => void;
}

const initialWeb3State: Web3State = {
  library: undefined,
  chainId: undefined,
  account: undefined,
  handler: undefined,
  toggleWalletModal: undefined,
};

const Web3Context = createContext<Web3State>({} as Web3State);

export const useWeb3 = () => useContext(Web3Context);

export const Web3Provider: FC<Web3ProviderProps> = ({
  children,
  library,
  chainId,
  account,
  handler,
  toggleWalletModal,
}: Web3ProviderProps) => {
  const [state, setState] = useState<Web3State>(initialWeb3State);

  useEffect(() => {
    setState({
      library,
      chainId,
      account,
      handler,
      toggleWalletModal,
    });
  }, [library, chainId, account, handler, toggleWalletModal]);

  return (
    <Web3Context.Provider
      value={{
        ...state,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

export default Web3Context;
