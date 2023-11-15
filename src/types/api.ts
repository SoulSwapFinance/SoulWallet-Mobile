export type UserInfo = {
  address: string;
  votingPower: string;
  ineligiblePower: string;
  eligiblePower: string;
  nativeBalance: string;
  stakedBalance: string;
  protocolOwnership: string;
  api?: string
  ftmScan?: boolean
};

export type TokenInfo = {
  id: string;
  symbol: string;
  logo: string;
  price?: string;
};
