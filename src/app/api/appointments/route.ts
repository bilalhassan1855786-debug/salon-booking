
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    success: true,
    appointments: [],
    message: "Demo mode: no appointments are stored.",
  });
}

export async function POST(request: Request) {
  try {
    const appointment = await request.json();

    return NextResponse.json({
      success: true,
      message: "Demo booking completed successfully!",
      appointment,
      demo: true,
    });
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid booking data." },
      { status: 400 }
    );
  }
}
