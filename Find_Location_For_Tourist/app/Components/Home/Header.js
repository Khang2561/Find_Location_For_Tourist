import { View, Image, StyleSheet, TextInput } from 'react-native';
import React from 'react';
import Common from '../../Common/Common'

export default function Header() {
  return (
    <View style={styles.container}>
      {/*Logo*/}
      <Image 
        source={require('../../../assets/images/logo.jpg')}
        style={styles.logo}
      />
      
      {/*Search*/}
      <TextInput 
        placeholder='Điền vào nơi mà bạn muốn đến'
        style={styles.search}
      />
      
      {/*User Image*/}
      <Image 
        source={require('../../../assets/images/logo.jpg')}
        style={styles.userImage}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center', // Căn chỉnh theo trục dọc
    justifyContent: 'space-between', // Khoảng cách đều giữa các thành phần
    paddingHorizontal: 10, // Khoảng cách hai bên
    paddingVertical: 5, // Khoảng cách trên dưới
  },
  logo: {
    width: 40,
    height: 40,
  },
  search: {
    borderWidth: 1,
    borderColor: Common.blank,
    padding: 6,
    borderRadius: 30, // Bo tròn các góc vừa phải
    paddingLeft: 15,
    flex: 1, // Chiếm phần còn lại của không gian
    marginHorizontal: 10, // Khoảng cách giữa các phần tử
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20, // Bo tròn ảnh người dùng
  },
});

