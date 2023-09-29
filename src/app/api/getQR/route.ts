import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

const API_URL = "https://api.api-ninjas.com/v1/qrcode?format=png&data=";

async function handler(req: NextRequest) {
  const reqBody: { payload: string } = await req.json();
  const payload = reqBody.payload;
  const res = await axios.get(API_URL + payload, {
    headers: { "X-Api-Key": process.env.API_KEY as string },
  });
  return NextResponse.json({
    success: true,
    img: res.data,
  });
}

export { handler as POST };
