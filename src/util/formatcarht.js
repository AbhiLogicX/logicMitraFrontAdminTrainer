export const UtilsMothns = {
  months: ({ count = 12, startingMonth = 0 } = {}) => {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const labels = [];
    for (let i = 0; i < count; i += 1) {
      const index = (startingMonth + i) % 12;
      labels.push(monthNames[index]);
    }
    return labels;
  },
};
