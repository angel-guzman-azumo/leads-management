/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        borderGray: "#E2E2E2",
        btn: "#EFEFEF",
        label: "#6F6F6F",
        footer: "#F8F8F8",
        icon: "#BEBEBE",
        success: "#61BE92",
        error: "#EF7A81",
        deleteBtn: "#A09D9D",
        contacted: "#57C2EF",
        userIcon: "#4F4F4F",
      },
      borderRadius: {
        lg: "16px",
      },
      width: {
        card: "365px",
        menu: "147px",
      },
      height: {
        card: "177px",
        menu: "60px",
      },
      padding: {
        card: "17px",
      },
    },
    fontSize: {
      pag: "12px",
      tooltip: "10px",
      button: "10px",
    },
  },
  plugins: [],
};
