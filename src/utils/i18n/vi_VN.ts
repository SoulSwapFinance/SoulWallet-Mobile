export const vi = {
  common: {
    welcomeBack: 'Welcome Back!',
    enterPinToUnlock: 'Enter the PIN to unlock',
    addAccount: 'Add Account',
    createNewWalletAccount: 'Create a new wallet account',
    nameYourWallet: 'Name your wallet',
    importExistingWallet: 'Import Existing Wallet',
    firstScreenNotification: 'By continuing, you agree to our Terms and Privacy Policy',
    createWalletNotification: 'This name will be used locally in this application only. You can always edit it later.',
    yourSecretPhrase: 'Your Secret Phrase',
    verifySecretPhrase: 'Verify Secret Phrase',
    createWalletName: 'Create A New Account',
    importSecretPhrase: 'Import From Secret Phrase',
    importPrivateKey: 'Import From Private Key',
    importEVMPrivateKey: 'Import From EVM Private Key',
    selectSendingMethod: 'Select Sending Method',
    connectYourAccount: 'Connect Your Account',
    secretPhrase: 'Secret Phrase',
    privateKey: 'Private Key',
    jsonFile: 'JSON file',
    singleChain: 'Single Chain',
    crossChain: 'Cross Chain (XCM)',
    charityDonate: 'Charity Donate',
    selectYourImport: 'Select Your Import',
    selectAccountType: 'Select Account Type',
    autoLock: 'Auto-Lock',
    importFromJson: 'Import From JSON File',
    transferSuccessMessage:
      'Your request has been confirmed. You can track its progress on the Transaction History page.',
    transferFailMessage1:
      'There was a problem with your request. You can track its progress on the Transaction History page.',
    transferFailMessage2: 'There was a problem with your request.',
    selectQrCodeFromGallery: 'Select Qr Code from Gallery',
    notify: 'Notification!',
    cannotScanQRCodeWithoutPermission: 'Please grant Camera access to scan QR code',
    goToSetting: 'Go to Setting',
    scan: 'Scan',
    toAddressToSendFunds: 'address to send funds',
    emptyTransactionListMessage: 'Your transactions will appear here',
  },
  cryptoTab: {
    receive: 'Receive',
    send: 'Send',
    swap: 'Swap',
  },
  settings: {
    settings: 'Settings',
    security: 'Security',
    account: 'Account',
    editAccount: 'Edit Account',
    accounts: 'Accounts',
    language: 'Language',
    notifications: 'Notifications',
    networks: 'Networks',
    tokens: 'Tokens',
    telegram: 'Telegram',
    twitter: 'Twitter',
    discord: 'Discord',
    website: 'Website',
    documentation: 'Documentation',
    termOfService: 'Terms of Service',
    privacyPolicy: 'Privacy Policy',
    logout: 'Logout',
    exportPrivateKey: 'Export Private Key',
    exportJson: 'Export JSON',
    removeAccount: 'Remove Account',
  },
  warningTitle: {
    doNotSharePrivateKey: 'Do not share your private key!',
    doNotShareSecretPhrase: 'Do not share your secret phrase!',
  },
  warningMessage: {
    passwordTooShort: 'Password is too short',
    noAccountText: "You currently don't have any accounts. Create your first account to get started.",
    privateKeyWarning: 'If someone has your private key they will have full control of your account',
    secretPhraseWarning: 'If someone has your secret phrase they will have full control of your account',
    unableDecode: 'Unable to decode using the supplied passphrase',
    invalidJsonFile: 'Invalid Json file',
    noPasswordMessage: 'Please fill repeat password',
    doNotMatchPasswordWarning: 'Passwords do not match',
    isNotSameAddress: 'The recipient address is the same as the sender address.',
    recipientPhish: 'The recipient is associated with a known phishing site on',
    isNotSameAddressAndTokenType: 'Transfer is not supported for this type of account and token',
    recipientAddressMustBe: 'The recipient address must be ',
    notAValidEVMPrivateKey: 'Not a valid EVM private key',
    removeAccountWarning:
      'You are about to remove this account. This means that you will not be able to access it via this app anymore. If you wish to recover it, you will need to use its secret phrase.',
    initSecretPhrase:
      'Write down your wallet’s secret phrase and keep it in a safe place. Store it carefully to not lose your assets.',
  },
  copied: 'Copied',
  unknown: '<unknown>',
  inputFileText: '{{name}} ({{size}} bytes)',
  loading: '... loading ...',
  mnemonic: 'Generated 12-word mnemonic seed:',
  copyToClipboard: 'Copy to clipboard',
  back: 'Back',
  createAccount: 'Create new account',
  importAccountFromPreSeed: 'Import account from pre-existing seed',
  restoreAccount: 'Restore account from JSON backup file',
  attachExternalAccount: 'Attach external QR-signer account',
  externalQrAccount: 'External QR accounts and Access',
  allowCameraAccess: 'Allow Camera Access',
  displayAddressFor: 'Display address format for',
  language: 'Language',
  openExtensionInNewWindow: 'Open extension in new window',
  shortAccountName: 'Account name is too short',
  descriptiveName: 'A descriptive name for your account',
  shortPasswordWarning: 'Password is too short',
  newPassword: 'A new password for this account',
  repeatPassword: 'Repeat password for verification',
  rename: 'Rename',
  deriveAccount: 'Derive New Account',
  exportAccount: 'Export Account',
  forgetAccount: 'Forget Account',
  authorize: 'Authorize',
  createAccountPlaceholder: 'Add the account with the generated seed',
  createAccountHeader: 'Create an account',
  mnemonicSeedWarning:
    "Please write down your wallet's mnemonic seed and keep it in a safe place. The mnemonic can be used to restore your wallet. Keep it carefully to not lose your assets.",
  mnemonicSeedSaved: 'I have saved my mnemonic seed safely.',
  derivationPath: 'Derivation Path',
  derivationPathPlus: 'Derivation Path (unlock to edit)',
  derivePlaceholder: '//hard/soft',
  deriveHeader: 'Add new account',
  deriveAccountBtnText: 'Create derived account',
  deriveAccountFromExisting: 'Derive new account from existing',
  chooseParentAcc: 'Choose Parent Account:',
  enterPasswordToDerive: 'enter the password for the account you want to derive from',
  createDeriveAccount: 'Create a derived account',
  exportAccountWarning: "You are exporting your account. Keep it safe and don't share it with anyone.",
  passwordForThisAcc: 'password for this account',
  cancel: 'Cancel',
  removeAccountNoti:
    'You are about to remove the account. This means that you will not be able to access it via this extension anymore. If you wish to recover it, you would need to use the seed.',
  scanAddressQr: 'Scan Address Qr',
  addAccountWithIndentityAddress: 'Add the account with identified address',
  importAccount: 'Import account',
  existingMnemonicSeed: 'existing 12 or 24-word mnemonic seed',
  addAccountWithSuppliedSeed: 'Add the account with the supplied seed',
  metadata: 'Metadata',
  from: 'from',
  icon: 'icon',
  upgrade: 'upgrade',
  reject: 'Reject',
  restoreJson: 'Restore from JSON',
  passwordForThisFile: 'Password for this file',
  restore: 'Restore',
  bytes: 'bytes',
  methodData: 'method data',
  method: 'method',
  info: 'info',
  immortal: 'immortal',
  extrinsicText: 'mortal, valid from {{birth}} to {{death}}',
  genesis: 'genesis',
  version: 'version',
  nonce: 'nonce',
  tip: 'tip',
  signTheTransaction: 'Sign the transaction',
  signTheMessage: 'Sign the message',
  qrMessage: 'Scan signature via camera',
  welcome: 'Welcome',
  errorBoundaryTitle: 'An error occured',
  errorBoundaryMessage: 'Something went wrong with the query and rendering of this component. {{message}}',
  backToHome: 'Back to home',
  externalAccount: 'external account',
  phishingDetected: 'Phishing detected',
  rememberPassword: 'Remember my password for the next {{expiration}} minutes',
  extendPeriodWithoutPassword: 'Extend the period without password by {{expiration}} minutes',
  phishingMessage:
    'You have been redirected because the Polkadot{.js} extension believes that this website could compromise the security of your accounts.',
  copyAddress: 'copy address',
  accountVisibility: 'account visibility',
  wrongPassword: 'Wrong password',
  incorrectDerivationPath: 'Incorrect derivation path',
  lifetime: 'lifetime',
  caplockWarning: 'Warning: Caps lock is on',
  manageWebsiteAccess: 'Manage Website Access',
  example: 'example.com',
  noWebsiteErr: 'No website request yet!',
  allowed: 'allowed',
  denied: 'denied',
  dark: 'Dark',
  light: 'Light',
  invalidMnemonic: 'Invalid mnemonic seed',
  mnemonicWarning: 'Mnemonic needs to contain 12, 15, 18, 21, 24 words',
  derivationPathPlaceholder: '//hard',
  passwordNotFound: '`///password` not supported for derivation',
  softDerivationMessage: 'Soft derivation is only allowed for sr25519 accounts',
  invalidDerivationPath: 'Invalid derivation path',
  hardwareAccount: 'hardware wallet account',
  cameraWarning: 'Camera access must be first enabled in the settings',
  ledgerWarning: 'Ledger devices can only be connected with Chrome browser',
  attachLedgerAccount: 'Attach ledger account',
  connectLadgerDevice: 'Connect Ledger device',
  externalAccountsAndAccess: 'External accounts and Access',
  allowQrCameraAccess: 'Allow QR Camera Access',
  addAccount: 'Add Account',
  accountType: 'Account type {{index}}',
  addressIndex: 'Address index {{index}}',
  importLedgerAcc: 'Import Ledger Account',
  network: 'Network',
  accountTypeLabel: 'Account type',
  addressIndexLabel: 'Address index',
  refresh: 'Refresh',
  signOnLedger: 'Sign on Ledger',
  defaultNetworkKey: 'Allow use on any chain',
  selectNetwork: 'Select network',
  phishingMessage2:
    'You have been redirected because the Polkadot{.js} extension believes that this website could compromise the security of your accounts and your tokens.',
  exportAllAccount: 'Export all accounts',
  allAccount: 'All account',
  encryptingPassword: 'password for encrypting all accounts',
  notification: 'Notifications',
  searchAddress: 'Search by name or network...',
  alAccounts: 'All Accounts',
  viewOnExplorer: 'View Account on Explorer',
  exportPrivateKey: 'Export Private Key',
  chooseFileText: 'Drag and drop the file here',
  networkSearchPlaceholder: 'Search network...',
  showZeroBalance: 'Show Zero Balances',
  noAccountMessage:
    "You currently don't have any accounts. Create your first account or import another account to get started.",
  nextStep: 'Next Step',
  accountAllNotSupport: 'Account "All" doesn\'t support this action. Please switch to another account',
  noTokenQuestion: "Don't see your token?",
  refreshList: 'Refresh list',
  or: 'or',
  importTokens: 'import tokens',
  winner: 'Winner',
  fail: 'Fail',
  active: 'Active',
  crowdloanAppear: 'Your crowdloans will appear here',
  crypto: 'Crypto',
  nFTs: 'NFTs',
  crowdloans: 'Crowdloans',
  staking: 'Staking',
  transfers: 'Transfers',
  nftAppear: 'Your NFTs will appear here',
  noStakingAccount: 'No staking data was recorded',
  transactionAppear: 'Transactions will appear here',
  fee: 'Fee:',
  transactionMessage: "You can't view this transaction because it isn't supported on Subscan",
  authorizeTransaction: 'Authorize Transaction',
  callHash: 'Call hash',
  signAndSubmit: 'Sign and Submit',
  positiveNumber: 'Positive number',
  sendingFromMyAcc: 'Sending from my account',
  unlockAccountWithPassword: 'unlock account with password',
  unlockForMin: 'Unlock for {{expiry}} min',
  accountDoesNothaveEnoughFreeFunds:
    'The account does not have enough free funds (excluding locked/bonded/reserved) available to cover the transaction fees without dropping the balance below the account existential amount.',
  tipMessage: 'Include an optional tip for faster processing',
  notIncludeTip: 'Do not include a tip for the block author',
  tipForExtrinxic: 'Add a tip to this extrinsic, paying the block author for greater priority',
  tipLabel: 'Tip (optional)',
  actionNotSupportNetwork: 'The action is not supported for the current network. Please switch to another network.',
  actionNotSupportAccount: 'The action is not supported for the current account. Please switch to another account.',
  sendFund: 'Send fund',
  sendFromAccount: 'The account you will send funds from.',
  sendFromAccountLabel: 'Send from account',
  transferable: 'Transferable',
  sendToAccount: 'Select a contact or paste the address you want to send funds to.',
  sendToAccountLabel: 'Send to address',
  sendFundWarning: 'The recipient is associated with a known phishing site on {{url}}',
  sendFundWarning2: 'The recipient address is the same as the sender address.',
  sendFundNoti: 'The full account balance to be transferred, minus the transaction fees',
  sendFundText: 'transferable minus fees',
  sendFundText2:
    'Type the amount you want to transfer. Note that you can select the unit on the right e.g sending 1 milli is equivalent to sending 0.001.',
  amountLabel: 'amount',
  sendFundWarning3: 'The amount you want to transfer is greater than your available balance.',
  sendFundWarning4: 'The minimum amount that an account should have to be deemed active',
  existentialDeposit: 'existential deposit',
  sendFundText3: 'Transfer with account keep-alive checks',
  sendFundText4: 'Normal transfer without keep-alive checks',
  sendFundText5: 'Transfer the full account balance, reap the sender',
  sendFundWarning5:
    'There is an existing reference count on the sender account. As such the account cannot be reaped from the state.',
  sendFundWarning6:
    'The transaction, after application of the transfer fees, will drop the available balance below the existential deposit. As such the transfer will fail. The account needs more free funds to cover the transaction fees.',
  makeTransfer: 'Make Transfer',
  viewTransaction: 'View Transaction',
  sendFundSuccessful: 'Send Fund Successful',
  authTransactionSuccessfulMessage:
    'Your request has been confirmed. You can track its progress on the Transaction History page.',
  sendFundFail: 'Send Fund Fail',
  authTransactionFailMessage:
    'There was a problem with your request. You can track its progress on the Transaction History page.',
  authTransactionFailMessage2: 'There was a problem with your request.',
  resend: 'Resend',
  getStarted: 'Get started',
  restoreJsonPlaceholder: 'Please drag an drop the .json file you exported from Polkadot.js',
  connectSubWallet: 'Connect the SubWallet',
  connectSite: 'Make sure you trust this site before connecting',
  connect: 'Connect',
  export: 'Export',
  forget: 'Forget',
  updateMetadata: 'Update Metadata',
  metadataOutOfDate: 'Your metadata is out of date',
  symbol: 'Symbol',
  decimals: 'Decimals',
  approve: 'Approve',
  importJsonFileLabel: 'IMPORT FROM POLKADOT.JS',
  approveRequest: 'Approve Request',
  approveRequestMessage: 'You are approving a request with account',
  hideDetail: 'Hide Details',
  viewDetails: 'View Details',
  donate: 'Donate',
  donateFromAddress: 'Select a contact or paste the address you want to donate to.',
  donateToAddress: 'Donate to address',
  privateKey: 'Private Key',
  Json: 'JSON',
  importAccountFromSeedphrase: 'Import account from Seed Phase',
  importPrivateKeyFromMetamask: 'Import private key from Metamask',
  restoreJsonTitle: 'Restore account from Polkadot{.js}',
  importPrivateKeyBtnText: 'Add the account with the supplied private key',
  invalidPrivateKey: 'Invalid private key',
  metamaskPrivateKey: 'Metamask private key',
  importPrivateKeyWarning: 'Private key needs to start with 0x and 64 keys',
  existingPrivateKey: 'existing 12 or 24-word private key',
  changeAvatar: 'Change Avatar',
  limitedSizeAvatar: 'File is too large (limited 500KB)',
  privateKeyWarning:
    "The private key must be a string of 0x and 64 characters. If it doesn't start with 0x, please add it manually.",
  disconnectAccountQuestion: 'Do you want to disconnect this account?',
  disconnect: 'Disconnect',
  generalSetting: 'General Setting',
  about: 'About',
  general: 'General',
  networks: 'Networks',
  advanced: 'Advanced',
  contacts: 'Contacts',
  securityAndPrivacy: 'Security & Privacy',
  alerts: 'Alerts',
  networkEdit: 'Network Edit',
  networkName: 'Network name',
  newRpcUrl: 'New RPC URL',
  chainId: 'Chain id',
  currencySymbol: 'Currency symbol',
  blockExplorer: 'Block Explorer (Optional)',
  save: 'Save',
  disconnectAll: 'Disconnect All',
  connectAll: 'Connect All',
  forgetAll: 'Forget All',
  forgetSite: 'Forget Site',
  chooseAccountMessage: 'Choose the account(s) you’d like to connect',
  importAccountFromSeedPhrase: 'Import account from Seed Phrase',
  nameSearching: 'Search by name...',
  noSubstrateAccountMessage:
    "You don't have any substrate account. Please create, import or restore an account to continue",
  autoConnectDAppAfterCreating: 'Auto connect to all DApp after creating',
  autoConnectDAppAfterImport: 'Auto connect to all DApp after importing',
  autoConnectDAppAfterRestore: 'Auto connect to all DApp after restore',
  donateAuthTransactionHelp: 'The address you want to donate to.',
  sendfundAuthTransactionHelp: 'The address you want to send funds to.',
  authTransactionPasswordLabel: 'Unlock account with password',
  sendFundWarning7: 'Transfer is not supported for this type of account and token',
  sendFundWarning8: 'The transfer for the current token is not supported',
  sendFundWarning9: 'The recipient address must be same type as the sender address.',
  sendFundWarning10:
    ' The main token ({{mainToken}}) free balance of the sender is not enough to perform this transaction',
  manageEvmToken: 'Manage EVM Tokens',
  configureEvmToken: 'Configure EVM Token',
  contractAddress: 'Contract Address (*)',
  tokenName: 'Token Name (*)',
  symbolRequire: 'Symbol (*)',
  decimalsRequire: 'Decimals (*)',
  chain: 'Chain',
  tokenType: 'Token Type',
  atLeastOneToken: 'At least 1 token must be selected',
  customEvmTokens: 'Custom EVM tokens',
  searchToken: 'Search token...',
  deletedToken: 'Delete Tokens',
  confirm: 'Confirm',
  notValidPrivateKey: 'Not a valid private key',
  notEmptyPrivateKey: 'Private key cannot be empty',
  selectNetworkMessage:
    'Please only select networks that you need to optimize resource consumption. You can always turn them on later if needed',
  enableAtLeastOneNetwork: 'Please enable at least 1 network',
  configureNetwork: 'Configure network',
  providerUrlRequire: 'Provider URL (*)',
  networkNameRequire: 'Network name (*)',
  paraId: 'paraId',
  ethChainId: 'Ethereum Chain ID',
  crowdloanUrlOptional: 'Crowdloan Url (Optional)',
  coingeckoKeyOptional: 'Coingecko key (Optional)',
  networkSettings: 'Network Settings',
  resetToDefault: 'Reset to default',
};
