import React, { useEffect, useState } from "react";
import { collection, getDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import CouncilMemberCard from "../components/CouncilMemberCard";

const CouncilPage = () => {
  const [councilMembers, setCouncilMembers] = useState([]);

  // List all subcollection names + document IDs inside each
  const memberPaths = [
    // 4th year members
     { year: "cesa 4th year", subcollection: "Saumitra", docId: "Saumitra-1" },
    { year: "cesa 4th year", subcollection: "Paras", docId: "Paras1" },
    { year: "cesa 4th year", subcollection: "Vivek", docId: "Vivek1" },
    { year: "cesa 4th year", subcollection: "Siddhanta", docId: "Siddhanta1" },
    { year: "cesa 4th year", subcollection: "Anshika", docId: "Anshika1" },
    { year: "cesa 4th year", subcollection: "Bobby", docId: "Bobby1" },

    //3rd year members

    { year: "cesa 3rd year", subcollection: "Yashaswi", docId: "Yashaswi1" },
    { year: "cesa 3rd year", subcollection: "Kajal", docId: "Kajal1" },
     { year: "cesa 3rd year", subcollection: "Navneet", docId: "Navneet1" },
     { year: "cesa 3rd year", subcollection: "Sumit", docId: "Sumit1" },
    { year: "cesa 3rd year", subcollection: "Adarsh", docId: "Adarsh1" },
    { year: "cesa 3rd year", subcollection: "Siddhi", docId: "Siddhi1" },
    { year: "cesa 3rd year", subcollection: "Shreya", docId: "Shreya1" },
    { year: "cesa 3rd year", subcollection: "Aditi", docId: "Aditi1" },
    { year: "cesa 3rd year", subcollection: "Bhoomi", docId: "Bhoomi1" },
    { year: "cesa 3rd year", subcollection: "Devansh", docId: "Devansh1" },
    { year: "cesa 3rd year", subcollection: "Siddharth", docId: "Siddharth1" },
    { year: "cesa 3rd year", subcollection: "Vibha", docId: "Vibha1" },


  ];

  useEffect(() => {
    const fetchCouncilMembers = async () => {
      const members = [];

      for (const path of memberPaths) {
        try {
          const docRef = doc(
            db,
            "Council Members",
            path.year,
            path.subcollection,
            path.docId
          );
console.log("📍Fetching:", docRef.path);
          const snapshot = await getDoc(docRef);

          if (snapshot.exists()) {
            members.push({ id: snapshot.id, ...snapshot.data() });
          } else {
            console.warn(`⚠️ Document not found: ${path.docId}`);
          }
        } catch (error) {
          console.error(`❌ Error fetching ${path.subcollection}:`, error);
        }
      }

      setCouncilMembers(members);
      console.log("📦 Final members array:", members);
    };

    fetchCouncilMembers();
  }, []);

  return (
    <section className="pt-24 min-h-[200vh] w-full bg-blue-200">
      <div className="px-8 md:px-20">
        <div className="flex flex-wrap gap-8 justify-center">
          {councilMembers.length === 0 ? (
            <p>No council members found.</p>
          ) : (
            councilMembers.map((member, index) => (
              <CouncilMemberCard key={index} {...member} />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default CouncilPage;
