import {useEffect, useState} from 'react';
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
  const [subscriptionData, setSubscriptionData] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);

  const params = new URLSearchParams(window.location.search);
  const page = params.get('page') || 1;
  const update = async () => {
    try {
      const response = await api.get('subscription' + '?page=' + page,)
      setLoading(false);
      setSubscriptionData(response.data.subscription);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(true)
      setSubscriptionData([])
    }
  }

  useEffect(() => {
    update();
    const interval = setInterval(update, 1000 * 5); // 100 milliseconds
    return () => clearInterval(interval);
  }, [subscriptionData]);


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