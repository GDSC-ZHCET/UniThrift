import { useState, useEffect, useContext } from "react";
import { db } from "../firebase";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import UserContext from "../utils/UserContext";

const RequestItem = () => {
  const { currentUser } = useContext(UserContext);
  const [requests, setRequests] = useState([]);
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (!currentUser) return;
    
    const fetchRequests = async () => {
      try {
        const q = query(collection(db, "requests"), where("userId", "==", currentUser.uid));
        const querySnapshot = await getDocs(q);
        const requestList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setRequests(requestList);
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };

    fetchRequests();
  }, [currentUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!itemName.trim() || !description.trim()) return;

    try {
      const docRef = await addDoc(collection(db, "requests"), {
        userId: currentUser.uid,
        itemName,
        description,
        timestamp: new Date(),
      });

      setRequests([...requests, { id: docRef.id, itemName, description }]);
      setItemName("");
      setDescription("");
    } catch (error) {
      console.error("Error adding request:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-6">
      <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">Your Requests</h2>
      
      <ul className="space-y-4">
        {requests.map((req) => (
          <li key={req.id} className="bg-gray-100 p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-800">{req.itemName}</h3>
            <p className="text-gray-600">{req.description}</p>
          </li>
        ))}
      </ul>

      <form onSubmit={handleSubmit} className="mt-6">
        <div className="flex flex-col gap-4">
          <input 
            type="text" 
            value={itemName} 
            onChange={(e) => setItemName(e.target.value)} 
            placeholder="Item Name" 
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <textarea 
            value={description}
            onChange={(e) => setDescription(e.target.value)} 
            placeholder="Description" 
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          ></textarea>
          <button 
            type="submit" 
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Submit Request
          </button>
        </div>
      </form>
    </div>
  );
};

export default RequestItem;
