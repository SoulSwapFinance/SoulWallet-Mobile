import { ConfirmationDefinitions } from '@soul-wallet/extension-base/src/background/KoniTypes';

export type EvmSignatureSupportType = keyof Pick<
  ConfirmationDefinitions,
  'evmSignatureRequest' | 'evmSendTransactionRequest'
>;
