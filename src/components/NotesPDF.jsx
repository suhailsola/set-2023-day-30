import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 20,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
    textDecoration: "underline",
  },
  noteContainer: {
    marginBottom: 10,
    padding: 10,
    border: "1px solid #000000",
  },
  timestamp: {
    fontSize: 12,
    marginBottom: 5,
  },
  noteText: {
    fontSize: 14,
  },
});

const NotesPDF = ({ notes }) => {
  return (
    <Document>
      <Page style={styles.page}>
        <Text style={styles.title}>Notes</Text>
        {notes.map((note, index) => (
          <View key={index} style={styles.noteContainer}>
            <Text style={styles.timestamp}>{note.timestamp}</Text>
            <Text style={styles.noteText}>{note.note}</Text>
          </View>
        ))}
      </Page>
    </Document>
  );
};

export default NotesPDF;
