import { Suspense } from "react";
import VerifyOtpClient from "./VerifyOtpClient";

export const dynamic = "force-dynamic";

export default function VerifyOtpPage() {
  return (
    <Suspense fallback={<Loading />}>
      <VerifyOtpClient />
    </Suspense>
  );
}

function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      Loading...
    </div>
  );
}
