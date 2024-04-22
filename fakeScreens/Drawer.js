import React, { useState } from 'react';
import { View, Text, DrawerLayoutAndroid, TouchableOpacity, StyleSheet } from 'react-native';

const App = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const openDrawer = () => {
    drawerRef.openDrawer();
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    drawerRef.closeDrawer();
    setDrawerOpen(false);
  };

  let drawerRef;

  return (
    <DrawerLayoutAndroid
      ref={ref => (drawerRef = ref)}
      drawerWidth={300}
      drawerPosition="left"
      renderNavigationView={() => (
        <View style={styles.drawer}>
          <Text style={styles.drawerItem}>Drawer Item 1</Text>
          <Text style={styles.drawerItem}>Drawer Item 2</Text>
          <Text style={styles.drawerItem}>Drawer Item 3</Text>
        </View>
      )}
    >
      <View style={styles.container}>
        {/* Content */}
        <TouchableOpacity onPress={openDrawer} style={styles.hamburger}>
          <Text>☰</Text>
        </TouchableOpacity>
        <Text>Main Content</Text>
      </View>
    </DrawerLayoutAndroid>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hamburger: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
  },
  drawer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  drawerItem: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default App;