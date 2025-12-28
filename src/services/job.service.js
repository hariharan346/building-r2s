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
