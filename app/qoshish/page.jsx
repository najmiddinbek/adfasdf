"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddTopic() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [adress, setAdress] = useState("");
  const [telefon, setTelefon] = useState("")

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description) {
      alert("Title and description are required.");
      return;
    }

    try {
      const res = await fetch("/api/topics", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ title, description, adress, telefon }),
      });

      if (res.ok) {
        router.push("/qoshish");
        alert("Muvaffaqiyatli yuborildi!")
      } else {
        throw new Error("Failed to create a topic");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">

      <select className="border border-slate-800 py-2 px-3" onChange={(e) => setTitle(e.target.value)} value={title}>
        <option>Tanlang</option>
        <option>Osh</option>
        <option>Sho`rva</option>
        <option>Mastava</option>
        <option>Qotirma</option>
      </select>


      <select className="border border-slate-800 py-2 px-3" onChange={(e) => setDescription(e.target.value)}>
        <option>Tanlang</option>
        <option>1-pors</option>
        <option>2-pors</option>
        <option>3-pors</option>
      </select>

      <input onChange={(e) => setAdress(e.target.value)} value={adress} className="border border-slate-500 px-8 py-2" type="text"
        placeholder="Manzili" />
      <input onChange={(e) => setTelefon(e.target.value)} value={telefon} className="border border-slate-500 px-8 py-2" type="text"
        placeholder="Telefon raqam" />

      <button type="submit" className="">
        Qoshish
      </button>
    </form>
  );
}
