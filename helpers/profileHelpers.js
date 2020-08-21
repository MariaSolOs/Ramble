const User = require('../models/user');

exports.generatePromoCode = async (fstName) => {
    try {
        let codeName;
        if(fstName.length === 0) { codeName = 'RAMBLE'; } 
        else { codeName = fstName.toUpperCase(); }

        const codesWithSamePrefix = await User.find({
                                        'promoCode.code': new RegExp(`^${codeName}`)
                                    }).distinct('promoCode.code');

        let codeNum = Math.floor(Math.random() * 99999).toString().padStart(5, '0');
        let code = codeName + codeNum;
        while(codesWithSamePrefix.includes(code)) {
            codeNum = Math.floor(Math.random() * 99999).toString().padStart(5, '0');
            code = codeName + codeNum;
        }
        return code;
    } catch(err) {
        return Math.floor(Math.random() * 9999999).toString().padStart(7, '0');
    }
}