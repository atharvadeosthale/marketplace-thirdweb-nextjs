import { useAddress, useMarketplace } from "@thirdweb-dev/react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import ListingCard from "../components/ListingCard";

const Listings = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const address = useAddress();
  const router = useRouter();
  const marketplace = useMarketplace(
    process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT_ADDRESS
  );

  useEffect(() => {
    if (!address) router.replace("/");
  }, [address]);

  useEffect(() => {
    getListings();
  }, []);

  const getListings = async () => {
    try {
      if (!address) return;
      const list = await marketplace.getActiveListings();
      console.log(list);
      setListings(list);
      setLoading(false);
    } catch (err) {
      console.error(err);
      alert("Error fetching listings");
    }
  };

  return (
    <div className="listing">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {listings.length > 0 ? (
            listings.map((listing) => (
              <ListingCard
                name={listing.asset.name}
                description={listing.asset.description}
                image={listing.asset.image}
                price={listing.buyoutPrice}
                id={listing.id}
                key={listing.id}
              />
            ))
          ) : (
            <div className="listings__none">No listings available</div>
          )}
        </div>
      )}
    </div>
  );
};
export default Listings;
