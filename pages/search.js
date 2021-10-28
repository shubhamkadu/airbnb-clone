import Header from "../components/Header";
import Footer from "../components/Footer";
import { useRouter } from "next/dist/client/router";
import { format } from "date-fns";
import InforCard from "../components/infoCard";
import Map from "../components/Map";
function Search({ searchResult }) {
  const router = useRouter();

  console.log(searchResult);

  const { location, startDate, endDate, noOfGuests } = router.query;

  const range = `${startDate} - ${endDate}`;

  return (
    <div>
      <Header placeholder={`${location} | ${range} | ${noOfGuests}`} />
      <div className="flex">
        <section className="inline-flex min-h-[400px] min-w-[100%]">
          <Map searchResult={searchResult} />
        </section>
      </div>
      <main className="flex">
        <section className="flex-grow pt-14 px-6">
          <p className="text-xs">
            300+ stays -{range}- for {noOfGuests} Guests
          </p>

          <h1 className="text-3xl font-semibold mt-2 mb-6 ">
            Stays in {location}
          </h1>
          <div
            className="hidden lg:inline-flex mb-5 space-x-3
           text-gray-800 whitespace-nowrap"
          >
            <p className="button">cancellation Flexibility</p>
            <p className="button">Types of place </p>
            <p className="button">Price</p>
            <p className="button">Rooms and Beds</p>
            <p className="button">More Filters</p>
          </div>
          <div className="flex flex-col">
            {searchResult.map(
              ({ img, title, location, description, star, price, total }) => (
                <InforCard
                  key={img}
                  img={img}
                  location={location}
                  title={title}
                  price={price}
                  total={total}
                  star={star}
                  description={description}
                />
              )
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Search;

export async function getStaticProps() {
  const searchResult = await fetch("https://links.papareact.com/isz").then(
    (res) => res.json()
  );

  return {
    props: {
      searchResult: searchResult,
    },
  };
}
