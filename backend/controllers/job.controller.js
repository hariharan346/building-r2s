import Job from "../models/Job.js";

/**
 * CREATE JOB (USER)
 */
export const createJob = async (req, res) => {
  try {
    const job = await Job.create({
      userId: req.user.id,
      serviceId: req.body.serviceId,
    });

    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * ACCEPT JOB (VENDOR)
 */
export const acceptJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: "Job not found" });

    if (job.status !== "pending")
      return res.status(400).json({ message: "Job already processed" });

    job.status = "accepted";
    job.vendorId = req.user.id;

    await job.save();
    res.json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * REJECT JOB (VENDOR)
 */
export const rejectJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: "Job not found" });

    if (job.status !== "pending")
      return res.status(400).json({ message: "Cannot reject" });

    job.status = "rejected";
    await job.save();

    res.json({ message: "Job rejected" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * CANCEL JOB (USER)
 */
export const cancelJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: "Job not found" });

    if (job.userId.toString() !== req.user.id)
      return res.status(403).json({ message: "Not authorized" });

    if (job.status === "completed")
      return res.status(400).json({ message: "Cannot cancel completed job" });

    job.status = "cancelled";
    await job.save();

    res.json({ message: "Job cancelled" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * COMPLETE JOB (VENDOR)
 */
export const completeJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: "Job not found" });

    if (job.vendorId?.toString() !== req.user.id)
      return res.status(403).json({ message: "Not authorized" });

    if (job.status !== "accepted")
      return res.status(400).json({ message: "Job not accepted yet" });

    job.status = "completed";
    await job.save();

    res.json({ message: "Job completed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * GET USER JOBS (USER)
 */
export const getUserJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ userId: req.user.id }).populate("vendorId");
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * GET VENDOR JOBS (VENDOR DASHBOARD)
 */
export const getVendorJobs = async (req, res) => {
  try {
    const jobs = await Job.find({
      status: "pending",
    })
      .populate("userId", "name location")
      .sort({ createdAt: -1 });

    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


/**
 * GET JOB WITH VENDOR DETAILS (USER → VIEW DETAILS)
 */
export const getJobWithVendor = async (req, res) => {
  const job = await Job.findById(req.params.jobId).populate("vendorId");
  if (!job) return res.status(404).json({ message: "Job not found" });
  res.json(job);
};
