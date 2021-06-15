import React from 'react'
import { Image, StyleSheet, TouchableOpacity} from 'react-native'

export default function Logo() {
  return (
  <TouchableOpacity style={styles.container}>
  <Image source={require('../assets/logo.png')} style={styles.image}/>
  </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  image: {
    width: 110,
    height: 110,
    borderRadius: 8
  },
})
