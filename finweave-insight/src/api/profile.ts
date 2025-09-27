interface ProfileData {
  name: string;
  email: string;
  contactNumber: string;
  gender: string;
  bankName: string;
  state: string;
  location: string;
  monthlyIncome: string;
  financialGoals: string;
  riskTolerance: string;
  familyDependents: string;
  existingLiabilities: string;
  investmentInterests: string;
  lifestyleHabits: string;
}

// Fetch profile
export const getProfile = async (token: string): Promise<ProfileData | null> => {
  try {
    const res = await fetch("http://localhost:5000/api/profile", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) throw new Error("Failed to fetch profile");
    return await res.json();
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const saveProfile = async (data: any, token: string) => {
  const res = await fetch("http://localhost:5000/api/profile", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(data),
  });
  return res.json();
};

// Update profile
export const updateProfile = async (token: string, profile: ProfileData) => {
  try {
    const res = await fetch("http://localhost:5000/api/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(profile),
    });
    if (!res.ok) throw new Error("Failed to update profile");
    return await res.json();
  } catch (err) {
    console.error(err);
    return null;
  }
};
