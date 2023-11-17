import React, {useEffect, useState} from 'react';
import axios from "axios";
import {SubscriptionTable} from "@/components/subscription-table.tsx";
import api from "@/api/api.ts";

interface Subscription {
  userId: number;
  premiumAlbumId: number;
  username: string;
  albumName: string;
  artist: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

const SubscriptionPage = () => {
  const [subscriptionData, setSubscriptionData] : [Subscription[], (subscriptionData: Subscription[]) => void] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // get current page from query params
    const params = new URLSearchParams(window.location.search);
    const page = params.get('page') || 1;
    const fetchData = async () => {
    try {
      const response = await api.get('subscription' + '?page=' + page,);
      setSubscriptionData(response.data.subscription ?? [])
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(true)
    }
  }
  fetchData()
  }, []);


  return (
    <div className='mt-2 w-800 flex flex-col items-center '>
      <div>
        {
          loading ? <div className="text-white">Loading . . .</div> : <SubscriptionTable data={subscriptionData} />
        }
      </div>
    </div>
  );
};

export default SubscriptionPage;