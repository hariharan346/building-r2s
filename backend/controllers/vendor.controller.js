import Vendor from "../models/Vendor.js";

export const getVendorProfile = async (req, res) => {
  const vendor = await Vendor.findById(req.params.vendorId);
  if (!vendor) return res.status(404).json({ message: "Vendor not found" });
  res.json(vendor);
};
