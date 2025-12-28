import { Button } from "@/components/ui/button";

function UserJobCard({ job }) {
  return (
    <div className="border rounded-lg p-4 space-y-2">
      <p><b>Service:</b> {job.serviceId}</p>
      <p><b>Status:</b> {job.status}</p>

      {/* 👇 STEP 1 LOGIC */}
      {job.status === "accepted" && (
        <Button size="sm">
          View Vendor Details
        </Button>
      )}
    </div>
  );
}

export default UserJobCard;
