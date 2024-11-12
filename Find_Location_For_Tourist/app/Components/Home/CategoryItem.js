import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'

export default function CategoryItem({ category }) {
    return (
        <View style={styles.containerCategory}>
            <Image
                source={category.icon}
                style={styles.iconCategory}
            />
            <Text style={styles.categoryTitle}>{category.name}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    containerCategory: {
        padding: 10,
        alignItems: 'center', // Canh giữa các phần tử theo chiều ngang
        justifyContent: 'center', // Canh giữa theo chiều dọc
        margin: 10,
        width: 100,
        height: 120,
        borderRadius: 15,
        backgroundColor: '#f2f2f2', // Màu nền sáng
        shadowColor: '#000', // Đổ bóng nhẹ
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3, // Tăng chiều sâu trên Android
    },
    iconCategory: {
        width: 50,
        height: 50,
        marginBottom: 10, // Khoảng cách giữa icon và tên
        borderRadius: 8, // Bo góc cho icon
    },
    categoryTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333', // Màu chữ đậm hơn cho dễ đọc
        textAlign: 'center', // Canh giữa chữ
    },
});
