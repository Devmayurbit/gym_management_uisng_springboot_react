import Hero from "../Components/Hero.jsx";
import Features from "../Components/Features.jsx";
import MembersMini from "./_MembersMini.jsx"; // demo CRUD
import { useEffect } from "react";
export default function Home() {
  useEffect(() => {
    fetch("http://localhost:8080/api/trainers")
      .then(res => res.json())
      .then(data => console.log("✅ Connected to Backend:", data))
      .catch(err => console.log("❌ Connection Error:", err));
  }, []);
  return (
    <>
      <Hero />
      <Features />
      <MembersMini />
    </>
  );
}
