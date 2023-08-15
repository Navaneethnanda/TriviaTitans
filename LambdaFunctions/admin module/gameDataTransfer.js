const { Firestore } = require("@google-cloud/firestore");

const axios = require("axios");

// Firestore configuration

const firestore = new Firestore();

exports.TeamAndUserCloudFunction = async (req, res) => {
  try {
    const lambdaResponse = await axios.post(
      "https://ggsoypu4pe.execute-api.us-east-1.amazonaws.com/dataTransfer/"
    );

    await deleteAllFirestoreData();

    // Store data in Firestore

    const collectionRef = firestore.collection("LeaderBoardData");

    const data = lambdaResponse.data.value;

    console.log("Data: ", data);

    await Promise.all(
      data.map(async (item) => {
        await collectionRef.add(item);
      })
    );

    res.status(200).send("Data stored in Firestore successfully.");
  } catch (error) {
    console.error("Error calling Lambda and storing data:", error);

    res.status(500).send("An error occurred.");
  }
};

async function deleteAllFirestoreData() {
  // Get all documents from the collection

  const collectionRef = firestore.collection("LeaderBoardData");

  const querySnapshot = await collectionRef.get();

  // Create a batch to delete all documents

  const batch = firestore.batch();

  querySnapshot.forEach((doc) => {
    batch.delete(doc.ref);
  });

  // Commit the batch delete operation

  await batch.commit();
}
