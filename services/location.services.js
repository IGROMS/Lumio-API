const axios = require('axios')

const getCoordinates = async (address) => {
  console.log('entro')
	const res = await axios.get(
    `http://api.positionstack.com/v1/forward?access_key=${process.env.POSITIONSTACK_KEY}&country=ES&query=${encodeURI(address)}`,	
  );
	return [res.data];
};

module.exports = getCoordinates