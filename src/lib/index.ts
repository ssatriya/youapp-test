import moment from "moment";

export async function asyncTimeout(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function convertImageToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      if (reader.result && typeof reader.result === "string") {
        resolve(reader.result);
      } else {
        reject(new Error("Failed to read the file."));
      }
    };

    reader.onerror = () => {
      reject(new Error("Error reading the file."));
    };

    reader.readAsDataURL(file);
  });
}

export const saveImageToLocalStorage = (base64Image: string) => {
  try {
    localStorage.setItem("userImage", base64Image);
  } catch (error) {
    if (error instanceof DOMException && error.name === "QuotaExceededError") {
      alert("Image is too large to store in localStorage");
    }
  }
};

export const getImageFromLocalStorage = () => {
  return localStorage.getItem("userImage");
};

export const calculateAge = (birthDateString: string) => {
  const birthDate = moment(birthDateString, "DD MM YYYY");
  const age = moment().diff(birthDate, "years");
  return age;
};
