import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, Text, TextInput } from 'react-native';
import { createAccountSuriV2, createSeedV2 } from '../messaging';
import { useNavigation } from '@react-navigation/native';
import { RootNavigationProps } from 'types/routes';
import { useSelector } from 'react-redux';
import { RootState } from 'stores/index';
import { Button } from 'components/Button';
import { SpaceStyle } from 'styles/space';

export const CreateAccount2 = () => {
  const accountStore = useSelector((state: RootState) => state.accounts);
  const accounts = accountStore.accounts;
  const [seedPhase, setSeedPhase] = useState('');
  const [name, setName] = useState('Account ' + accounts.length);
  const [password, setPassword] = useState('');
  const navigation = useNavigation<RootNavigationProps>();

  useEffect(() => {
    createSeedV2()
      .then(({ seed }) => {
        // setAddress(address);
        console.log('seed', seed);
        setSeedPhase(seed);
      })
      .catch(console.error);
  }, []);

  const createAccount = useCallback(() => {
    createAccountSuriV2(name, password, seedPhase, true, ['sr25519'])
      .then(created => {
        console.log('created', created);
        navigation.navigate('Home');
      })
      .catch(e => console.log('e--', e));
  }, [name, navigation, password, seedPhase]);

  return (
    <ScrollView style={SpaceStyle.oneContainer}>
      <Text>Seed Phase: </Text>
      <Text>{seedPhase}</Text>
      <TextInput
        placeholder="Name"
        defaultValue={name}
        onChange={e => {
          setName(e.nativeEvent.text);
        }}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry={true}
        textContentType="password"
        defaultValue={password}
        onChange={e => {
          setPassword(e.nativeEvent.text);
        }}
      />
      <Button title="Create Account" disabled={seedPhase === '[seed phase]'} onPress={createAccount} />
    </ScrollView>
  );
};