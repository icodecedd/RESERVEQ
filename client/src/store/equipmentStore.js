import { create } from "zustand";
import axios from "axios";
import { toTitleCase } from "@/utils/toTitleCase";

const useEquipmentStore = create((set, get) => ({
  equipment: [],
  loading: false,
  error: null,

  fetchEquipment: async () => {
    set({ loading: true, error: null });

    try {
      const res = await axios.get("/api/equipment");
      set({ equipment: res.data.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  stats: () => {
    const eq = get().equipment; // Your array of equipment objects

    const totalEquipment = eq.length;
    const totalAvailable = eq.filter((e) => e.status === "Available").length;
    const totalInUse = eq.filter((e) => e.status === "In Use").length;

    const utilizationPercentage = totalEquipment
      ? ((totalInUse / totalEquipment) * 100).toFixed(1)
      : 0;
    return {
      totalEquipment,
      totalAvailable,
      totalInUse,
      utilizationPercentage,
    };
  },

  addEquipment: async (newEquipment) => {
    const name = newEquipment.name?.trim() || "";
    const type = newEquipment.type?.trim() || "";
    const status = toTitleCase(newEquipment.status);
    const location = toTitleCase(newEquipment.location?.trim()) || "";
    const serial_number = newEquipment.serial_number?.trim() || "";
    const condition = toTitleCase(newEquipment.condition);
    const description = newEquipment.description?.trim() || "";

    if (!name || !type || !location || !condition) {
      return {
        success: false,
        message: "Name, type, location, and condition are required.",
      };
    }

    try {
      const payload = {
        name,
        type,
        status,
        location,
        serial_number,
        condition,
        description,
      };

      const res = await axios.post("/api/equipment", payload);
      set((state) => ({
        equipment: [res.data.data, ...state.equipment], // prepend new equipment
      }));
      return {
        success: true,
        message: "New equipment added successfully.",
      };
    } catch (error) {
      console.error(
        "Add equipment error:",
        error.response?.data || error.message
      );

      const err = error.response?.data;
      if (err.errorCode === "SERIAL_DUPLICATE") {
        return {
          success: false,
          message: err.message,
        };
      } else {
        return {
          success: false,
          message: "Failed to add equipment. Please try again.",
        };
      }
    }
  },

  updateEquipment: async (id, updatedEquipment) => {
    const name = updatedEquipment.name?.trim() || "";
    const type = updatedEquipment.type?.trim() || "";
    const status = toTitleCase(updatedEquipment.status);
    const location = toTitleCase(updatedEquipment.location?.trim()) || "";
    const serial_number = updatedEquipment.serial_number?.trim() || "";
    const condition = toTitleCase(updatedEquipment.condition);
    const description = updatedEquipment.description?.trim() || "";

    if (!name || !type || !location || !condition) {
      return {
        success: false,
        message: "Name, type, location, and condition are required.",
      };
    }

    try {
      const updatedPayload = {
        name,
        type,
        status,
        location,
        serial_number,
        condition,
        description,
      };

      const res = await axios.put(`/api/equipment/${id}`, updatedPayload);
      set((state) => ({
        equipment: state.equipment.map((eq) =>
          eq.id === id ? res.data.data : eq
        ),
      }));
      return {
        success: true,
        message: "Equipment updated successfully.",
      };
    } catch (error) {
      console.error(
        "Update equipment error:",
        error.response?.data || error.message
      );

      const err = error.response?.data;
      if (err.errorCode === "SERIAL_DUPLICATE") {
        return {
          success: false,
          message: err.message,
        };
      } else {
        return {
          success: false,
          message: "Failed to update equipment. Please try again.",
        };
      }
    }
  },

  deleteEquipment: async (id) => {
    try {
      const res = await axios.delete(`/api/equipment/${id}`);

      set((state) => ({
        equipment: state.equipment.filter((eq) => eq.id !== id),
      }));

      return {
        success: true,
        message: "Equipment deleted successfully.",
      };
    } catch (error) {
      console.error(
        "Delete equipment error:",
        error.response?.data || error.message
      );

      return {
        success: false,
        message: "Failed to delete equipment. Please try again.",
      };
    }
  },
}));

export default useEquipmentStore;