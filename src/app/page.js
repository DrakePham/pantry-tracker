"use client";
import { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
} from "firebase/firestore";
import { db } from "../app/firebaseConfig";
import {
  Container,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Toolbar,
  Typography,
  AppBar,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Home() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "pantry-tracker"));
        setItems(
          querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
    console.log(items);
  }, []);
  const test = async () => {console.log("test");};
  const addItem = async () => {
    // console.log("newItem");
    if (newItem.trim()) {
      try {
        const q = query(collection(db, "pantry-tracker"), where("name", "==", newItem));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
          await addDoc(collection(db, "pantry-tracker"), {
            name: newItem,
            quantity: 1,
          });
        } else {
          const existingItem = querySnapshot.docs[0];
          const newQuantity = existingItem.data().quantity + 1;
          await updateDoc(doc(db, "pantry-tracker", existingItem.id), {
            quantity: newQuantity,
          });
        }
        setNewItem("");
        const updatedSnapshot = await getDocs(collection(db, "pantry-tracker"));
        setItems(
          updatedSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
      } catch (error) {
        console.error("Error adding item:", error);
      }
    }
  };

  const deleteItem = async (id) => {
    try {
      await deleteDoc(doc(db, "pantry-tracker", id));
      setItems(items.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  console.log(db);
  return (
    <Container>
      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <TextField
        label="New Item"
        variant="outlined"
        fullWidth
        margin="normal"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
        onKeyPress={(e) => (e.key === "Enter" ? addItem() : null)}
      />
      <Button variant="contained" color="primary" onClick={addItem}>
        ADD NEW ITEM
      </Button>
      <TableContainer component={Paper} style={{ marginTop: "20px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => deleteItem(item.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No items available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  
  );
}
