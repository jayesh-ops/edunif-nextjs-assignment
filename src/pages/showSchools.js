import { useState, useEffect } from "react";
import axios from "axios";

const ShowSchools = () => {
  const [schools, setSchools] = useState([]);

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        // Fetch schools data from API
        const response = await axios.get("/api/getSchool");
        setSchools(response.data);
      } catch (error) {
        console.error("Error fetching schools:", error);
      }
    };

    fetchSchools();
  }, []);

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap w-full mb-20">
          <div className="lg:w-1/2 w-20 mb-6 lg:mb-0">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
              Schools List
            </h1>
            <div className="h-1 w-20 bg-indigo-500 rounded"></div>
          </div>
        </div>
        <div className="flex flex-wrap -m-4">
          {schools.map((school) => (
            <div key={school.id} className="xl:w-1/4 md:w-1/2 p-4">
              <div className="bg-gray-100 p-6 rounded-lg">
                <img
                  className="h-70 rounded w-70 object-cover object-center mb-6"
                  src={`${school.image}`} // Adjust path as per your API response
                  alt={school.name}
                />
                <h1 className="tracking-widest text-black font-bold text-xl title-font mb-2">
                  {school.name}
                </h1>
                <h3 className="tracking-widest text-indigo-500 text-xs font-medium title-font mb-4">
                  {school.address} {school.city}
                </h3>
                <h3 className="tracking-widest  text-medium font-medium title-font ">
                  Contact Details
                </h3>
                <h2 className="text-gray-900 font-xs title-font mb-2">
                  {school.email_id}
                </h2>
                <p className="leading-relaxed text-base mb-2">
                  {school.contact}
                </p>
                <a
                  href={school.applyUrl}
                  className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
                >
                  Apply Now
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShowSchools;