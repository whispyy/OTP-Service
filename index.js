const { authenticator } = require('otplib')
const qrcode = require('qrcode')

exports.generateToken = (key) => {
  // base32 encoded hex secret key
  const secret = key ?? authenticator.generateSecret()
  const token = authenticator.generate(secret)

  return { token, secret }
}

exports.generateQRCode = async (user, service, secret) => {
  try {
    const otpauth = authenticator.keyuri(user, service, secret)
    const imageUrl = await qrcode.toDataURL(otpauth)
  
    return imageUrl;
  } catch (err) {
    console.error(err);
  }
}


exports.validate = (secret, token) => {
  try {
    const isValid = authenticator.check(token, secret)

    return isValid
  } catch (err) {
    console.error(err);
  }
}
