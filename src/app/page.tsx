"use client";

import axios from "axios";
import Image from "next/image";
import { RefObject, useEffect, useRef, useState } from "react";

const API_URL = "https://api.api-ninjas.com/v1/qrcode?format=png&data=";

export default function Home() {
  const [payload, setPayload] = useState("");
  const [qr, setQr] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef() as RefObject<HTMLInputElement>;

  const getQR = async () => {
    if (!payload) return;
    setLoading(true);
    const res = await axios.get(API_URL + payload, {
      headers: { "X-Api-Key": process.env.API_KEY || "" },
    });
    setQr(res.data);
    setLoading(false);
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="container max-w-md h-2/3">
        <h1 className="text-3xl text-center">QR Code Generator</h1>
        <hr />
        <div className="w-full flex my-4">
          <input
            className="grow border border-black focus:outline-none px-2 py-1 text-xl rounded-l"
            type="text"
            value={payload}
            ref={inputRef}
            onChange={(e) => setPayload(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && getQR()}
          />
          <button
            className="px-2 py-1 text-xl text-white bg-black rounded-r"
            onClick={getQR}
          >
            Generate
          </button>
        </div>
        <div className="flex justify-center">
          {!payload && (
            <p className="italic">Enter some data to generate QR Code.</p>
          )}
          {loading && <p className="italic">Loading...</p>}
          {qr && (
            <Image
              src={`data:image/png;charset=utf-8;base64,${qr}`}
              alt="QR Code"
              width={128}
              height={128}
            />
          )}
        </div>
      </div>
    </div>
  );
}
