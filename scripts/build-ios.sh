#!/bin/sh

cd ./ios
rm -rf ./build && rm -rf ./dist && pod install

#Builds the xcarchive
xcodebuild -workspace ./SoulWalletMobile.xcworkspace -scheme SoulWalletMobile -sdk iphoneos -configuration Release -quiet -archivePath $PWD/dist/SoulWallet.xcarchive clean archive

# Builds the ipa and uploads it to the appstore
xcodebuild -exportArchive -archivePath $PWD/dist/SoulWallet.xcarchive -exportOptionsPlist exportOptions.plist -exportPath $PWD/dist