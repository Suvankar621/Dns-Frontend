import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./Home.css"
import React, { useEffect, useState } from 'react';

const Home = ({ User, Authtoken,setLoading }) => {
  const [dnsdata, setdnsdata] = useState([]);
  const [recordType, setRecordType] = useState('');
  const [recordName, setRecordName] = useState('');

  const handleSearch = async () => {

    try {
      setLoading(true);
      const URL = `https://management.azure.com/subscriptions/${User.subscriptionid}/resourceGroups/${User.resourcegroupname}/providers/Microsoft.Network/dnsZones/${User.Zone}/all?api-version=2018-05-01`;
      const { data } = await axios.get(URL, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: Authtoken,
        },
      });
      setLoading(false);
      setdnsdata(data.value);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleAddRecord = async () => {
    try {
      setLoading(true)
      const URL = `https://management.azure.com/subscriptions/${User.subscriptionid}/resourceGroups/${User.resourcegroupname}/providers/Microsoft.Network/dnsZones/${User.Zone}/${recordType}/${recordName}?api-version=2018-05-01`; // Replace with your endpoint URL
      const r=`${recordName}Records`
      const requestBody = {
        properties: {
          metadata: {
            key1: "value1",
          },
          TTL: 3600,
          r: [
            {
              ipv4Address: "127.0.0.1",
            },
          ],
        },
      };
    await axios.put(URL, requestBody, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: Authtoken,
        },
      });
      setLoading(false)
      toast.success("Record added successfully");
      // You can update the UI or fetch DNS records again after adding
    } catch (error) {
      toast.error("Error adding record:");
    }
  };

 
  const handleDeleteRecord = async () => {
    try {
      setLoading(true)
      const URL = `https://management.azure.com/subscriptions/${User.subscriptionid}/resourceGroups/${User.resourcegroupname}/providers/Microsoft.Network/dnsZones/${User.Zone}/${recordType}/${recordName}?api-version=2018-05-01`; // Replace with your endpoint URL
    
       await axios.delete(URL, {
        headers: {
            "Content-Type": "application/json",
            Authorization: Authtoken,
          }
         // Send data in the request body for DELETE requests
      });
      setLoading(false)
      toast.success("Record Deleted Succesfully");
      // You can update the UI or fetch DNS records again after deleting
    } catch (error) {
        toast.error("Not Deleted");
    }
  };
useEffect(()=>{
    handleSearch();
},[dnsdata])
  return (
    <>
      <div className="search">
        <div>
          <button onClick={handleSearch}>Fetch All Records</button>
        </div>
      </div>
      <div className="add-update-delete">
        <input
          type="text"
          placeholder="Record Type"
          value={recordType}
          onChange={(e) => setRecordType(e.target.value)}
        />
        <input
          type="text"
          placeholder="Record Name"
          value={recordName}
          onChange={(e) => setRecordName(e.target.value)}
        />
        <button onClick={handleAddRecord}>Add Record</button>
        <button onClick={handleDeleteRecord}>Delete Record</button>
      </div>
      <div className="container">
        <table>
          <thead>
            <tr>
              <th>DNS RECORDS NAME</th>
              <th>DNS TYPE</th>
            </tr>
          </thead>
          <tbody>
            {dnsdata.map((th, index) => (
              <tr key={index}>
                <td>{th.name}</td>
                <td>{th.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Home;
