// Convert 12-hour time to 24-hour time
export function convertTo24Hour(time12h) {
  if (!time12h) {
    return `12:00`;
  }

  if (!time12h.includes(" ")) {
    return time12h; // Already in 24-hour format
  } else {
    const [time, modifier] = time12h.split(" ");
    let [hours, minutes] = time.split(":");

    if (modifier.toLowerCase() === "pm" && hours !== "12") {
      hours = String(parseInt(hours) + 12);
    } else if (modifier.toLowerCase() === "am" && hours === "12") {
      hours = "00";
    }

    return `${hours}:${minutes}`;
  }
}

export function convertToISODate(dateStr) {
  if (!dateStr) {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Month is zero-based
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  } else {
    const [day, month, year] = dateStr.split("-");
    const monthNames = {
      Jan: "01",
      Feb: "02",
      Mar: "03",
      Apr: "04",
      May: "05",
      Jun: "06",
      Jul: "07",
      Aug: "08",
      Sep: "09",
      Oct: "10",
      Nov: "11",
      Dec: "12",
    };
    const isoMonth = monthNames[month];
    return `${year}-${isoMonth}-${day}`;
  }
}

export function convertTo12Hour(time24h) {
  if (!time24h) {
    return "12:00 AM"; // Default time if input is null or undefined
  }

  const [hours, minutes] = time24h.split(":");
  const intHours = parseInt(hours, 10);

  // Determine AM or PM
  const modifier = intHours >= 12 ? "PM" : "AM";

  // Convert hours to 12-hour format
  const hours12 = intHours % 12 || 12;

  return `${hours12}:${minutes} ${modifier}`;
}

export function convertToDDMMMYYYY(dateStr) {
  if (!dateStr) {
    return "NA";
  }

  const [year, month, day] = dateStr.split("-");
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const monthName = monthNames[parseInt(month, 10) - 1];
  return `${day}-${monthName}-${year}`;
}
