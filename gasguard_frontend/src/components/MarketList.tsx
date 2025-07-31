import { useEffect, useState } from "react";

interface Market {
  instId: string;
  last: string;
  vol24h: string;
}

const MarketList = () => {
  const [markets, setMarkets] = useState<Market[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMarkets = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/markets");
        const data = await res.json();
        setMarkets(data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching markets:", error);
        setLoading(false);
      }
    };

    fetchMarkets();
  }, []);

  if (loading) return <p className="text-white">Loading markets...</p>;

  return (
    <div className="p-4 text-white">
      <h2 className="text-2xl font-bold mb-4">Live Market Prices</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {markets.map((market, idx) => (
          <div
            key={idx}
            className="bg-gray-900 p-4 rounded-lg shadow hover:scale-105 transition"
          >
            <h3 className="font-semibold">{market.instId}</h3>
            <p>Last Price: {market.last}</p>
            <p>24h Vol: {market.vol24h}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketList;
