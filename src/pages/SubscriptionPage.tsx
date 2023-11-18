import {useEffect, useState} from 'react';
import {SubscriptionTable} from "@/components/subscription-table.tsx";
import api from "@/api/api.ts";
import {Subscription} from "@/types/subscription.ts";
import {StatusCodes} from "http-status-codes";
import {useAuth} from "@/context/auth-context.tsx";

const SubscriptionPage = () => {
  const { onLogout } = useAuth();
  const [subscriptionData, setSubscriptionData] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);

  const params = new URLSearchParams(window.location.search);
  const page = params.get('page') || 1;
  const update = async () => {
    try {
      api.post("/verify-token",).then((response) => {
        if (response.status !== StatusCodes.OK) {
          onLogout();
        }
      });

      const response = await api.get('subscription' + '?page=' + page,)
      setLoading(false);
      setSubscriptionData(
        () => ([
          ...response.data.subscription,
        ])
      );
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(true)
      setSubscriptionData(() => ([]));
    }
  }

  useEffect(() => {
    const interval = setInterval(update, 1000); // 100 milliseconds
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