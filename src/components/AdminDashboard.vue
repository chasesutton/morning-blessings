<template>
    <v-container>
      <v-row justify="center">
        <v-col cols="12" md="8">
          <h1>Admin Dashboard</h1>
          <v-data-table :headers="headers" :items="users" item-key="uid">
            <template #item.actions="{ item }">
              <v-btn @click="editUser(item)">Edit</v-btn>
              <v-btn @click="deleteUser(item)">Delete</v-btn>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import { getAuth } from 'firebase/auth';
  import { collection, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
  import { db } from '@/firebase';
  
  export default {
    setup() {
      const users = ref([]);
      const headers = [
        { text: 'Email', value: 'email' },
        { text: 'Role', value: 'role' },
        { text: 'Actions', value: 'actions', sortable: false },
      ];
  
      const fetchUsers = async () => {
        const querySnapshot = await getDocs(collection(db, 'users'));
        users.value = querySnapshot.docs.map(doc => ({ uid: doc.id, ...doc.data() }));
      };
  
      const editUser = async (user) => {
        // Implement user role editing logic
      };
  
      const deleteUser = async (user) => {
        await deleteDoc(doc(db, 'users', user.uid));
        fetchUsers();
      };
  
      onMounted(() => {
        fetchUsers();
      });
  
      return { users, headers, editUser, deleteUser };
    },
  };
  </script>
  