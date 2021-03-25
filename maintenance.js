const Receipt = require('./models/companyReceipt');

// For computing taxes
module.exports = async () => {
    const receipts = await Receipt.find({}, 'taxGST taxQST');
    let taxQST = taxGST = 0;

    for (const receipt of receipts) {
        taxQST += receipt.taxQST;
        taxGST += receipt.taxGST;
    }

    console.log(`TAX QST: ${taxQST} -- TAX QST: ${taxGST}`);
}