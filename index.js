const { authenticator } = require('otplib')
const qrcode = require('qrcode')

exports.generateToken = (key) => {
  // base32 encoded hex secret key
  const secret = key ?? authenticator.generateSecret()
  const token = authenticator.generate(secret)

  console.log(secret, ':', token)
  return { token, secret }
}

exports.generateQRCode = (user, service, secret) => {
  const otpauth = authenticator.keyuri(user, service, secret)

  qrcode.toDataURL(otpauth, (err, imageUrl) => {
    if (err) {
      console.log('Error with QR')
      return
    }
    console.log(imageUrl)
    return imageUrl
  });
}

exports.validate = (secret, token) => {
  try {
    const isValid = authenticator.check(token, secret)
    console.log('isValid', isValid)
    return isValid
  } catch (err) {
    console.error(err);
  }
}
