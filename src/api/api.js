import api from "./api";

/**
 * VENDOR JOBS
 */
export const getVendorJobs = async () => {
  const res = await api.get("/jobs/vendor");
  return res.data;
};

/**
 * ACCEPT JOB
 */
export const acceptJob = async (jobId) => {
  const res = await api.patch(`/jobs/${jobId}/accept`);
  return res.data;
};

/**
 * REJECT JOB
 */
export const rejectJob = async (jobId) => {
  const res = await api.patch(`/jobs/${jobId}/reject`);
  return res.data;
};

/**
 * COMPLETE JOB
 */
export const completeJob = async (jobId) => {
  const res = await api.patch(`/jobs/${jobId}/complete`);
  return res.data;
};
