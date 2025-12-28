import { jobRequests } from "@/data/jobRequests";
import UserJobCard from "@/components/cards/UserJobCard";

function UserJobs() {
  return (
    <div className="max-w-3xl mx-auto space-y-4 p-4">
      <h1 className="text-xl font-bold">My Jobs</h1>

      {jobRequests.map((job) => (
        <UserJobCard key={job.id} job={job} />
      ))}
    </div>
  );
}

export default UserJobs;
