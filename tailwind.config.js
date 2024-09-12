const { height } = require("@mui/system");

module.exports = {
  content: ["./index.html", "./src/**/*.{react,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        green: "#00AB55",
        orange: "#FF8E00",
        red: "red",
        // uniform_grey: " rgba(128, 128, 128, 0.034)"
        uniform_grey: "rgba(128, 128, 128, 0.089)",
      },
      width: {
        container_width: "85%",
        mobile: "95%",
      },
      height: {
        card_height: "270px",
      },
    },
  },
  plugins: [],
};
