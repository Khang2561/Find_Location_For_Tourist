import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { supabase } from '../../../lib/supabase';

export default function SignUp({ onLoginSwitch }) {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [birthday, setBirthday] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Mật khẩu không trùng khớp!');
      return;
    }

    setIsLoading(true);
    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });
      if (authError) throw authError;

      const { error: insertError } = await supabase.from('user').insert({
        id: authData.user?.id,
        email,
        username,
        phone,
        birthday,
        password,
      });
      if (insertError) throw insertError;

      alert('Đăng ký thành công!');
      onLoginSwitch();
    } catch (error) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Đăng ký</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Tên đăng nhập"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Số điện thoại"
        value={phone}
        onChangeText={setPhone}
      />
      <TextInput
        style={styles.input}
        placeholder="Ngày sinh (YYYY-MM-DD)"
        value={birthday}
        onChangeText={setBirthday}
      />
      <TextInput
        style={styles.input}
        placeholder="Mật khẩu"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Xác nhận mật khẩu"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleSignup}
        disabled={isLoading}
      >
        <Text style={styles.buttonText}>Đăng ký</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonOutline}
        onPress={onLoginSwitch}
      >
        <Text style={styles.buttonOutlineText}>Quay lại Đăng nhập</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
      },
      heading: {
        fontSize: 24,
        marginBottom: 20,
      },
      input: {
        width: '100%',
        padding: 10,
        borderWidth: 1,
        marginBottom: 10,
        borderRadius: 5,
      },
      button: {
        width: '100%',
        padding: 15,
        backgroundColor: '#6200ee',
        borderRadius: 5,
        alignItems: 'center',
        marginVertical: 5,
      },
      buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
      },
      buttonOutline: {
        width: '100%',
        padding: 15,
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: '#6200ee',
        borderRadius: 5,
        alignItems: 'center',
        marginVertical: 5,
      },
      buttonOutlineText: {
        color: '#6200ee',
        fontSize: 16,
        fontWeight: 'bold',
      },
});
