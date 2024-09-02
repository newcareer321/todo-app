module.exports = {
  content: ['./*.html'],
  theme: {
    extend: {
      colors: {
        'custom-gray': 'rgba(37, 39, 60, 1)', // Adjust alpha as needed
        skyblue: '#87CEEB',  // Sky Blue color
        pink: '#FFC0CB',     // Pink color
        brinjal: '#4B0082'   // Brinjal (Eggplant) color
      },
      backgroundImage: {
        'skyblue-pink-brinjal': 'linear-gradient(to right, #87CEEB, #FKP0CB, #4B0082)',
        'ocean-breeze': 'linear-gradient(to right, #4FD1C5, #3182CE)',
        'purple-haze': 'linear-gradient(to right, #9F7AEA, #EC4899, #F56565)',
        'sunset': 'linear-gradient(to right, #FDE68A, #F97316, #EC4899)',
        'twilight-sky': 'linear-gradient(to right, #4C51BF, #6B46C1, #D53F8C)',
        'green-fields': 'linear-gradient(to right, #68D391, #2F855A)',
        'peachy-keen': 'linear-gradient(to right, #FBD38D, #FBB6CE)',
        'cool-blues': 'linear-gradient(to right, #90CDF4, #63B3ED, #2B6CB0)',
        'golden-sunset': 'linear-gradient(to right, #FBD38D, #F6AD55, #F56565)',
      },
     
    },
  },
  plugins: [],
}
